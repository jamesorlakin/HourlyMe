import React from 'react'
import { View, Text } from 'react-native'

import { Calendar } from 'react-native-calendars'
import moment from 'moment'

import { getRepository } from 'typeorm/browser'
import { Organisation, Hours } from '../../db/tables'

export default class HoursCalendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      /** @type {Hours[]} */
      hours: [],
      selectedMonth: new Date()
    }
    this.loadHours = this.loadHours.bind(this)
    this.onMonthChange = this.onMonthChange.bind(this)
  }

  componentDidMount () {
    this.loadHours()
  }

  async loadHours () {
    var startMonth = moment(this.state.selectedMonth).startOf('month').toDate()
    var endMonth = moment(this.state.selectedMonth).endOf('month').toDate()
    var hoursQuery = await getRepository(Hours).createQueryBuilder('hour')
    hoursQuery.leftJoinAndSelect('hour.organisation', 'organisation')
    hoursQuery.where('hour.startTime > :startMonth AND hour.endTime < :endMonth', {startMonth, endMonth})
    var hours = await hoursQuery.getMany()
    this.setState({hours})
  }

  onMonthChange (calendarDate) {
    var newMonth = new Date(calendarDate.timestamp)
    this.setState({selectedMonth: newMonth}, () => this.loadHours())
  }

  render () {
    var dots = {}
    this.state.hours.forEach(function (hour) {
      var day = moment(hour.startTime).format('YYYY-MM-DD')
      if (dots[day] === undefined) dots[day] = {dots: []}
      dots[day].dots.push({color: hour.organisation.colour})
    })

    return (
      <View>
        <Calendar
          markingType='multi-dot'
          markedDates={dots}
          onDayPress={console.log}
          onMonthChange={this.onMonthChange}
        />
      </View>
    )
  }
}
