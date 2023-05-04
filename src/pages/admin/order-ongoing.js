import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ToastAndroid, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Colors } from '../../assets'
import { XOKLIN_ENDPOINT } from '@env'
import formatDate from '../../utils/formatDate'
import { formatStatus } from '../../utils/formatStatus'
import formatRupiah from '../../utils/formatRupiah'
import Gap from '../../components/gap'

const AdminOrderOngoing = () => {
  const navigation = useNavigation()

  const { userData } = useSelector(state => state.UserReducer)

  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [dataOrders, setDataOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const fetchOngoingOrder = async () => {
    const header = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
      }
    }
    try {
      setIsLoading(true)
      const response = await axios.get(`${XOKLIN_ENDPOINT}/orders?status=ongoing`, header)
      if (response.status === 200) {
        setDataOrders(response.data?.data)
        setPage(response.data?.page)
        setTotalPage(response.data?.totalPage)
      }
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      if (e.response.data?.message) {
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
      } else {
        ToastAndroid.show('Something went wrong', ToastAndroid.LONG)
      }
    }
  }

  const fetchMoreData = async () => {
    const header = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
      }
    }
    if (page < totalPage) {
      try {
        setIsLoadingMore(true)
        const response = await axios.get(`${XOKLIN_ENDPOINT}/orders?status=ongoing&page=${page + 1}`, header)
        if (response.status === 200) {
          let tempData = []
          tempData = dataOrders.concat(response.data.data)
          setPage(page + 1)
          setDataOrders(tempData)
        }
        setIsLoadingMore(false)
      } catch (e) {
        setIsLoadingMore(false)
        if (e.response.data?.message) {
          ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        } else {
          ToastAndroid.show('Something went wrong', ToastAndroid.LONG)
        }
      }
    }
  }

  const navigateToOrderDetail = async (orderDetail) => {
    navigation.navigate({ name: 'AdminOrderDetail', params: { orderDetail } })
  }

  useEffect(() => {
    fetchOngoingOrder()
  }, [])

  return (
    <FlatList
      data={dataOrders}
      refreshing={isLoading}
      onEndReached={fetchMoreData}
      onRefresh={fetchOngoingOrder}
      onEndReachedThreshold={0.1}
      contentContainerStyle={styles.flatlist}
      ListEmptyComponent={isLoading ? <View/> : <EmptyComponent/>}
      ListFooterComponent={isLoadingMore && <LoadingIndicator/>}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity activeOpacity={0.6} key={index} style={styles.card} onPress={() => navigateToOrderDetail(item)}>
            <View style={styles.containerCardData}>
              <Text style={styles.labelCard}>Name:</Text>
              <Text style={styles.textCardBold}>{item.User?.fullname}</Text>
            </View>
            <View style={styles.containerCardData}>
              <Text style={styles.labelCard}>Order ID:</Text>
              <Text style={styles.textCard}>{item.idOrder}</Text>
            </View>
            <View style={styles.border}/>
            <View style={styles.containerCardData}>
              <Text style={styles.labelCard}>Order Date:</Text>
              <Text style={styles.textCard}>{formatDate(item.updatedAt)}</Text>
            </View>
            <View style={styles.containerCardData}>
              <Text style={styles.labelCard}>Pickup Location:</Text>
              <Text style={styles.textCard} numberOfLines={1}>{item.address}</Text>
            </View>
            <View style={styles.containerCardData}>
              <Text style={styles.labelCard}>Total Amount:</Text>
              <Text style={styles.textCardPrimary}>{formatRupiah(item.ammount)}</Text>
            </View>
            <View style={styles.border}/>
            <View style={styles.containerCardStatus}>
              <Text style={styles.labelStatus}>Status:</Text>
              <Gap width={8} />
              <Text style={[
                styles.textStatus,
                item.status === 0
                  ? { backgroundColor: Colors.red }
                  : item.status === 6
                    ? { backgroundColor: Colors.primary }
                    : { backgroundColor: Colors.yellow }
              ]}>{formatStatus(item.status)}</Text>
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

const EmptyComponent = () => {
  return (
    <View style={styles.emptyPage}>
      <Text style={styles.labelEmptyPage}>There is no order</Text>
    </View>
  )
}

const LoadingIndicator = () => {
  return (
    <View>
      <ActivityIndicator size={20}/>
      <Text style={styles.textLoading}>Loading...</Text>
    </View>
  )
}

export default AdminOrderOngoing

const styles = StyleSheet.create({
  flatlist: {
    flexGrow: 1,
    paddingVertical: 8
  },
  card: {
    backgroundColor: Colors.white,
    marginVertical: 8,
    marginHorizontal: 2,
    borderRadius: 8,
    padding: 16,
    elevation: 5
  },
  containerCardData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2
  },
  labelCard: {
    flex: 2,
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: Colors.textGray
  },
  textCard: {
    flex: 3,
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: Colors.black
  },
  textCardBold: {
    flex: 3,
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    color: Colors.black
  },
  textCardPrimary: {
    flex: 3,
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    color: Colors.primary
  },
  border: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.border,
    marginTop: 12,
    marginBottom: 16
  },
  containerCardStatus: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelStatus: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: Colors.textGray
  },
  textStatus: {
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    color: Colors.white,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  textLoading: {
    marginTop: 2,
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
    color: Colors.textGray,
    fontSize: 8
  },
  emptyPage: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelEmptyPage: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.textGray,
    marginBottom: 20
  }
})
