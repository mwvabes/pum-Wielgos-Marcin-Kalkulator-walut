import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Button, View, TextInput, Text } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Picker } from '@react-native-picker/picker'
import Flags from 'country-flag-icons/react/3x2'

const Card = ({ errorOccured, sourceSelect, destinationSelect, destinationCurrencyValue, sourceFlag, destinationFlag }) => {

  console.log("source", sourceFlag)
  console.log("des", destinationFlag)

  function HandleSourceFlag(props) {
    return <img alt="United States"
    src={"http://purecatamphetamine.github.io/country-flag-icons/3x2/" + sourceFlag + ".svg"} height={15} style={{border: '1px solid #e0e0e0'}} />
  }

  function HandleDestinationFlag(props) {
    return <img alt="United States"
    src={"http://purecatamphetamine.github.io/country-flag-icons/3x2/" + destinationFlag + ".svg"} height={15} style={{border: '1px solid #e0e0e0'}} />
  }

  return (
    
      <>

        { !errorOccured ?
        <Text>1 {sourceSelect} <HandleSourceFlag /> = {destinationCurrencyValue} {destinationSelect} <HandleDestinationFlag /></Text>
        : <Text>Error occured</Text>}
      
    </>
  );
}

export default Card

const styles = StyleSheet.create({
  
});
