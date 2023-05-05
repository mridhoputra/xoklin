import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ToastAndroid, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'

import Gap from '../../components/gap'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../assets'
import { useSelector } from 'react-redux'
import { XOKLIN_URL, XOKLIN_ENDPOINT } from '@env'

import axios from 'axios'

const ItemManagement = () => {
  const navigation = useNavigation()

  const { userData } = useSelector(state => state.UserReducer)

  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [pageSize, setPageSize] = useState(0)
  const [dataItems, setDataItems] = useState([])

  const fetchAllItems = async () => {
    const header = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
      }
    }
    try {
      setIsLoading(true)
      const response = await axios.get(`${XOKLIN_ENDPOINT}/items`, header)
      if (response.status === 200) {
        setDataItems(response.data.data)
        setPage(response.data.page)
        setPageSize(response.data.totalPage)
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

  const fetchMoreItems = async () => {
    const header = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
      }
    }
    if (page < pageSize) {
      try {
        setIsLoadingMore(true)
        const response = await axios.get(`${XOKLIN_ENDPOINT}/items?page=${page + 1}`, header)
        if (response.status === 200) {
          let tempData = []
          tempData = dataItems.concat(response.data.data)
          setPage(page + 1)
          setDataItems(tempData)
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

  const handleSearchItem = () => {
    if (query !== '') {
      fetchSearchItem()
    } else {
      fetchAllItems()
    }
  }

  const fetchSearchItem = async () => {
    const header = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
      }
    }
    try {
      setIsLoading(true)
      const response = await axios.get(`${XOKLIN_ENDPOINT}/items/search/${query}`, header)
      if (response.status === 200) {
        setDataItems(response.data.data)
        setPage(response.data.page)
        setPageSize(response.data.totalPage)
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

  const navigateToItemAdd = () => {
    navigation.navigate('AddItem')
  }

  const navigateToDetail = (item) => {
    navigation.navigate({ name: 'ItemManagementDetail', params: { dataItem: item } })
  }

  useEffect(() => {
    fetchAllItems()
  }, [])

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon_back.png')} style={styles.btnBack}/>
        </TouchableOpacity>
        <Text style={styles.title}>ITEM MANAGEMENT</Text>
        <Gap width={10} />
      </View>
      <Text style={styles.labelListItem}>List Item</Text>
      <View style={styles.containerSearch}>
        <TextInput
          value={query}
          style={styles.textInput}
          placeholder='Search Item'
          onChangeText={(value) => setQuery(value)}
        />
        <Gap width={8} />
        <TouchableOpacity activeOpacity={0.6} style={styles.containerIconSearch} onPress={handleSearchItem}>
          <Image source={require('../../assets/images/icon_search.png')} style={styles.iconSearch}/>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FlatList
          data={dataItems}
          refreshing={isLoading}
          onEndReached={fetchMoreItems}
          onEndReachedThreshold={0.1}
          onRefresh={fetchAllItems}
          ListEmptyComponent={isLoading ? <View/> : <EmptyComponent/>}
          ListFooterComponent={isLoadingMore && <LoadingIndicator/>}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity activeOpacity={0.6} style={styles.card} onPress={() => navigateToDetail(item)}>
                <View style={styles.containerItem}>
                  <Text style={styles.labelItem}>Name:</Text>
                  <Text style={styles.textItem}>{item.item}</Text>
                </View>
                <View style={styles.containerItem}>
                  <Text style={styles.labelItem}>Price:</Text>
                  <Text style={styles.textItem}>{item.price}</Text>
                </View>
                <View style={styles.containerItem}>
                  <Text style={styles.labelItem}>Unit:</Text>
                  <Text style={styles.textItem}>{item.unit}</Text>
                </View>
                <View style={styles.containerItem}>
                  <Text style={styles.labelItem}>Icon Image:</Text>
                  <Image source={{ uri: `${XOKLIN_URL}${item.iconUrl}` }} style={styles.iconItem}/>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
      <TouchableOpacity activeOpacity={0.6} style={styles.containerIconAdd} onPress={navigateToItemAdd}>
        <Image source={require('../../assets/images/icon_plus.png')} style={styles.iconAdd}/>
      </TouchableOpacity>
    </View>
  )
}

const EmptyComponent = () => {
  return (
    <View style={styles.emptyPage}>
      <Text style={styles.labelEmptyPage}>There is no item</Text>
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

export default ItemManagement

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.white
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  },
  btnBack: {
    width: 10,
    height: 18
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: Colors.primary
  },
  labelListItem: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: Colors.black,
    marginHorizontal: 16,
    marginTop: 12
  },
  containerSearch: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
    marginTop: 12
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#D0DBEA',
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1
  },
  containerIconSearch: {
    backgroundColor: Colors.primary,
    width: 46,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  iconSearch: {
    width: 28,
    height: 28
  },
  content: {
    flex: 1,
    marginTop: 8,
    marginHorizontal: 16
  },
  card: {
    marginVertical: 8,
    backgroundColor: Colors.white,
    elevation: 5,
    marginHorizontal: 2,
    padding: 16,
    borderRadius: 8
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'flex-start'
  },
  labelItem: {
    includeFontPadding: false,
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.textGray
  },
  textItem: {
    includeFontPadding: false,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.black
  },
  iconItem: {
    width: 72,
    height: 72,
    backgroundColor: Colors.border,
    borderRadius: 8
  },
  containerIconAdd: {
    backgroundColor: Colors.primary,
    position: 'absolute',
    bottom: 32,
    right: 24,
    padding: 8,
    borderRadius: 100,
    elevation: 5
  },
  iconAdd: {
    width: 40,
    height: 40
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
    fontSize: 14,
    color: Colors.textGray,
    marginBottom: 20
  }
})
