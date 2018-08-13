import React from 'react'
import { View, Text } from 'react-native'
import { Container } from '../common'

import { Calendar } from 'react-native-calendars'

export default class HoursScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Hours'
  }

  render () {
    return (
      <Container>
        <Calendar />
      </Container>
    )
  }
}
