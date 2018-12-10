import React, { Component } from 'react';

class Transaction extends Component {

    render() {
        const etherscanLink = `https://rinkeby.etherscan.io/tx/${this.props.hash}`;
        return (
            <tr>
                <td>
                    {this.props.type}
                </td>
                <td>
                    {this.props.currency.toUpperCase()}
                </td>
                <td>
                    <a href={etherscanLink}>{this.props.hash}</a>
                </td>
            </tr>
        )
    }
}

export default Transaction;