import React, { Component } from 'react';
import CurrencyInfo from "./CurrencyInfo";
import { connect } from 'react-redux';
import SockJsClient from 'react-stomp';
import { setBalances } from './actions/actions';

const mapStateToProps = (state) => {
    return {
        username: state.reducer.username,
        balances: state.balanceReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
      setBalances: (balances) => dispatch(setBalances(balances))
    }
  }

class WalletInfo extends Component {
    constructor(props) {
        super(props);
        this.receiveDepositNotification = this.receiveDepositNotification.bind(this);
    }

    receiveDepositNotification(msg){
        console.log(msg);
        const { username, balances} = msg;
        if(username == this.props.username){
            this.props.setBalances(balances);
            alert(`You have just received a deposit! You balances have been updated`);
        }
    }

    render() {
        const listOfCurrencies = this.props.balances.map((balance, index) => <CurrencyInfo key={index} name={balance.currencyName} symbol={balance.currencySymbol} balance={balance.balance} />)
        return (
            <div>
                {listOfCurrencies}
                <SockJsClient url='http://localhost:8080/websocket' topics={['/topic/deposits']} onConnect={() => { console.log("connected to server!") }} onMessage={this.receiveDepositNotification}
                   onDisconnect={()=>{console.log("disconnected!");}} ref={(client) => { this.clientRef = client }} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletInfo);
