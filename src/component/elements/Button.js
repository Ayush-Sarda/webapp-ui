import React from 'react'

export default class Button extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        let style = {
            maxWidth: this.props.props.width,
            height: this.props.props.height,
            width: '100%'
            
        }
        return (
            <div class={`rdf-btn rdf-btn-one btn ${this.props.props.bgColor} ${this.props.props.textColor}`} style={style} >
                <span>{this.props.props.text}</span>
            </div>
        )
    }
}