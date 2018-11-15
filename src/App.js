import './App.css';
import './Fieldset';
import React, { Component } from 'react';
import CurrencyDisplay from './CurrencyDisplay';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableWidth: 0,
      isLoggedIn: false,
      username: '',
      password: ''
    };
    this.tableRef = React.createRef();
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  componentDidMount() {
    this.setState({
      tableWidth: this.tableRef.current.clientWidth
    });
  }

  updateUsername(event){
    console.log(event.target.value);
    this.setState({username: event.target.value});
  }

  updatePassword(event){
    this.setState({password: event.target.value});
  }

  handleSignUp() {
    axios.post("/users", {username: this.state.username, password: this.state.password})
      .then((response) => {
        // console.log(response);
        let { successful, data } = response.data;
        console.log(response);
        console.log(data);

        if (successful) {
          alert("Successfully signed up!")
        } else{
          alert(data)
        }
      })
  }

  handleLogIn() {
    axios.post("/users/validation", {username: this.state.username, password: this.state.password})
      .then((response) => {
        let {successful} = response.data
        console.log(successful);
        if (successful) {
          this.setState({isLoggedIn: true});
        }
      })
  }

  render() {
    let buttonWidth = this.state.tableWidth / 2;

    const buttonStyle = {
      width: buttonWidth
    };

    return (
      <div className="App">
        <div id="bannerImage"></div>
        <h1>CRYPTO WALLET</h1>
        <p>Free cryptocurrency wallet - deposit and withdraw cryptocurrencies!</p>
        <div id="credentialsInputForm">
          <table ref={this.tableRef}>
            <tbody >
              <tr>
                <td>ID</td>
                <td>
                  <input type="text" value={this.state.username} onChange = {this.updateUsername}></input>
                </td>
              </tr>
              <tr>
                <td>PW</td>
                <td>
                  <input type="password" value={this.state.password} onChange={this.updatePassword}></input>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button style={buttonStyle} onClick = {this.handleSignUp}>SIGN UP</button>
        <button style={buttonStyle} onClick = {this.handleLogIn}>LOG IN</button>
        <hr></hr>
        <CurrencyDisplay currencyName="Bitcoin" />
      </div>
    );
  }
}

export default App;
