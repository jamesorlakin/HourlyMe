import React from 'react'
import { View } from 'react-native'

import Navigation from './navigation'
import getDB from './db'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      DBConnected: false
    }
  }

  async componentDidMount () {
    await getDB()
    this.setState({DBConnected: true})
  }

  render () {
    if (!this.state.DBConnected) return null
    return (
      <View style={{ flex: 1 }}>
        <Navigation />
      </View>
    )
  }
}
