import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from './components/Header'
import Card from './components/Card'
import Footer from './components/Footer'
import currenciesService from './services/currencies'
import currenciesNamingJSON from './services/currenciesNaming.json'
import { Picker } from '@react-native-picker/picker'

const App = () => {

  const [currenciesNaming, setCurrenciesNaming] = useState([])

  const [sourceTextInput, setSourceTextInput] = useState(0.00)
  const [destinationTextInput, setDestinationTextInput] = useState(0.00)
  const [sourceSelect, setSourceSelect] = useState("PLN")
  const [destinationSelect, setDestinationSelect] = useState("EUR")

  useEffect(() => {
    setCurrenciesNaming(currenciesNamingJSON)
  })

  useEffect(() => {

    if (
      (sourceSelect != destinationSelect)
      &&
      currenciesNaming.some(currency => currency.code == sourceSelect )
      &&
      currenciesNaming.some(currency => currency.code == destinationSelect )
      &&
      !isNaN(sourceTextInput)
      &&
      !isNaN(destinationTextInput)
    ) 
      refreshCalculation()
  }, [{sourceTextInput, sourceSelect, destinationSelect}])

  const handleTextInput = (text, type) => {
    if (type === "source") {
      setSourceTextInput(text)
    } else {
      setDestinationTextInput(text)
    }
  }

  const handleSelectInput = (value, type) => {
    if (type === "source") {
      setSourceSelect(value)
    } else {
      setDestinationSelect(value)
    }
  }

  const refreshCalculation = () => {
      currenciesService.getByCurrencyValue(sourceSelect).then((response) => {
        setDestinationTextInput((response.rates[destinationSelect] * sourceTextInput).toFixed(2))
      })
  }

  const swapValues = () => {
    console.log("swap")
    let source = sourceSelect
    console.log("source", sourceSelect)
    console.log("destination", destinationSelect)
    setSourceSelect(destinationSelect)
    setDestinationSelect(source)
  }

  return (
    <View style={styles.container}>
      <Header />
      <Card
        currenciesNaming={currenciesNaming}
        handleTextInput={handleTextInput}
        handleSelectInput={handleSelectInput}
        sourceTextInput={sourceTextInput}
        destinationTextInput={destinationTextInput}
        swapValues={swapValues}
        sourceSelect={sourceSelect}
        destinationSelect={destinationSelect}
      />
      <Footer />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
});
