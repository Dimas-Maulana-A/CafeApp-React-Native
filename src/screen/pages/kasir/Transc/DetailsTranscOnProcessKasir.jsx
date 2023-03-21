import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DetailsTranscOnProcessKasir = ({route}) => {
    const {transcId} = route.params
  return (
    <View>
      <Text>{transcId}</Text>
    </View>
  )
}

export default DetailsTranscOnProcessKasir

const styles = StyleSheet.create({})