import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const Header = () =>  {

  return (
    <View style={styles.header}>
      <Text style={styles.headerBaseText}>Currency converter</Text>
      <View style={styles.flexRow}>
        <Text style={styles.baseText}>&copy; by </Text>
        <Text 
        style={styles.hyperlink}
        onPress={() => Linking.openURL('https://wielgos.me')}>
        Marcin Wielgos
        </Text>
      </View>
    </View>
  );
}

export default Header

const styles = StyleSheet.create({
  header: {
    zIndex: 9000,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    boxShadow: "0px 2px 10px #e0e0e0",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    margin: 0,
    flexWrap: 'wrap',
    minHeight: 40
  },
  headerBaseText: {
    fontWeight: 'bold'
  },  
  flexRow: {
    flexDirection: 'row'
  },
  hyperlink: {
    color: '#4F772D',
    textDecorationLine: 'underline'
  },
});
