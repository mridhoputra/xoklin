import React from 'react'
import { useSelector } from 'react-redux'

import Loading from './src/components/loading'
import Navigation from './src/pages'

const App = () => {
  const { loading } = useSelector(state => state.LoadingReducer)
  return (
    <>
      <Navigation />
      {loading && <Loading />}
    </>
  )
}

export default App
