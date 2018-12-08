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

        return (
            <div>
                {this.props.transactions.length > 0 && <h1>TRANSACTIONS</h1>}
                <table>
                    <tbody>
                        <tr>
                            <th>Type</th>
                            <th>Hash</th>
                        </tr>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TransactionDisplay;