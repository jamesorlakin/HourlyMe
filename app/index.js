// Possibly also show onboarding screens here.
import React from 'react'
import { View, Text } from 'react-native'

import OrganisationsSelect from './screens/organisations/index'
import connectDB from './db/init'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      DBConnected: false
    }
  }

  async componentDidMount () {
    await connectDB()
    this.setState({DBConnected: true})
  }

  render () {
    if (!this.state.DBConnected) return <Text>DB Connecting</Text>
    return (
      <View style={{ flex: 1 }}>
        <OrganisationsSelect />
      </View>
    )
  }
}
