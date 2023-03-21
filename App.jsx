import React from 'react'
import StackNavigation from './src/screen/router/Navigation'
import axios from 'axios'

axios.defaults.withCredentials = true

const App = () => {
  return (
    <StackNavigation />
  )
}

export default App