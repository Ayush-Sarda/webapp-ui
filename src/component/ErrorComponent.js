import React from 'react'

export default class ErrorComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        document.title = 'Error'
        return (
            <div class="d-flex flex-column align-items-center justify-content-center m-auto bg-white px-2" style={{ width: '70%', height: '70vh' }}>
                <details style={{ whiteSpace: 'pre-wrap' }}>
                    
                    <h2 class="fs-1 fw-normal mb-2">Something went wrong</h2>
                    <h3 class="fs-6 fw-light">{this.props.error}</h3>
                    <h3 class="fs-6 fw-light">{this.props.errorInfo}</h3>
                </details>
            </div>
        )
    }
}