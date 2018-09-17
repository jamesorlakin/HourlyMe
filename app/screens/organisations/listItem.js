import React from 'react'
import { View, Text, Button } from 'react-native'

import { getRepository } from 'typeorm/browser'
import { Organisation } from '../../db/tables'

import OrganisationStatus from './orgStatus'

/**
 * @typedef {object} Props
 * @prop {Organisation} organisation
 * @prop {function} reloadList
 * @prop {object} navigation
 * @prop {string?|number?} key
 *
 * @extends {React.Component<Props>}
 */
export default class OrganisationItem extends React.Component {
  render () {
    return (
      <View style={{ borderWidth: 2, padding: 4 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ height: 24, width: 24, alignSelf: 'center', backgroundColor: this.props.organisation.colour }} />
          <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginLeft: 8 }}>{this.props.organisation.name}</Text>
          <Button title='Manage' onPress={() => { this.props.navigation.navigate('manage', { organisation: this.props.organisation, reloadList: this.props.reloadList }) }} />
          <Button title='Add Hours' onPress={() => { this.props.navigation.navigate('addHours', { organisation: this.props.organisation, reloadList: this.props.reloadList }) }} />
          <Button title='Delete' onPress={async () => { await getRepository(Organisation).remove(this.props.organisation); this.props.reloadList() }} />
        </View>
        <OrganisationStatus organisation={this.props.organisation} />
      </View>
    )
  }
}
