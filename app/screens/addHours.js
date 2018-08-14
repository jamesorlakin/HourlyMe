import React from 'react'
import { Button } from 'react-native'

import { TextField } from 'react-native-material-textfield'
import DatePicker from './datePicker'
import { Container, LargeText } from '../../common'

import { getRepository } from 'typeorm/browser'
import { Organisation, Hours } from '../../db/tables'

/**
 * @typedef {object} Props
 * @prop {Organisation} organisation
 *
 * @extends {React.Component<Props>}
 */
export default class NewOrganisationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Hours'
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      startTime: undefined,
      endTime: undefined,
      workDescription: undefined,
      rate: undefined,
      isPaid: false
    }
    this.onSave = this.onSave.bind(this)
  }

  async onSave () {
    var newHours = new Hours()
    
    await getRepository(Hours).save(newHours)
    /*this.props.navigation.goBack()
    this.props.navigation.getParam('reloadList')()*/
  }

  render () {
    return (
      <Container>
        <LargeText>CAdd working hours:</LargeText>

        <TextField label='Work description' onChangeText={(workDescription) => this.setState({workDescription})} />
        <DatePicker label='Start date' onDatePicked={() => {}} />

        <Button onPress={this.onSave} title={'Save'} color={this.state.colour} />
      </Container>
    )
  }
}
