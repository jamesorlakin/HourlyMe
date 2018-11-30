import React from 'react'
import { View, Text, Button } from 'react-native'
import { Container } from '../common'

import Exporter from './exporter'
import TemplateSelector from './templateSelector'

import { getRepository } from 'typeorm/browser'
import { Organisation, Hours } from '../db/tables'

export default class OrgManagementScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    /** @type {Organisation} */
    var organisation = navigation.getParam('organisation', { name: 'Unknown' })
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
        <Button title='Location' onPress={() => { this.props.navigation.push('locationPicker', { organisation }) }} />
        <Exporter organisation={organisation} />
        <TemplateSelector organisation={organisation} />
      </Container>
    )
  }
}
