import React from 'react'

export default class PageNotFound extends React.Component {

    render() {
        document.title = 'Page Not Found'
        return (
            <div class="d-flex flex-column align-items-center justify-content-center m-auto bg-white" style={{ width: '70%', height: '70vh' }}>
                <h1 class="fw-bold text-danger" style={{fontSize: '6rem'}}>404</h1>
                <h2 class="fs-1 fw-normal">Page Not Found</h2>
            </div>
        )
    }
}