import React from 'react'
import { View, Text, Button, PermissionsAndroid } from 'react-native'

import JSZip from 'jszip'
import DOCX from 'docxtemplater'
import RNFetchBlob from 'rn-fetch-blob'

import { getRepository } from 'typeorm/browser'
import { Organisation, Hours } from '../db/tables'
import rnFetchBlob from 'rn-fetch-blob';

/**
 * @typedef {object} Props
 * @prop {Organisation} organisation
 *
 * @extends {React.Component<Props>}
 */
export default class HoursExport extends React.Component {
  constructor (props) {
    super(props)
    this.export = this.export.bind(this)
  }

  async export () {
    var unpaidHours = await getRepository(Hours).find({ organisation: this.props.organisation, isPaid: false })
    var total = 0
    unpaidHours.forEach(function (hour) {
      hour.workedHours = hour.calculatePaidHours()
      hour.payment = hour.calculatePayment()
      total += hour.payment
    })

    var zip = new JSZip(this.props.organisation.invoiceTemplate, { base64: true })
    var doc = new DOCX()
    doc.loadZip(zip)
    doc.setData({
      hours: unpaidHours,
      total
    })
    doc.render()
    var exportedDoc = doc.getZip().generate({ type: 'base64' })
    RNFetchBlob.fs.writeFile('/sdcard/invoice.docx', exportedDoc, 'base64')
  }

  async grantStoragePermission () {
    var req = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
    console.log(req)
  }

  render () {
    return (
      <View>
        <Button title='Request Permission' onPress={this.grantStoragePermission} />
        <Button title='Export Unpaid Invoice' onPress={this.export} />
      </View>
    )
  }
}
