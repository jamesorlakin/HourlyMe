import React from 'react'
import { View, Button, Text, Switch } from 'react-native'

import { TextField } from 'react-native-material-textfield'
import DatePicker from './datePicker'
import { Container, LargeText, Bold } from '../common'
import moment from 'moment'

import { getRepository } from 'typeorm/browser'
import { Organisation, Hours } from '../db/tables'

export default class AddHoursScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    /** @type {Organisation} */
    var organisation = navigation.getParam('organisation', { name: 'Unknown' })
    return {
      title: 'Add Hours - ' + organisation.name
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      /** @type {Date} */
      day: new Date(),
      /** @type {Date} */
      startTime: undefined,
      /** @type {Date} */
      endTime: undefined,
      /** @type {string} */
      workDescription: '',
      /** @type {number} */
      hourlyRate: undefined,
      /** @type {number} */
      hoursUnpaid: 1,
      /** @type {boolean} */
      isPaid: false
    }
    this.onSave = this.onSave.bind(this)
    this.validate = this.validate.bind(this)
  }

  async onSave () {
    var newHours = new Hours()
    newHours.organisation = this.props.navigation.getParam('organisation')

    var startTime = new Date(this.state.day.getTime())
    startTime.setHours(this.state.startTime.getHours())
    startTime.setMinutes(this.state.startTime.getMinutes())

    var endTime = new Date(this.state.day.getTime())
    endTime.setHours(this.state.endTime.getHours())
    endTime.setMinutes(this.state.endTime.getMinutes())

    newHours.workDescription = this.state.workDescription
    newHours.startTime = startTime
    newHours.endTime = endTime
    newHours.hourlyRate = this.state.hourlyRate
    newHours.hoursUnpaid = this.state.hoursUnpaid
    newHours.isPaid = this.state.isPaid

    await getRepository(Hours).save(newHours)
    alert('Saved')
    this.props.navigation.goBack()
    this.props.navigation.getParam('reloadList')()
  }

  render () {
    var validationIssues = this.validate()
    return (
      <Container>
        <LargeText>Add working hours:</LargeText>

        <DatePicker label='Day' onDatePicked={(day) => this.setState({ day })} mode='date' />
        <DatePicker label='Start Time' onDatePicked={(startTime) => this.setState({ startTime })} mode='time' />
        <DatePicker label='End Time' onDatePicked={(endTime) => this.setState({ endTime })} mode='time' />

        <View style={{ marginTop: 8, marginBottom: 8 }}>
          <Text>Already paid?</Text>
          <Switch onValueChange={(isPaid) => this.setState({ isPaid })} value={this.state.isPaid} />
        </View>

        <TextField label='Hourly Rate' prefix='£' suffix='per hour' onChangeText={(hourlyRate) => this.setState({ hourlyRate: parseFloat(hourlyRate) })} keyboardType='numeric' />
        <TextField label='Hours Unpaid (lunch, etc)' defaultValue={'1'} suffix='hours' onChangeText={(hoursUnpaid) => this.setState({ hoursUnpaid: parseFloat(hoursUnpaid) })} keyboardType='numeric' />
        <TextField label='Work Description (optional)' onChangeText={(workDescription) => this.setState({ workDescription })} multiline />

        {validationIssues.length === 0 && <HoursBreakdown isPaid={this.state.isPaid} startTime={this.state.startTime} endTime={this.state.endTime} hourlyRate={this.state.hourlyRate} hoursUnpaid={this.state.hoursUnpaid} />}
        {validationIssues.map(function (issue) {
          return <Text style={{ color: 'red' }} key={validationIssues.indexOf(issue)}>- {issue}</Text>
        })}

        <Button disabled={validationIssues.length !== 0} onPress={this.onSave} title={'Save'} color={this.state.colour} />
        <Text>{JSON.stringify(this.state)}</Text>
      </Container>
    )
  }

  validate () {
    var issues = []
    if (this.state.startTime === undefined) issues.push('Start time not chosen')
    if (this.state.endTime === undefined) issues.push('End time not chosen')
    if (this.state.startTime > this.state.endTime) issues.push('End cannot be before start!')
    if (this.state.hourlyRate === undefined) issues.push('Hourly rate has not been configured')
    if (this.state.hoursUnpaid < 0) issues.push('Unpaid hours cannot be negative')
    return issues
  }
}

/**
 * @param {{startTime: Date, endTime: Date, hourlyRate: number, hoursUnpaid: number, isPaid: boolean}} props
 */
function HoursBreakdown (props) {
  var hours = moment(props.endTime).diff(props.startTime, 'hours', true)
  var paidHours = hours - props.hoursUnpaid
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>{hours} hours worked</Text>
      <Text><Bold>{paidHours}</Bold> {props.isPaid ? ' has been paid for' : 'due for payment'}</Text>
      <Text>{paidHours} * £{props.hourlyRate.toFixed(2)} = <Bold>£{(paidHours * props.hourlyRate).toFixed(2)}</Bold></Text>
    </View>
  )
}
