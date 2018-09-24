import React, { Component } from 'react';
import './App.css';
import './Fieldset';
import Fieldset from './Fieldset';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tableWidth: 0 };
    this.tableRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      tableWidth: this.tableRef.current.clientWidth
    });
  }

  render() {
    let buttonWidth = this.state.tableWidth / 2;

    const buttonStyle = {
      width: buttonWidth
    };

    return (
      <div className="App">
        <div id= "bannerImage"></div>
        <h1>CRYPTO WALLET</h1>
        <p>Free cryptocurrency wallet service</p>
        <div id="credentialsInputForm">
          <table ref={this.tableRef}>
            <tbody >
              <Fieldset labelName="ID" isPasswordField={false} />
              <Fieldset labelName="PW" isPasswordField={true} />
            </tbody>
          </table>
        </div>
        <button style={buttonStyle}>SIGN UP</button>
        <button style={buttonStyle}>LOG IN</button>
        <hr></hr>
      </div>
    );
  }
}

export default App;
