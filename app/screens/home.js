import React from 'react'
import { View, Text } from 'react-native'
import { Container } from '../common'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home'
  }

  render () {
    return (
      <Container>
        <Text>Home</Text>
      </Container>
    )
  }
}
