// List all organisations, allow the user to choose or manage them.
import React from 'react'
import { View, Button } from 'react-native'
import { Container, LargeText } from '../../common'

import Item from './orgItem'
import HoursCalendar from './calendar'

import { getRepository } from 'typeorm/browser'
import { Organisation } from '../../db/tables'

export default class OrganisationsScreen extends React.Component {
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
    this.onOrganisationSelected = this.onOrganisationSelected.bind(this)
  }

  componentDidMount () {
    this.loadOrganisations()
    this.props.navigation.setParams({reloadList: this.loadOrganisations})
  }

  async loadOrganisations () {
    var organisations = await getRepository(Organisation).find()
    this.setState({organisations})
  }

  onOrganisationSelected (organisation) {
    this.props.navigation.navigate('selected', {organisation})
  }

  render () {
    var reloadList = this.loadOrganisations
    var onOrganisationSelected = this.onOrganisationSelected
    return (
      <Container>
        <LargeText>Please select an organisation below:</LargeText>
        {this.state.organisations.map(function (org) {
          return <Item key={org.id} organisation={org} reloadList={reloadList} onOrganisationSelected={onOrganisationSelected} />
        })}
        {this.state.organisations.length === 0 && <LargeText style={{textAlign: 'center'}}>No organisations!</LargeText>}
        <HoursCalendar />
      </Container>
    )
  }
}
