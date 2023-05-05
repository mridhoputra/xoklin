import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ToastAndroid, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'

import Gap from '../../components/gap'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../assets'
import { useSelector } from 'react-redux'
import { XOKLIN_ENDPOINT } from '@env'

import axios from 'axios'

const UserManagement = () => {
  const navigation = useNavigation()

  const { userData } = useSelector(state => state.UserReducer)

  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [pageSize, setPageSize] = useState(0)
  const [dataUsers, setDataUsers] = useState([])

  const fetchAllUsers = async () => {
    const header = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
      }
    }
    try {
      setIsLoading(true)
      const response = await axios.get(`${XOKLIN_ENDPOINT}/users`, header)
      if (response.status === 200) {
        setDataUsers(response.data.data)
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

  const fetchMoreUsers = async () => {
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
        const response = await axios.get(`${XOKLIN_ENDPOINT}/users?page=${page + 1}`, header)
        if (response.status === 200) {
          let tempData = []
          tempData = dataUsers.concat(response.data.data)
          setPage(page + 1)
          setDataUsers(tempData)
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

  const handleSearchUser = () => {
    if (query !== '') {
      fetchSearchUser()
    } else {
      fetchAllUsers()
    }
  }

  const fetchSearchUser = async () => {
    const header = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
      }
    }
    try {
      setIsLoading(true)
      const response = await axios.get(`${XOKLIN_ENDPOINT}/users/search/${query}`, header)
      if (response.status === 200) {
        setDataUsers(response.data.data)
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

  const navigateToDetail = (item) => {
    navigation.navigate({ name: 'UserManagementDetail', params: { dataUser: item } })
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/icon_back.png')} style={styles.btnBack}/>
        </TouchableOpacity>
        <Text style={styles.title}>USER MANAGEMENT</Text>
        <Gap width={10} />
      </View>
      <Text style={styles.labelListItem}>List User</Text>
      <View style={styles.containerSearch}>
        <TextInput
          value={query}
          style={styles.textInput}
          placeholder='Search User'
          onChangeText={(value) => setQuery(value)}
        />
        <Gap width={8} />
        <TouchableOpacity activeOpacity={0.6} style={styles.containerIconSearch} onPress={handleSearchUser}>
          <Image source={require('../../assets/images/icon_search.png')} style={styles.iconSearch}/>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FlatList
          data={dataUsers}
          refreshing={isLoading}
          onEndReached={fetchMoreUsers}
          onEndReachedThreshold={0.1}
          onRefresh={fetchAllUsers}
          ListEmptyComponent={isLoading ? <View/> : <EmptyComponent/>}
          ListFooterComponent={isLoadingMore && <LoadingIndicator/>}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity activeOpacity={0.6} style={styles.card} onPress={() => navigateToDetail(item)}>
                <View style={styles.containerItem}>
                  <Text style={styles.labelItem}>Name:</Text>
                  <Text style={styles.textItem}>{item.fullname}</Text>
                </View>
                <View style={styles.containerItem}>
                  <Text style={styles.labelItem}>Username:</Text>
                  <Text style={styles.textItem}>{item.username}</Text>
                </View>
                <View style={styles.containerItem}>
                  <Text style={styles.labelItem}>Email:</Text>
                  <Text style={styles.textItem}>{item.email}</Text>
                </View>
                <View style={styles.containerItem}>
                  <Text style={styles.labelItem}>Phone:</Text>
                  <Text style={styles.textItem}>{item.phone}</Text>
                </View>
                <View style={styles.border} />
                <View style={styles.containerItem}>
                  <Text style={styles.labelItem}>Role:</Text>
                  <Text style={item.role === 'ROLE_ADMIN' ? styles.textRoleAdmin : styles.textRoleUser}>{item.role}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </View>
  )
}

const EmptyComponent = () => {
  return (
    <View style={styles.emptyPage}>
      <Text style={styles.labelEmptyPage}>There is no user</Text>
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

export default UserManagement

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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderRadius: 8
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center'
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
  textRoleUser: {
    includeFontPadding: false,
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    color: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 2
  },
  textRoleAdmin: {
    includeFontPadding: false,
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    color: Colors.white,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4
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
  },
  border: {
    backgroundColor: Colors.border,
    height: 1,
    width: '100%',
    marginBottom: 8
  }
})
