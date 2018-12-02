import React, { Component } from 'react';
import './CurrencyInfo.css';

class CurrencyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rgb: [255, 255, 255]
        };
        this.getRandomRgb = this.getRandomRgb.bind(this);
    }

    componentDidMount() {
        this.setState({ rgb: [this.getRandomRgb(), this.getRandomRgb(), this.getRandomRgb()] });
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
        const [r, g, b] = this.state.rgb;

        return (
            <div className="currencyDisplayDiv">
                <div >
                    <div className="currencyNameDiv" style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}>
                        <h1 >{this.props.name.toUpperCase()}</h1>
                    </div>
                </div>
                <div >
                    <table className="currencyInfoDiv">
                        <tbody>
                            <tr>
                                <td style={{ textAlign: "left" }}>
                                    BALANCE:
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {this.props.balance} {this.props.symbol.toUpperCase()}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <form className="withdrawal">
                                        <input type="text" name="destinationAddress" className="fullWidth"></input>
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button form="withdrawal" className="fullWidth">WITHDRAW TO ABOVE ADDRESS</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default CurrencyInfo;