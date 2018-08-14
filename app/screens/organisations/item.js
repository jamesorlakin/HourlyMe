import React from 'react'
import { View, Text, Button } from 'react-native'

import { getRepository } from 'typeorm/browser'
import { Organisation } from '../../db/tables'

/**
 * @param {{organisation: Organisation, reloadList: function, onOrganisationSelected: function, key: string?|number?}} props
 */
export default function Item ({organisation, reloadList, onOrganisationSelected}) {
  return (
    <View style={{borderWidth: 2}}>
      <View style={{height: 16, width: 16, backgroundColor: organisation.colour}} />
      <Text>{JSON.stringify(organisation)}</Text>
      <Button title='Select' onPress={() => { onOrganisationSelected(organisation) }} />
      <Button disabled title='Delete' onPress={async () => { await getRepository(Organisation).remove(organisation); reloadList() }} />
    </View>
  )
}
