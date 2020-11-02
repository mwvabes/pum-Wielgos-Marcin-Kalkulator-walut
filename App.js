import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from './components/Header'
import Card from './components/Card'
import Footer from './components/Footer'
import currenciesService from './services/currencies'
import currenciesNamingJSON from './services/currenciesNaming.json'

const App = () => {

  const [currenciesNaming, setCurrenciesNaming] = useState([])

  const [sourceTextInput, setSourceTextInput] = useState(0)
  const [destinationTextInput, setDestinationTextInput] = useState(0)
  const [sourceSelect, setSourceSelect] = useState(0)
  const [destinationSelect, setDestinationSelect] = useState(0)
  const [lastChangedType, setLastChangedType] = useState("source")

  useEffect(() => {
    setCurrenciesNaming(currenciesNamingJSON)
  })

  useEffect(() => {

    if (
      currenciesNaming.some(currency => currency.code == sourceSelect )
      &&
      currenciesNaming.some(currency => currency.code == destinationSelect )
      &&
      !isNaN(sourceTextInput)
      &&
      !isNaN(destinationTextInput)
    ) {
      if (lastChangedType == "destination" && destinationTextInput == 0) {
        refreshCalculation("source")
      } else {
        refreshCalculation(lastChangedType)
      }
      
    }
  }, [{sourceTextInput, destinationTextInput, sourceSelect, destinationSelect}])

  const handleTextInput = (text, type) => {
    if (type === "source") {
      setSourceTextInput(text)
      setLastChangedType("source")
    } else {
      setDestinationTextInput(text)
      setLastChangedType("destination")
    }
  }

  const handleSelectInput = (value, type) => {
    if (type === "source") {
      setSourceSelect(value)
      setLastChangedType("source")
    } else {
      setDestinationSelect(value)
      setLastChangedType("destination")
    }
  }

  const refreshCalculation = (lastChangedType) => {
    if (lastChangedType === "source") {
      currenciesService.getByCurrencyValue(sourceSelect).then((response) => {
        setDestinationTextInput((response.rates[destinationSelect] * sourceTextInput).toFixed(2))
      })
    } else {
      currenciesService.getByCurrencyValue(destinationSelect).then((response) => {
        setSourceTextInput((response.rates[sourceSelect] * destinationTextInput).toFixed(2))
      })
    }
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
