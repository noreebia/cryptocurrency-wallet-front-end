import './App.css';
import './Fieldset';
import React, { Component } from 'react';
import axios from 'axios';
import Currency from "./Currency";


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
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    this.setState({
      tableWidth: this.tableRef.current.clientWidth
    });
  }

  updateUsername(event) {
    console.log(event.target.value);
    this.setState({ username: event.target.value });
  }

  updatePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSignUp() {
    axios.post("/users", { username: this.state.username, password: this.state.password })
      .then((response) => {
        let { successful, data } = response.data;
        console.log(response);
        console.log(data);

        if (successful) {
          alert("Successfully signed up!")
        } else {
          alert(data)
        }
      })
      .catch(error => alert(`Server is not responding.\n${error}.`))
  }

  handleLogIn() {
    axios.post("/users/validation", { username: this.state.username, password: this.state.password })
      .then((response) => {
        let { successful, data } = response.data
        console.log(successful);
        if (successful) {
          this.setState({ isLoggedIn: true });
        } else {
          alert(data);
        }
      })
      .catch(error => alert(`Server is not responding.\n${error}.`))
  }

  handleLogOut() {
    this.setState({ isLoggedIn: false, username: "", passowrd: "" });
  }

  render() {
    let buttonWidth = this.state.tableWidth / 2;

    const buttonStyle = {
      width: buttonWidth
    };

    const overlayStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255,255,255, 0.9)',
      zIndex: 2,
      display: this.state.isLoggedIn ? 'none' : 'block',
      textAlign: 'center',
    }

    const overlayTextStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'row'
    }

    let greetingsOrLogin = this.state.isLoggedIn ?
      <div><h2>Hello, {this.state.username}</h2>
        <button onClick={this.handleLogOut}>Log out</button>
      </div>
      :
      <div>
        <table ref={this.tableRef} >
          <tbody >
            <tr>
              <td>ID</td>
              <td>
                <input type="text" value={this.state.username} onChange={this.updateUsername}></input>
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
        <button style={buttonStyle} onClick={this.handleSignUp} >SIGN UP</button>
        <button style={buttonStyle} onClick={this.handleLogIn} >LOG IN</button>
      </div>

    return (
      <div className="App">
        <div id="bannerImage"></div>
        <h1>CRYPTO WALLET</h1>
        <p>Free cryptocurrency wallet - deposit and withdraw cryptocurrencies!</p>
        <div id="credentialsInputForm">
          {greetingsOrLogin}
        </div>
        <hr></hr>
        <div>
          <div id="overlay" style={overlayStyle}>
            <h2 style={overlayTextStyle}>Please log in first</h2>
          </div>
          <Currency currencyName="Ethereum" symbol="ETH" />
          <Currency currencyName="KonkukCoin" symbol="KKC" />
        </div>
      </div>
    )
  }
}

export default App;
