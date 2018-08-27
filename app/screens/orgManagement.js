import React from 'react'
import { View, Text, Button } from 'react-native'
import { Container } from '../common'

import { getRepository } from 'typeorm/browser'
import { Organisation, Hours } from '../db/tables'

export default class OrgManagementScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    /** @type {Organisation} */
    var organisation = navigation.getParam('organisation', {name: 'Unknown'})
    return {
      title: organisation.name
    }
  }

  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    /** @type {Organisation} */
    var organisation = this.props.navigation.getParam('organisation')
    return (
      <Container>
        <Text>{JSON.stringify(this.props)}</Text>
      </Container>
    )
  }
}
