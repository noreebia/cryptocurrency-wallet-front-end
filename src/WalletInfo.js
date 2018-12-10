import React, { Component } from 'react';
import CurrencyInfo from "./CurrencyInfo";
import { connect } from 'react-redux';
import SockJsClient from 'react-stomp';
import axios from 'axios';
import { updateBalances, addTransaction, setLoginStatus, resetBalances, resetTransactions } from './actions/actions';
import TransactionDisplay from "./TransactionDisplay";

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.reducer.isLoggedIn,
        username: state.reducer.username,
        balances: state.balanceReducer,
        transactions: state.transactionReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateBalances: (balances) => dispatch(updateBalances(balances)),
        addTransaction: (transactionType, transaction, symbol) => dispatch(addTransaction(transactionType, transaction, symbol)),
        logOut: () => dispatch(setLoginStatus({ isLoggedIn: false })),
        resetBalances: () => dispatch(resetBalances()),
        resetTransactions: () => dispatch(resetTransactions())
    }
}

class WalletInfo extends Component {
    constructor(props) {
        super(props);
        this.receiveDepositNotification = this.receiveDepositNotification.bind(this);
        this.requestWithdrawal = this.requestWithdrawal.bind(this);
        this.requestBalance = this.requestBalance.bind(this);
        this.onWebSocketConnection = this.onWebSocketConnection.bind(this);
        this.onWebSocketDisconnection = this.onWebSocketDisconnection.bind(this);
    }

    receiveDepositNotification(msg) {
        console.log(msg);
        const { username, transactionHash, symbol } = msg;
        if (username == this.props.username) {
            this.props.addTransaction("DEPOSIT", transactionHash, symbol);
            axios.get(`/users/${this.props.username}/balances`)
                .then(response => {
                    let { successful, data } = response.data;
                    if (successful) {
                        this.props.updateBalances(data)
                        alert(`You have just received a deposit! You balances have been updated`);
                    }
                })
                .catch(error => alert(error))
        }
    }

    requestBalance() {
        axios.get(`/users/${this.props.username}/balances`)
            .then((response) => {
                const { successful, data } = response.data;
                if (successful) {
                    this.props.updateBalances(data);
                } else{
                    console.log(`Balance request failed! Details: ${data}`);
                }
            })
            .catch(err => console.log(err))
    }

    async requestWithdrawal(symbol, destinationAddress, amount) {
        console.log(`Requesting ${symbol} withdrawal of ${amount} to ${destinationAddress}`);
        let transactionResponse;
        try {
            transactionResponse = await axios.post(`/users/transactions`, { username: this.props.username, currencySymbol: symbol, destinationAddress: destinationAddress.trim(), amount: amount });
        } catch (err) {
            alert(`Withdrawal failed! ${err}`);
            return;
        }
        const { successful, data } = transactionResponse.data;
        if (successful) {
            this.props.addTransaction("WITHDRAWAL", data, symbol);
            alert(`Successfully withdrew ${symbol}`);
            setTimeout(this.requestBalance, 14000);
        } else {
            alert(`Withdrawal failed!\n${data}`)
        }
    }

    onWebSocketConnection(){
        console.log(`Websocket connection with server established`);
    }

    onWebSocketDisconnection(){
        console.log("Websocket connection has been interrupted");
        alert(`You have been disconnected from the server!`);
        this.props.logOut();
        this.props.resetBalances();
        this.props.resetTransactions();    
    }

    render() {
        const listOfCurrencies = this.props.balances.map((balance, index) => <CurrencyInfo key={index} name={balance.currencyName} symbol={balance.currencySymbol} balance={balance.balance} withdraw={this.requestWithdrawal} />)
        return (
            <div>
                {this.props.isLoggedIn && <SockJsClient url='http://localhost:8080/websocket' topics={['/topic/deposits']} onConnect={this.onWebSocketConnection} onMessage={this.receiveDepositNotification}
                    onDisconnect={this.onWebSocketDisconnection} ref={(client) => { this.clientRef = client }} />}
                {listOfCurrencies}
                <TransactionDisplay transactions={this.props.transactions} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletInfo);
