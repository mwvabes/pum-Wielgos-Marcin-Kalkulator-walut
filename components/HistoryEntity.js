import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import currenciesService from './../services/currencies'

const HistoryEntity = ({ item, handleDelete, findTerritoryByCurrencyCode }) => {

  const [sourceFlag, setSourceFlag] = useState("")
  const [destinationFlag, setDestinationFlag] = useState("")

  useEffect(() => {
    setSourceFlag(findTerritoryByCurrencyCode(item.sourceCurrency))
    setDestinationFlag(findTerritoryByCurrencyCode(item.destinationCurrency))
  })

  console.log(item)

  const [destinationCurrencyValue, setDestinationCurrencyValue] = useState(null)
  const [destinationTextInput, setDestinationTextInput] = useState(null)

  useEffect(() => {
    handleRefresh()
  })

  const handleRefresh = () => {
    currenciesService.getByCurrencyValue(item.sourceCurrency).then((response) => {
      setDestinationCurrencyValue(response.rates[item.destinationCurrency].toFixed(2))
      setDestinationTextInput((response.rates[item.destinationCurrency] * item.sourceValue).toFixed(2))
    })
  }

  function HandleSourceFlag(props) {
    return <img alt="Source currency country flag"
      src={"http://purecatamphetamine.github.io/country-flag-icons/3x2/" + sourceFlag + ".svg"} height={props.height} style={{ border: '2px solid #e0e0e0' }} />
  }

  function HandleDestinationFlag(props) {
    return <img alt="Destination currency country flag"
      src={"http://purecatamphetamine.github.io/country-flag-icons/3x2/" + destinationFlag + ".svg"} height={props.height} style={{ border: '2px solid #e0e0e0' }} />
  }

  return (
    <View style={styles.card}>
      <View style={[styles.row]}>
        <View style={styles.iconsToRight}>
          <Button
            onPress={handleRefresh}
            title={<Icon name="reload1" size={30} color="#90A955" />}
            color="none"
            accessibilityLabel="Clear inputs"
          />
          <Button
            onPress={() => { handleDelete(item.ID_entity) }}
            title={<Icon name="delete" size={30} color="#90A955" />}
            color="none"
            accessibilityLabel="Swap values"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.presentData}>
          <Text style={styles.presentDataText}> {item.sourceValue} </Text>
        </View>

        <View style={styles.presentData}>
          <Text style={styles.presentDataText}> {item.sourceCurrency} </Text>
        </View>

        <HandleSourceFlag height={25} />
      </View>


      <View style={styles.row}>
        <View style={[styles.presentData, styles.destination]}>
          <Text style={styles.presentDataText}> {destinationTextInput} </Text>
        </View>

        <View style={styles.presentData}>
          <Text style={styles.presentDataText}> {item.destinationCurrency} </Text>
        </View>

        <HandleDestinationFlag height={25} />
      </View>

      <View style={styles.row}>
        <Text>1 {item.sourceCurrency} <HandleSourceFlag height={15} /> = {destinationCurrencyValue} {item.destinationCurrency} <HandleDestinationFlag height={15} /></Text>
      </View>
    </View>
  )
}

export default HistoryEntity

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
    borderWidth: 1,
    borderColor: '#fafafa',
    transition: 'background-color 175ms, border-color 175ms',
  },
  presentDataText: {
    alignSelf: 'flex-start'
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconsToRight: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'flex-end'
  },
  destination: {
    borderColor: '#90A955',
    borderWidth: 1,
    backgroundColor: '#eff7da'
  },
  presentData: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 5,
    padding: '5px 10px',
    height: 40,
    boxShadow: "0px 2px 10px #e0e0e0",
    margin: 5,
    borderColor: '#e0e0e0',
    borderWidth: 2,
    alignItems: 'center',
    minWidth: 180
  },
  heading: {
    fontSize: '1.6rem'
  }
});
