import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const Footer = () =>  {

  return (
    <View style={styles.footer}>
      <View style={styles.flexRow}>
        <Text style={styles.baseText}>Data provided by </Text>
        <Text 
        style={styles.hyperlink}
        onPress={() => Linking.openURL('https://exchangeratesapi.io/')}>
        https://exchangeratesapi.io/
        </Text>
      </View>

      <View style={styles.flexRow}>

      </View>
    </View>
  );
}

export default Footer

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  hyperlink: {
    color: '#4F772D',
    textDecorationLine: 'underline'
  },
  baseText: {
    color: '#707070'
  },
  flexRow: {
    flexDirection: 'row'
  }
});
