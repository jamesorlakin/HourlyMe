import React from 'react'
import { ScrollView, Text, View } from 'react-native'

export function Container (props) {
  return (
    <ScrollView>
      <View style={{margin: 4, padding: 8, flex: 1, borderColor: 'gray', borderWidth: 2}} >
        {props.children}
      </View>
    </ScrollView>
  )
}

export function LargeText (props) {
  return (
    <Text style={{fontSize: 18, ...props.style}}>
      {props.children}
    </Text>
  )
}

export function Bold (props) {
  return (
    <Text style={{fontWeight: 'bold'}}>
      {props.children}
    </Text>
  )
}
