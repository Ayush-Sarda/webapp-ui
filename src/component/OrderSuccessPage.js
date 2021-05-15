import React from 'react'
import { Link } from 'react-router-dom'
import checked from '../checked.png'
import '../css/OrderSuccess.css'

export default class OrderSuccessPage extends React.Component {
    render() {
        document.title = 'Success'
        if (!this.props.location.order) return null
        return (
            <div class="row d-flex justify-content-center my-5" style={{ minHeight: 'calc(100vh - 446px)' }}>
                <div class="row col-8 d-flex justify-content-center">
                    <div class="col-md-4 d-flex align-items-center justify-content-center">
                        <img src={checked} style={{ maxWidth: '120px', maxHeight: '120px' }} alt="" />
                    </div>
                    <div class="col-md-8 d-flex align-items-center rdf-success-text">
                        <div>
                            <h1 class="fs-4 fw-light-bold mb-3 text-break">Thank you for the purchase</h1>
                            <h2 class="fs-6 fw-normal mb-3 text-break">We have recieved your order with order id :
                            <span> </span>
                                <a>
                                    {this.props.location.order._id}
                                </a>
                            </h2>
                            <h2 class="fs-6 fw-normal mb-3 text-break">You can see the status of your order
                            <span> </span>
                                <Link to={`/order/all?order=${this.props.location.order._id}`} >
                                    <a>here</a>
                                </Link>
                            </h2>
                            <Link to='/categories' >
                                <h2 class="fs-6 fw-normal text-primary text-decoration-underline">Continue shopping</h2>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}