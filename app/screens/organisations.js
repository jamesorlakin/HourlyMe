import React from 'react'
import { View, Text } from 'react-native'
import { Container } from '../common'

import { Organisation } from '../db/tables'

export default class OrganisationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Organisations'
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
  }

  async loadOrganisations() {
    var organisations = await Organisation.find()
    this.setState({organisations})
  }

  render () {
    return (
      <Container>
        <Text>Home</Text>
        {this.state.organisations.map(function (org) {
          return <OrganisationView key={org.id} organisation={org} />
        })}
      </Container>
    )
  }
}

/**
 * @param {{organisation: Organisation, refreshView: function, key: string?|number?}} props
 */
function OrganisationView ({organisation}) {
  return (
    <View style={{borderWidth: 2}}>
      <View style={{height: 16, width: 16, backgroundColor: organisation.colour}} />
      <Text>{organisation.name}</Text>
    </View>
  )
}
