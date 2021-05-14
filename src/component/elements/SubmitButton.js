import React from 'react'

export default class SubmitButton extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        let style = {
            width: this.props.props.width,
            height: this.props.props.height
        }
        return (
            <input type="submit" class={`btn btn-outline-success`} style={style} value={this.props.props.text} />
        )
    }
}