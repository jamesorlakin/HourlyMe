import React from 'react'
import { View, Text, Button } from 'react-native'

import DateTimePicker from 'react-native-modal-datetime-picker'

/**
 * @typedef {object} Props
 * @prop {string} label
 * @prop {function} onDatePicked
 *
 * @extends {React.Component<Props>}
 */
export default class DatePicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      date: new Date()
    }
    this.onDatePicked = this.onDatePicked.bind(this)
  }

  onDatePicked (date) {
    this.setState({open: false, date})
    this.props.onDatePicked(date)
  }

  render () {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text>{this.props.label}:</Text>
        <Button title='Choose' onPress={() => { this.setState({open: true}) }} />
        <DateTimePicker
          isVisible={this.state.open}
          onCancel={() => { this.setState({open: false}) }}
          onConfirm={this.onDatePicked}
        />
      </View>
    )
  }
}
