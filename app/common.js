import React from 'react'
import { ScrollView } from 'react-native'

export function Container (props) {
  return (
    <ScrollView style={{padding: 8, flex: 1}}>
      {props.children}
    </ScrollView>
  )
}
