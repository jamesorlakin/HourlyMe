import React from 'react'
import { View, Text } from 'react-native'

import moment from 'moment'
import CalendarHoursItem from './calendarHoursItem'

import { getRepository } from 'typeorm/browser'
import { Organisation, Hours } from '../../db/tables'

/**
 * @typedef {object} Props
 * @prop {Date} selectedDay
 *
 * @extends {React.Component<Props>}
 */

export default class CalendarSelectedDay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      /** @type {Hours[]} */
      hours: []
    }
    this.loadHours = this.loadHours.bind(this)
  }

  componentDidMount () {
    this.loadHours()
  }

  async loadHours () {
    var startDay = moment(this.props.selectedDay).startOf('day').toDate()
    var endDay = moment(this.props.selectedDay).endOf('day').toDate()
    var hoursQuery = await getRepository(Hours).createQueryBuilder('hour')
    hoursQuery.leftJoinAndSelect('hour.organisation', 'organisation')
    hoursQuery.where('hour.startTime > :startDay AND hour.endTime < :endDay', { startDay, endDay })
    var hours = await hoursQuery.getMany()
    this.setState({ hours })
  }

  render () {
    var totalDue = 0
    var totalPaid = 0
    return (
      <View style={{ flex: 1, borderWidth: 2 }}>
        <Text style={{ fontSize: 20 }}>{moment(this.props.selectedDay).format('DD MM YYYY')}:</Text>
        {this.state.hours.map(function (hours) {
          totalDue += hours.calculatePayment()
          if (hours.isPaid) totalPaid += hours.calculatePayment()
          return <CalendarHoursItem key={hours.id} hours={hours} />
        })}
        <Text>Total due: £{totalDue.toFixed(2)}</Text>
        <Text>Total paid: £{totalPaid.toFixed(2)}</Text>
      </View>
    )
  }
}
