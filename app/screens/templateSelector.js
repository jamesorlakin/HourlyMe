import React from 'react'
import { View, Text, Button, NativeModules } from 'react-native'

import RNFetchBlob from 'rn-fetch-blob'

import { getRepository } from 'typeorm/browser'
import { Organisation, Hours } from '../db/tables'

/**
 * @typedef {object} Props
 * @prop {Organisation} organisation
 *
 * @extends {React.Component<Props>}
 */
export default class TemplateSelector extends React.Component {
  constructor (props) {
    super(props)
    this.pick = this.pick.bind(this)
  }

  async pick () {
    var templateUri = await NativeModules.FilePicker.pickDocument()
    var template = await RNFetchBlob.fs.readFile(templateUri, 'base64')

    var organisation = this.props.organisation
    organisation.invoiceTemplate = template
    getRepository(Organisation).save(organisation).then(console.log)
  }

  render () {
    return (
      <View>
        <Text>Select an invoice template:</Text>
        <Button title='Choose template' onPress={this.pick} />
      </View>
    )
  }
}
