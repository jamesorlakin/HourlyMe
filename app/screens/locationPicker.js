import React from 'react'
import { View, Text, Button } from 'react-native'
import { Container } from '../common'

import MapView, { Marker, Circle } from 'react-native-maps'

import { getRepository } from 'typeorm/browser'
import { Organisation, Hours } from '../db/tables'

export default class LocationPickerScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    /** @type {Organisation} */
    var organisation = navigation.getParam('organisation', { name: 'Unknown' })
    return {
      title: 'Choose Location - ' + organisation.name
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      coordinates: null,
      radius: 100
    }
    this.saveLocation = this.saveLocation.bind(this)
  }

  async saveLocation () {
    /** @type {Organisation} */
    var organisation = this.props.navigation.getParam('organisation', { name: 'Unknown' })
    organisation.latitude = this.state.coordinates.latitude
    organisation.longitude = this.state.coordinates.longitude
    organisation.locationRadius = this.state.radius
    await getRepository(Organisation).save(organisation)
    this.props.navigation.goBack()
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          onPress={(e) => this.setState({ coordinates: e.nativeEvent.coordinate })}
          showsUserLocation
          showsMyLocationButton
        >
          {this.state.coordinates && <Marker coordinate={this.state.coordinates} />}
          {this.state.coordinates && <Circle center={this.state.coordinates} radius={this.state.radius} fillColor='rgba(200, 0, 0, 0.4)' />}
        </MapView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
          <Button title='-' onPress={() => this.setState({ radius: this.state.radius - 10 })} />
          <Text style={{ fontSize: 22 }}>{this.state.radius}m</Text>
          <Button title='+' onPress={() => this.setState({ radius: this.state.radius + 10 })} />
        </View>
        <Text>{JSON.stringify(this.state.coordinates)}</Text>
        <Button title='Choose' onPress={this.saveLocation} />
      </View>
    )
  }
}
