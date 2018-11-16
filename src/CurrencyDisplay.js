import React, { Component } from 'react';
import './CurrencyDisplay.css';



class CurrencyDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            balance: "",
        };
    }

    componentDidMount() {
        this.setState(
            {
                address: "asdf",
                balance: "fdsa"
            }
        )
    }

    getRandomRgb = () => {
        return Math.floor(Math.random() * (255 - 150 + 1)) + 150;
    }

    getRandomColor = () => {
        return {
            backgroundColor: 'rgb(' + this.getRandomRgb() + ',' + this.getRandomRgb() + ',' + this.getRandomRgb() + ')'
        };
    }

    render = () => {
        return (
            <div className="currencyDisplayDiv">
                <div >
                    <div className="currencyNameDiv" style={this.getRandomColor()}>
                        <h1 >{this.props.currencyName}</h1>
                    </div>
                </div>
                <div >
                    <table className="currencyInfoDiv">
                        <tbody>
                            <tr>
                                <td style={{ textAlign: "left" }}>
                                    Address
                            </td>
                                <td style={{ textAlign: "right" }}>
                                    {this.state.address}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "left" }}>
                                    Balance
                            </td>
                                <td style={{ textAlign: "right" }}>
                                    {this.state.balance} BTC
                            </td>
                            </tr>
                            <tr>
                                <td>
                                    <form>
                                        <input type="text" name="destinationAddress" className="fullWidth"></input>
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button className="fullWidth">Withdraw to above address</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default CurrencyDisplay;