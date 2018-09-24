import React, { Component } from 'react'
class Fieldset extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        let inputType = this.props.isPasswordField === true ? "password" : "text";

        return (
            <tr>
                <td>{this.props.labelName}</td>
                <td>
                    <input type={inputType}></input>
                </td>
            </tr>
        )
    }
}

export default Fieldset;