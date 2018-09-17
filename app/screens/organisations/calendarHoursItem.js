import React from 'react'
import { View, Text, Button } from 'react-native'

import moment from 'moment'

import { getRepository } from 'typeorm/browser'
import { Organisation, Hours } from '../../db/tables'

/**
 * @typedef {object} Props
 * @prop {Hours} hours
 *
 * @extends {React.Component<Props>}
 */
export default class CalendarHoursItem extends React.Component {
  render () {
    return (
      <View style={{ flex: 1, flexDirection: 'row', padding: 2 }}>
        <View style={{ backgroundColor: this.props.hours.organisation.colour, height: 20, width: 20 }} />
        <Text>{moment(this.props.hours.startTime).format('HH:MM')} - {moment(this.props.hours.endTime).format('HH:MM')}</Text>
        <Button title='Delete' onPress={async () => { await getRepository(Hours).remove(this.props.hours) }} />
      </View>
    )
  }
}
