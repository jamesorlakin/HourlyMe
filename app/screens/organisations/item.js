import React from 'react'
import { View, Text, Button } from 'react-native'

import { getRepository } from 'typeorm/browser'
import { Organisation } from '../../db/tables'

/**
 * @param {{organisation: Organisation, reloadList: function, onOrganisationSelected: function, key: string?|number?}} props
 */
export default function Item ({organisation, reloadList, onOrganisationSelected}) {
  return (
    <View style={{borderWidth: 2, padding: 4, flexDirection: 'row'}}>
      <View style={{height: 24, width: 24, alignSelf: 'center', backgroundColor: organisation.colour}} />
      <Text style={{flex: 1, fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginLeft: 8}}>{organisation.name}</Text>
      <Button title='Select' onPress={() => { onOrganisationSelected(organisation) }} />
      <Button disabled title='Delete' onPress={async () => { await getRepository(Organisation).remove(organisation); reloadList() }} />
    </View>
  )
}
