import React, { Component } from 'react'
class Fieldset extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        let inputType = this.props.isPasswordField === true ? "password" : "text";

        return (
            <div>
                <label>{this.props.labelName}</label>
                <input type={inputType}></input>
            </div>
        )
    }
}

export default Fieldset;