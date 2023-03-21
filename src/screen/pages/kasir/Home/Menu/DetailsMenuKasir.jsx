import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { auth, baseMenu } from '../../../../../utils'
import { Templates, Column, Rows, PrimaryButtons } from '../../../../../components'

const DetailsMenuKasir = ({route}) => {
  const {menuId} = route.params
  return (
    <View>
      <Text>{menuId}</Text>
    </View>
  )
}

export default DetailsMenuKasir

const styles = StyleSheet.create({})