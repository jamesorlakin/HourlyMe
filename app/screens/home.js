import React from 'react'
import { View, Text, Button } from 'react-native'
import { Container } from '../common'

import { getRepository } from 'typeorm/browser'
import { Organisation, Hours } from '../db/tables'

import { Calendar } from 'react-native-calendars'

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('organisation', {name: 'Unknown'}).name
    }
  }

  constructor (props) {
    super(props)
    this.state = {

    }
  }

  refreshHours () {

  }

  render () {
    return (
      <Container>
        <Text>{JSON.stringify(this.props)}</Text>
        <Calendar />
      </Container>
    )
  }
}
