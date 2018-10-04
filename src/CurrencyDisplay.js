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
                    <div className="currencyNameDisplay" style={this.getRandomColor()}>
                        <h1 >{this.props.currencyName}</h1>
                    </div>
                </div>
                <div >
                    <table className="currencyDisplayTable" >
                        <tr>
                            <td>
                                Address:
                        </td>
                            <td>
                                {this.state.address}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Balance:
                        </td>
                            <td>
                                {this.state.balance}
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
                    </table>
                </div>
            </div>
        )
    }
}

export default CurrencyDisplay;