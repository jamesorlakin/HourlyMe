// List all organisations, allow the user to choose or manage them.
import React from 'react'
import { View, Button } from 'react-native'
import { Container, LargeText } from '../common'

import Item from './organisations/listItem'
import HoursCalendar from './organisations/calendar'

import { getRepository } from 'typeorm/browser'
import { Organisation } from '../db/tables'

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Hourly Me',
      headerRight: (
        <View style={{marginRight: 10}}>
          <Button
            onPress={() => { navigation.navigate('new', {reloadList: navigation.getParam('reloadList')}) }}
            title='+'
            color='#000'
          />
        </View>
      )
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      /** @type {Organisation[]} */
      organisations: []
    }
    this.loadOrganisations = this.loadOrganisations.bind(this)
  }

  componentDidMount () {
    this.loadOrganisations()
    this.props.navigation.setParams({reloadList: this.loadOrganisations})
  }

  async loadOrganisations () {
    var organisations = await getRepository(Organisation).find()
    this.setState({organisations})
  }

  render () {
    var reloadList = this.loadOrganisations
    var navigation = this.props.navigation
    return (
      <Container>
        <LargeText>Please select an organisation below:</LargeText>
        {this.state.organisations.map(function (org) {
          return <Item key={org.id} organisation={org} reloadList={reloadList} navigation={navigation} />
        })}
        {this.state.organisations.length === 0 && <LargeText style={{textAlign: 'center'}}>No organisations!</LargeText>}
        <HoursCalendar />
      </Container>
    )
  }
}
