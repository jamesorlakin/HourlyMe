import React from 'react'
import { View, Text, Button } from 'react-native'

import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'

/**
 * @typedef {object} Props
 * @prop {string} label
 * @prop {function} onDatePicked
 * @prop {Date?} defaultDate
 * @prop {'date'|'time'|'datetime'} mode
 *
 * @extends {React.Component<Props>}
 */
export default class DatePicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      date: this.props.defaultDate || new Date()
    }
    this.onDatePicked = this.onDatePicked.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.adjustMinutes = this.adjustMinutes.bind(this)
  }

  onDatePicked (date) {
    this.setState({ open: false, date })
    this.props.onDatePicked(date)
  }

  formatDate () {
    switch (this.props.mode) {
      case 'time':
        return moment(this.state.date).format('HH:mm')
      case 'date':
        return moment(this.state.date).format('dddd Do MMMM')
    }
    return moment(this.state.date).format()
  }

  adjustMinutes (minutesAdjustment) {
    var date = this.state.date
    date.setMinutes(date.getMinutes() + minutesAdjustment)
    this.setState({ date })
  }

  render () {
    return (
      <View style={{ marginTop: 8, marginBottom: 8 }}>
        <Text>{this.props.label}:</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, marginTop: 5 }}>{this.state.date ? this.formatDate() : 'N/A'}</Text>
          <Button title={'Edit'} onPress={() => { this.setState({ open: true }) }} />
          <Button title={'-'} onPress={() => { this.adjustMinutes(-30) }} />
          <Button title={'+'} onPress={() => { this.adjustMinutes(30) }} />
        </View>
        <DateTimePicker
          isVisible={this.state.open}
          date={this.state.date}
          onCancel={() => { this.setState({ open: false }) }}
          onConfirm={this.onDatePicked}
          mode={this.props.mode}
        />
      </View>
    )
  }
}
