import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as SQLite from 'expo-sqlite'
import HistoryEntity from './HistoryEntity'

const db = SQLite.openDatabase("currency_db")

const History = ({ findTerritoryByCurrencyCode }) => {
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM HISTORY`,
        [],
        (success, result) => {
          setItems(Object.values(result.rows))
        },
        (error, result) => {
          //console.log("er tx", error, result)
        })
    }, error => {
      //console.log("error", error)
    }, (success, result) => {

    })
  }

  const handleDelete = (idToDelete) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM history where ID_entity = ?`,
        [idToDelete],
        (success, result) => {
          loadHistory()
        },
        (error, result) => {
          //console.log("er tx", error, result)
        })
    }, error => {
      //console.log("error", error)
    }, (success, result) => {

    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{ items.length > 0 ? "History" : ""} </Text>
      {
        items.slice(0).reverse().map(item => {
          return <HistoryEntity key={item.ID_entity} item={item} handleDelete={handleDelete} findTerritoryByCurrencyCode={findTerritoryByCurrencyCode} />
        })
      }
    </View>
  )
}

export default History

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    zIndex: 1
  },
  heading: {
    fontSize: '1.6rem',
    fontWeight: 'bold'
  }
});
