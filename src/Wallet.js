import React, { Component } from 'react';
import Currency from "./Currency";

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <Currency currencyName="Ethereum" />
                <Currency currencyName="KonkukCoin" />
            </div>
        )
    }
}

export default Wallet;
