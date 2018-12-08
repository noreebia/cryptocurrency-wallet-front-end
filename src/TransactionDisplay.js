import React, { Component } from 'react';

class TransactionDisplay extends Component {

    render() {

        const rows = this.props.transactions.map(transaction => {
            const etherscanLink = `https://rinkeby.etherscan.io/tx/${transaction.hash}`;
            return (
                <tr>
                    <td>
                        {transaction.type}
                    </td>
                    <td>
                        <a href={etherscanLink}>{transaction.hash}</a>
                    </td>
                </tr>
            );
        })

        const TransactionDisplayPanel = <table>
            <tbody>
                <tr>
                    <th>Type</th>
                    <th>Hash</th>
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