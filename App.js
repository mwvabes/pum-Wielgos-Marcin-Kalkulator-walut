import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from './components/Header'
import Card from './components/Card'
import History from './components/History'
import Footer from './components/Footer'
import currenciesService from './services/currencies'
import currenciesNamingJSON from './services/currenciesNaming.json'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase("currency_db")

const App = () => {

  const [currenciesNaming, setCurrenciesNaming] = useState([])

  const [sourceTextInput, setSourceTextInput] = useState(0.00)
  const [destinationTextInput, setDestinationTextInput] = useState(0.00)
  const [sourceSelect, setSourceSelect] = useState("PLN")
  const [destinationSelect, setDestinationSelect] = useState("EUR")
  const [destinationCurrencyValue, setDestinationCurrencyValue] = useState(null)
  const [errorOccured, setErrorOccured] = useState(false)

  const [historyKey, setHistoryKey] = useState(0)

  const [database, setDatabase] = useState()

  const [sourceFlag, setSourceFlag] = useState("PL")
  const [destinationFlag, setDestinationFlag] = useState("US")

  useEffect(() => {
    setCurrenciesNaming(currenciesNamingJSON)
  })

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS "history" (
            "ID_entity"	INTEGER,
            "sourceValue"	TEXT,
            "sourceCurrency"	TEXT,
            "destinationCurrency"	TEXT,
            PRIMARY KEY("ID_entity")
          );`,
        [],
        (success, result) => {
          
        },
        (error, result) => {
          console.log("er tx", error, result)
        })
    }, error => {
      console.log("error", error)
    }, (success, result) => {

    })
  }, [])

  useEffect(() => {

    if (
      (sourceSelect != destinationSelect)
      &&
      currenciesNaming.some(currency => currency.code == sourceSelect)
      &&
      currenciesNaming.some(currency => currency.code == destinationSelect)
      &&
      !isNaN(sourceTextInput)
      &&
      !isNaN(destinationTextInput)
    ) {
      setErrorOccured(false)
      setSourceFlag(findTerritoryByCurrencyCode(sourceSelect))
      setDestinationFlag(findTerritoryByCurrencyCode(destinationSelect))
      refreshCalculation()
    } else {
      setErrorOccured(true)
    }


  }, [{ sourceTextInput, sourceSelect, destinationSelect }])

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
      setDestinationCurrencyValue(response.rates[destinationSelect].toFixed(2))
      setDestinationTextInput((response.rates[destinationSelect] * sourceTextInput).toFixed(2))
    })
  }

  const swapValues = () => {
    let source = sourceSelect
    setSourceSelect(destinationSelect)
    setDestinationSelect(source)
  }

  const clearInputs = () => {
    setCurrenciesNaming(currenciesNamingJSON)
    setSourceTextInput(0)
    setDestinationTextInput(0)
    setSourceSelect("PLN")
    setDestinationSelect("EUR")
    setErrorOccured(false)
  }

  const findTerritoryByCurrencyCode = (currencyCode) => {
    const matching = currenciesNamingJSON.find((currency) => {
      return currency.code === currencyCode
    })
    return matching.territory
  }

  const handleAdd = (sourceValue, sourceCurrency, destinationCurrency) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO HISTORY (sourceValue, sourceCurrency, destinationCurrency) VALUES (?, ?, ?)`,
        [sourceValue, sourceCurrency, destinationCurrency],
        (success, result) => {
          setHistoryKey(historyKey + 1)
        },
        (error, result) => {
          console.log("er tx", error, result)
        })
    }, error => {
      console.log("error", error)
    }, (success, result) => {

    })
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.paddingFromTop}></View>
      <Card
        currenciesNaming={currenciesNaming}
        handleTextInput={handleTextInput}
        handleSelectInput={handleSelectInput}
        sourceTextInput={sourceTextInput}
        destinationTextInput={destinationTextInput}
        destinationCurrencyValue={destinationCurrencyValue}
        swapValues={swapValues}
        sourceSelect={sourceSelect}
        destinationSelect={destinationSelect}
        errorOccured={errorOccured}
        clearInputs={clearInputs}
        sourceFlag={sourceFlag}
        destinationFlag={destinationFlag}
        handleAdd={handleAdd}
      />
      <History findTerritoryByCurrencyCode={findTerritoryByCurrencyCode} key={"history" + historyKey} />
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
    backgroundColor: '#fff',
    zIndex: 1
  },
  paddingFromTop: {
    padding: 30
  }
});
