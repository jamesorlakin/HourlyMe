import React from 'react'
import { View, Text } from 'react-native'

import { Calendar } from 'react-native-calendars'
import CalendarSelectedDay from './calendarSelectedDay'
import moment from 'moment'

import { getRepository } from 'typeorm/browser'
import { Organisation, Hours } from '../../db/tables'

export default class HoursCalendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      /** @type {Hours[]} */
      hours: [],
      selectedMonth: new Date(),
      selectedDay: new Date()
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
    hoursQuery.where('hour.startTime > :startMonth AND hour.endTime < :endMonth', { startMonth, endMonth })
    var hours = await hoursQuery.getMany()
    this.setState({ hours })
  }

  onMonthChange (calendarDate) {
    var newMonth = new Date(calendarDate.timestamp)
    this.setState({ selectedMonth: newMonth }, () => this.loadHours())
  }

  render () {
    /**
     * Generate an object in this format based on the month's hours for each day:
     * markedDates = {
     *  '2012-05-16': { dots: [{color: '#FFBBFF'}] },
     *  ...
     * }}
     */
    var markedDates = {}
    this.state.hours.forEach(function (hour) {
      var day = moment(hour.startTime).format('YYYY-MM-DD')
      if (markedDates[day] === undefined) markedDates[day] = { dots: [] }
      markedDates[day].dots.push({ color: hour.organisation.colour })
    })

    // Mark the selected day with a circle.
    // If the day already has a mark (such as through a dot), reuse that object.
    var selectedDay = moment(this.state.selectedDay).format('YYYY-MM-DD')
    markedDates[selectedDay] === undefined ? markedDates[selectedDay] = { selected: true } : markedDates[selectedDay].selected = true

    return (
      <View>
        <Calendar
          markingType='multi-dot'
          markedDates={markedDates}
          onDayPress={(calendarDate) => { this.setState({ selectedDay: new Date(calendarDate.timestamp) }) }}
          onMonthChange={this.onMonthChange}
          firstDay={1}
          showWeekNumbers
        />
        <CalendarSelectedDay selectedDay={this.state.selectedDay} key={this.state.selectedDay.getDate()} />
      </View>
    )
  }
}
