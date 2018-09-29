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

    render = () => {
        return (
            <div className="currencyDisplayDiv">
                <div className="currencyNameDisplay">
                    <h1 >{this.props.currencyName}</h1>
                </div>
                <div classname="currencyDisplayTable">
                    <table >
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
                    </table>
                </div>
            </div>
        )
    }
}

export default CurrencyDisplay;