import React from 'react'
import { View, Text, Button } from 'react-native'

import { getRepository } from 'typeorm/browser'
import { Organisation, Hours } from '../../db/tables'

/**
 * @typedef {object} Props
 * @prop {Organisation} organisation
 *
 * @extends {React.Component<Props>}
 */
export default class OrganisationStatus extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      /** @type{Hours[]} */
      unpaidHours: [],
      loaded: false
    }
  }

  async componentDidMount () {
    var unpaidHours = await getRepository(Hours).find({organisation: this.props.organisation, isPaid: false})
    this.setState({unpaidHours, loaded: true})
  }

  render () {
    var hoursDue = 0
    var paymentDue = 0
    this.state.unpaidHours.forEach(function (hour) {
      hoursDue += hour.calculatePaidHours()
      paymentDue += hour.calculatePayment()
    })
    return hoursDue === 0 ? <Italic>No hours due.</Italic> : <Italic>{hoursDue} hours unpaid, totalling £{paymentDue.toFixed(2)}.</Italic>
  }
}

function Italic (props) {
  return (
    <Text style={{fontStyle: 'italic'}}>{props.children}</Text>
  )
}
