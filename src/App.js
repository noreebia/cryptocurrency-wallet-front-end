import './App.css';
import './Fieldset';
import React, { Component } from 'react';
import axios from 'axios';
import WalletInfo from "./WalletInfo";
import { connect } from 'react-redux';
import { setLoginStatus, setUsername, setPassword, setEthAddressOfUser, updateBalances, resetBalances } from './actions/actions';

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.reducer.isLoggedIn,
    username: state.reducer.username,
    ethAddressOfUser: state.reducer.ethAddressOfUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logIn: (details) => dispatch(setLoginStatus(details)),
    logOut: () => dispatch(setLoginStatus({ isLoggedIn: false })),
    setUsername: username => dispatch(setUsername(username)),
    setPassword: password => dispatch(setPassword(password)),
    setEthAddressOfUser: ethAddress => dispatch(setEthAddressOfUser(ethAddress)),
    resetBalances: () => dispatch(resetBalances()),
    updateBalances: (balances) => dispatch(updateBalances(balances))
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableWidth: 0,
      usernameTextField: '',
      passwordTextField: '',
    };
    this.tableRef = React.createRef();
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.requestAddressCreation = this.requestAddressCreation.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    this.setState({
      tableWidth: this.tableRef.current.clientWidth
    });
  }

  requestAddressCreation() {
    console.log("woohoo!");
    axios.post(`/users/${this.props.username}/addresses`)
      .then((response) => {
        console.log(response);
        let { successful, data } = response.data;
        if (successful) {
          this.props.setEthAddressOfUser(data);
        } else {
          alert(`${data}`)
        }
      })
      .catch(error => alert(error))
  }

  updateUsername(event) {
    console.log(event.target.value);
    this.setState({ usernameTextField: event.target.value });
  }

  updatePassword(event) {
    this.setState({ passwordTextField: event.target.value });
  }

  handleSignUp() {
    axios.post("/users", { username: this.state.usernameTextField, password: this.state.passwordTextField })
      .then((response) => {
        let { successful, data } = response.data;
        console.log(response);
        console.log(data);

        if (successful) {
          alert("Successfully signed up! Now log in using your new account.")
        } else {
          alert(data)
        }
      })
      .catch(error => alert(`Server is not responding.\n${error}.`))
  }

  handleLogIn(event) {
    event.preventDefault();
    axios.post("/users/validation", { username: this.state.usernameTextField, password: this.state.passwordTextField })
      .then(response => {
        let { successful, data } = response.data;
        console.log(successful);
        if (successful) {
          this.props.logIn({ isLoggedIn: true, username: this.state.usernameTextField, password: this.state.passwordTextField });
        } else {
          alert(data);
        }
      })
      .then(() => {
        if (this.props.isLoggedIn) {

          axios.get(`/users/${this.props.username}/addresses`)
            .then(responseToAddressQuery => {
              console.log(responseToAddressQuery);
              const { successful, data } = responseToAddressQuery.data;
              if (successful) {
                console.log("data: " + data);
                this.props.setEthAddressOfUser(data);

                axios.get(`/users/${this.props.username}/balances`)
                  .then(responseToBalanceQuery => {
                    console.log("adding balance!" + JSON.stringify(responseToBalanceQuery));
                    let { successful, data } = responseToBalanceQuery.data;
                    if (successful) {
                      console.log(data);
                      this.props.updateBalances(data)
                    }
                  })
                  .catch(error => alert(error))
              }
            })
            .catch(error => alert(error))
        }
      })
      .catch(error => alert(`Server is not responding.\n${error}.`))
  }

  handleLogOut() {
    this.props.logOut();
    this.props.resetBalances();
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
      display: this.props.isLoggedIn ? 'none' : 'block',
      textAlign: 'center',
    }

    const overlayTextStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'row'
    }

    let greetingsOrLogin = this.props.isLoggedIn ?
      <div>
        <h2>HELLO, {this.props.username.toUpperCase()}</h2>
        <button onClick={this.handleLogOut}>LOG OUT</button>
      </div>
      :
      <div>
        <table ref={this.tableRef} >
          <tbody >
            <tr>
              <td>ID</td>
              <td>
                <input form="defaultForm" type="text" value={this.state.usernameTextField} onChange={this.updateUsername}></input>
              </td>
            </tr>
            <tr>
              <td>PW</td>
              <td>
                <input form="defaultForm" type="password" value={this.state.passwordTextField} onChange={this.updatePassword}></input>
              </td>
            </tr>
          </tbody>
        </table>
        <form id="defaultForm" onSubmit={this.handleLogIn}>
          <button type="button" style={buttonStyle} onClick={this.handleSignUp} >SIGN UP</button>
          <button type="submit" style={buttonStyle} >LOG IN</button>
        </form>
      </div>

    const addressOrButton = this.props.ethAddressOfUser != "" ? <h3>YOUR ETHEREUM ADDRESS IS <br />{this.props.ethAddressOfUser}<br /></h3> : <button onClick={this.requestAddressCreation}>Create Address</button>

    return (
      <div className="App">
        <div id="bannerImage">
          <h1 className="bannerText">CRYPTO WALLET</h1>
          <h4 className="bannerText">DEPOSIT AND WITHDRAW CRYPTOCURRENCIES FOR FREE</h4>
        </div>
        <div id="credentialsInputForm">
          {greetingsOrLogin}
        </div>
        <hr></hr>
        <div>
          <div id="overlay" style={overlayStyle}>
            <h2 style={overlayTextStyle}>PLEASE LOG IN FIRST</h2>
          </div>
          {addressOrButton}
          <WalletInfo isLoggedIn={this.props.isLoggedIn} username={this.props.username} />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
