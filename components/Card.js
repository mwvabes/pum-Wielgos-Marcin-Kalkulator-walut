import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Button, View, TextInput, Text } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Picker } from '@react-native-picker/picker'
import CardInfo from './CardInfo'

const Card = ({ currenciesNaming, handleTextInput, handleSelectInput, sourceTextInput, destinationTextInput, sourceSelect, destinationSelect, destinationCurrencyValue, swapValues, clearInputs, errorOccured, sourceFlag, destinationFlag, handleAdd }) => {


  return (
    <View style={[styles.card, errorOccured ? styles.error : ""]}>
    <View style={styles.row}>
      <Text style={styles.heading}>Currency converter</Text>
    </View>
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
          onPress={() => { handleAdd(sourceTextInput, sourceSelect, destinationSelect)}}
          title={<Icon name="plussquareo" size={30} color="#90A955" />}
          color="none"
          accessibilityLabel="Add to history"
        />
        <Button
          onPress={swapValues}
          title={<Icon name="swap" size={30} color="#90A955" />}
          color="none"
          accessibilityLabel="Swap values"
        />

        <Button
          onPress={clearInputs}
          title={<Icon name="closecircleo" size={30} color="#90A955" />}
          color="none"
          accessibilityLabel="Clear inputs"
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

      <View style={styles.row}>
        <CardInfo errorOccured={errorOccured} sourceSelect={sourceSelect} destinationSelect={destinationSelect} destinationCurrencyValue={destinationCurrencyValue} sourceFlag={sourceFlag} destinationFlag={destinationFlag} />
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
    padding: 25,
    boxShadow: "0px 2px 10px #e0e0e0",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    flexWrap: 'wrap',
    borderWidth: 2,
    borderColor: '#66870f',
    transition: 'background-color 175ms, border-color 175ms',
    fontSize: 20,
    backgroundImage: 'url(https://imgur.com/DlMJb1j.jpg)'
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  flag: {
    height: 20
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
    borderWidth: 1,
    minWidth: 180,
    borderColor: '#90A955',
    width: 200
  },
  disabledInput: {
    backgroundColor: "#ecfcc2",
    fontWeight: 'bold'
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
    borderWidth: 1,
    borderColor: '#90A955',
    width: 200
  },
  dropDownStyle: {
    backgroundColor: '#fafafa',
    height: 300
  },
  error: {
    borderColor: '#a10000',
    backgroundColor: '#ffd4d4'
  },
  heading: {
    fontSize: '1.6rem',
    fontWeight: 'bold'
  }
});
