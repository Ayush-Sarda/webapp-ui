import React from 'react'
import ErrorComponent from './ErrorComponent'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            errorInfo: null
        }
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo)
        this.setState({ error: error, errorInfo: errorInfo })
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    <ErrorComponent props={this.state} />
                </div>
            )
        }
        return this.props.children
    }
}