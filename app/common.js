import React from 'react'
import { ScrollView, Text } from 'react-native'

export function Container (props) {
  return (
    <ScrollView style={{margin: 4, padding: 8, flex: 1, borderColor: 'gray', borderWidth: 2}}>
      {props.children}
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
