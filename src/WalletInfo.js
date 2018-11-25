import React, { Component } from 'react';
import CurrencyInfo from "./CurrencyInfo";

class WalletInfo extends Component {
    render() {
        return (
            <div>
                <CurrencyInfo currencyName="Ethereum" symbol = "ETH" isLoggedIn = {this.props.isLoggedIn} username = {this.props.username}/>
                <CurrencyInfo currencyName="KonkukCoin" symbol = "KKC" isLoggedIn = {this.props.isLoggedIn} username = {this.props.username} />
            </div>
        )
    }
}

export default WalletInfo;
