import React from 'react'
import { Button } from 'react-native'

import { TextField } from 'react-native-material-textfield'
import { ColorPicker, fromHsv } from 'react-native-color-picker'
import { Container, LargeText } from '../../common'

import { getRepository } from 'typeorm/browser'
import { Organisation } from '../../db/tables'

/**
 * @typedef {object} Props
 * @prop {object} navigation
 *
 * @extends {React.Component<Props>}
 */
export default class NewOrganisationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Hourly Me'
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      colour: '#000',
      telephone: ''
    }
    this.onSave = this.onSave.bind(this)
  }

  async onSave () {
    var newOrg = new Organisation()
    newOrg.name = this.state.name
    newOrg.colour = this.state.colour
    newOrg.telephone = this.state.telephone
    await getRepository(Organisation).save(newOrg)
    this.props.navigation.goBack()
    this.props.navigation.getParam('reloadList')()
  }

  render () {
    return (
      <Container>
        <LargeText>Create a new organisation:</LargeText>

        <TextField label='Name' onChangeText={(name) => this.setState({name})} />
        <TextField label='Telephone' onChangeText={(telephone) => this.setState({telephone})} keyboardType='phone-pad' />
        <ColorPicker
          onColorChange={(colour) => this.setState({colour: fromHsv(colour)})}
          style={{flex: 1, height: 200}}
        />

        <Button onPress={this.onSave} title={'Save'} color={this.state.colour} />
      </Container>
    )
  }
}
