import React, { Component } from 'react';
import axios from "axios";
import './Currency.css';

class CurrencyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            balance: 0,
            rgb: [255, 255, 255]
        };
        this.getRandomRgb = this.getRandomRgb.bind(this);
    }
    
    componentDidMount(){
        this.setState({rgb: [this.getRandomRgb(), this.getRandomRgb(), this.getRandomRgb()]});
    }

    componentDidUpdate() {
        // if (this.props.isLoggedIn) {
        //     axios.get(`/users/${this.props.username}`)
        //         .then(response => {
        //             let { address: createdAddress } = response;
        //             if(createdAddress !== null || createdAddress !== undefined){
        //                 this.setState({address: createdAddress});
        //             }
        //         }
        //         )
        //     axios.get(`/users/${this.props.username}/balances`)
        //     // .then(response => this.setState({balance: response}))
        // }
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

        const addressOrButton = this.state.address !== "" ? this.state.address : <button>Create Address</button>;
        const [r,g,b] = this.state.rgb;

        return (
            <div className="currencyDisplayDiv">
                <div >
                    <div className="currencyNameDiv" style= { {backgroundColor: `rgb(${r}, ${g}, ${b})`}}>
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
                                    {addressOrButton}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "left" }}>
                                    Balance
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {this.state.balance} {this.props.symbol}
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

export default CurrencyInfo;