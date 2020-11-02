import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

const Card = ({currenciesNaming, handleTextInput, handleSelectInput, sourceTextInput, destinationTextInput}) =>  {

  return (
    <View style={styles.card}>
      <View style={styles.row}>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {handleTextInput(text, "source")}}
        value={sourceTextInput}
        />

        <DropDownPicker
            items={
              currenciesNaming.map(function (currency) {
                return {
                label: `${currency.code} | ${currency.fullName.toUpperCase()}`,
                value: currency.code
                }
              })
            }
            placeholder="Choose the currency..."
            style={styles.selectInput}
            itemStyle={{}}
            //defaultValue={"PLN"}
            containerStyle={{width: 250}}
            dropDownStyle={styles.dropDownStyle, {zIndex: 9000}}
            dropDownMaxHeight={250}
            onChangeItem={(item) => {handleSelectInput(item.value, "source")}}
            searchable={true}
        />
      </View>

      <View style={styles.row}>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {handleTextInput(text, "destination")}}
        value={destinationTextInput}
        />

        <DropDownPicker
            zIndex={4000}
            items={
              currenciesNaming.map(function (currency) {
                return {
                label: `${currency.code} | ${currency.fullName.toUpperCase()}`,
                value: currency.code
                }
              })
            }
            placeholder="Choose the currency..."
            style={styles.selectInput}
            itemStyle={{}}
            //defaultValue={"EUR"}
            containerStyle={{width: '250px'}}
            dropDownStyle={styles.dropDownStyle, {zIndex: 9000}}
            dropDownMaxHeight={250}
            onChangeItem={(item) => {handleSelectInput(item.value, "destination")}}
            searchable={true}
        />
      </View>
      

      <StatusBar style="auto" />
    </View>
  );
}

export default Card

const styles = StyleSheet.create({
  card: {
    zIndex: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    padding: 5,
    boxShadow: "0px 2px 10px #e0e0e0",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 5,
    height: 40,
    boxShadow: "0px 2px 10px #e0e0e0",
    margin: 5,
    borderColor: '#e0e0e0',
    borderWidth: 2,
    '& active': {
      borderColor: '#90A955',
    }
  },
  selectInput: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    height: 40,
    boxShadow: "0px 2px 10px #e0e0e0",
    position: 'relative',
    margin: 5,
    borderColor: '#e0e0e0',
    borderWidth: 2,
    '& active': {
      borderColor: '#90A955',
    }
  },
  dropDownStyle: {
    backgroundColor: '#fafafa',
    height: 300
  }
});
