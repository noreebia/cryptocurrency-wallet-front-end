import React, { Component } from 'react';
import CurrencyInfo from "./CurrencyInfo";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        activeCurrencies: state.reducer.activeCurrencies
    }
}

class WalletInfo extends Component {
    render() {
        const listOfCurrencies = this.props.activeCurrencies.map((currency, index) => <CurrencyInfo key={index} name={currency.name} symbol={currency.symbol} balance = {currency.balance} />)
        return (
            [listOfCurrencies]
        )
    }
}

export default connect(mapStateToProps)(WalletInfo);
