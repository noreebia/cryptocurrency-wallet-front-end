import React, { Component } from 'react';
import Transaction from "./Transaction";

class TransactionDisplay extends Component {

    render() {

        const rows = this.props.transactions.map((transaction, index) => {
            return (
                <Transaction key={index} type={transaction.type} currency={transaction.currency} hash={transaction.hash} />
            );
        })

        const TransactionDisplayPanel = 
        <table>
            <tbody>
                <tr>
                    <th>TYPE</th>
                    <th>CURRENCY</th>
                    <th>HASH</th>
                </tr>
                {rows}
            </tbody>
        </table>

        return (
            <div>
                <h1>TRANSACTIONS</h1>
                {this.props.transactions.length > 0 ? TransactionDisplayPanel : <p>DEPOSIT OR WITHDRAW TO VIEW YOUR TRANSACTIONS</p>}
            </div>
        )
    }
}

export default TransactionDisplay;