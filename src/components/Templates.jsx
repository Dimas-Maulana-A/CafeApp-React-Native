import { View, Text } from 'react-native'
import React from 'react'

const Templates = ({children, m_Horizontal, m_Vertical, p_Horizontal, p_Vertical}) => {
  return (
    <View style={{
        marginHorizontal: m_Horizontal,
        marginVertical: m_Vertical,
        paddingHorizontal: p_Horizontal,
        paddingVertical: p_Vertical
    }}>
        {children}
    </View>
  )
}

export default Templates