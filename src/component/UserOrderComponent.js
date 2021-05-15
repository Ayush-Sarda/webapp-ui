import React from 'react'
import axios from 'axios'
import ProgressComponent from './ProgressComponent'
import '../css/Order.css'
import OrderSummaryComponent from './OrderSummaryComponent'
import { Link } from 'react-router-dom'
const BACKEND_URL = "https://dryfruit-demo.herokuapp.com/api"

export default class UserOrderComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            status: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = event => {
        let { name, value } = event.target
        let state = Object.assign(this.state)
        state[name] = value === 'CANCEL ORDER' ? 'CANCELLED' : value
        this.setState(state)
    }

    handleSubmit(event) {
        event.preventDefault()
        axios.post(`${BACKEND_URL}/orders/${this.props.order._id}/cancel`)
            .then(res => {
                window.location.reload()
            }).catch(error => {
                if (error.response) {
                    switch (error.response.status) {
                        case 500:
                            this.setState(() => {
                                throw new Error('Something went wrong')
                            })
                        default:
                            break
                    }
                }
            })
    }

    render() {
        const i = this.props.i
        let order = this.props.order
        const divColor = order.cancel || order.status === 'CANCELLED' ? 'hsla(0, 59%, 63%, 0.6)' : order.status === 'DELIVERED' ? 'rgb(154 200 157 / 0.76)' : 'transparent'
        const textColor = order.status === 'CANCELLED' || order.cancel ? 'text-danger' : order.status === 'DELIVERED' ? 'text-success' : 'text-secondary'

        return (
            <div id={order._id} class="my-2 row col-10 d-flex justify-content-center">
                <div>
                    <div class="rdf-order-container row p-3" ref={el => {
                        if (el) {
                            el.style.setProperty('background-color', divColor, 'important')
                        }
                    }}>
                        <div role="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="false" aria-controls="collapseExample" class="col-md-8">
                            <h1 class="fs-5 fw-bold mb-2 text-break">{`${order.first_name} ${order.last_name}`}</h1>
                            <h1 class="fs-6 fw-normal mb-1 text-break">
                                <h1 class="fs-6 fw-light-bold">
                                    Order id
                                    <span> </span>
                                </h1>
                                {order._id}
                            </h1>
                            <h1 class="fs-6 fw-normal mb-2 text-break">
                                <h1 class="fs-6 fw-light-bold">
                                    Order time
                                    <span> </span>
                                </h1>
                                {order.order_time}
                            </h1>
                            <h1 class="fs-6 fw-normal mb-2 text-break">
                                <h1 class="fs-6 fw-light-bold">
                                    Total amount
                                    <span> </span>
                                </h1>
                                {order.amount}
                            </h1>
                            <h1 class="fs-6 fw-normal mb-2 text-break">
                                <h1 class="fs-6 fw-light-bold">
                                    Shipping address
                                    <span> </span>
                                </h1>
                                {order.address.line}, {order.address.state}, {order.address.pincode}
                            </h1>
                            <h1 class={`fs-4 fw-bold mb-2 text-break ${textColor}`}>
                                {order.cancel ? 'CANCELLED' : order.status === 'CANCELLED' ? 'CANNOT BE FULFILLED' : order.status}
                            </h1>
                            {order.cancel || order.status === 'CANCELLED' ?
                                null
                                :
                                <div class="mt-1">
                                    <ProgressComponent status={order.status} />
                                </div>
                            }
                        </div>
                        <div class="col-md-4 row d-flex flex-row-reverse">
                            {order.status !== 'DELIVERED' && order.status !== 'SHIPPED' && order.status !== 'CANCELLED' && order.cancel === false ?
                                <button onClick={this.handleSubmit} class="btn btn-outline-danger" style={{ width: 'min-content', height: 'min-content', whiteSpace: 'nowrap' }}>Cancel Order</button>
                                :
                                <div></div>
                            }
                            {order.invoice_url ?
                                <h1 class="fs-6 fw-normal"> Download invoice
                                 <span> </span>
                                    <Link to={order.invoice_url}>
                                        <a>here</a>
                                    </Link>
                                </h1>
                                :
                                null
                            }
                        </div>
                    </div>
                    <OrderSummaryComponent i={i} order={order} />
                </div>
            </div>
        )
    }
}