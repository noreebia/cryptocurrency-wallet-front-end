import React, { Component } from 'react';
import CurrencyInfo from "./CurrencyInfo";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        balances: state.balanceReducer.balances
    }
}

class WalletInfo extends Component {

    render() {
        const listOfCurrencies = this.props.balances.map((balance, index) => <CurrencyInfo key={index} name={balance.currencyName} symbol={balance.currencySymbol} balance = {balance.balance} />)
        return (
            [listOfCurrencies]
        )
    }
}

export default connect(mapStateToProps)(WalletInfo);
