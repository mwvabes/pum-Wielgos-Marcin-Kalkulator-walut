import React, { Component } from 'react'


export default class InnerPicker extends Component {
  state = {}
  render() {
    return (
        // <Picker
        //   selectedValue={this.props.value}
        //   style={{ height: 40, width: 250 }}
        //   onValueChange={(item, itemIndex) => { this.props.handleSelectInput(item.value, "source") }
        //   }>
        //   {
        //     this.props.currenciesNaming.map((currency) => {
        //       <Picker.Item
        //         label={`${currency.code} | ${currency.fullName.toUpperCase()}`}
        //         value={`${currency.code}`}
        //       />
        //     })
        //   }
          

        // </Picker>
        <>
          <Picker></Picker>
        </>
    )
  }
}
