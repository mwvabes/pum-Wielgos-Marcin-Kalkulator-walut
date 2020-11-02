import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Button, View, TextInput, Text } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import InnerPicker from './InnerPicker'
import { Picker } from '@react-native-picker/picker'

const Card = ({ currenciesNaming, handleTextInput, handleSelectInput, sourceTextInput, destinationTextInput, sourceSelect, destinationSelect, swapValues }) => {

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => { handleTextInput(text, "source") }}
          value={sourceTextInput}
          keyboardType={"decimal-pad"}
        />

        <Picker
          selectedValue={sourceSelect}
          style={styles.selectInput}
          onValueChange={(item, itemIndex) => { handleSelectInput(item, "source") }}
        >
          {
            currenciesNaming.map((currency) => {
              return <Picker.Item
                label={`${currency.code} ${currency.fullName}`}
                key={`${currency.code} ${currency.fullName}`}
                value={`${currency.code}`}
              />

            })
          }
        </Picker>
      </View>

      <View style={styles.row}>
        <Button
          onPress={swapValues}
          title={<Icon name="swap" size={30} color="#90A955" />}
          color="none"
          accessibilityLabel="Swap values"
        />

      </View>

      <View style={styles.row}>
        <TextInput
          style={[styles.textInput, styles.disabledInput]}
          value={destinationTextInput}
          keyboardType={"decimal-pad"}
          editable={false}
        />

        <Picker
          selectedValue={destinationSelect}
          style={styles.selectInput}
          onValueChange={(item, itemIndex) => { handleSelectInput(item, "destination") }}
        >
          {
            currenciesNaming.map((currency) => {
              return <Picker.Item
                label={`${currency.code} ${currency.fullName}`}
                key={`${currency.code} ${currency.fullName}`}
                value={`${currency.code}`}
              />

            })
          }
        </Picker>
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
    flexWrap: 'wrap'
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
  disabledInput: {
    backgroundColor: "#dcdcdc"
  },
  selectInput: {
    flex: 2,
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
