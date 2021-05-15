import React from 'react'
import axios from 'axios'
import ProgressComponent from '../ProgressComponent'
import ErrorComponent from '../ErrorComponent'
import '../../css/Order.css'
import OrderSummaryComponent from '../OrderSummaryComponent'
import { Link } from 'react-router-dom'
const BACKEND_URL = "http://dryfruitbackend-env-1.eba-ipwmze3s.ap-south-1.elasticbeanstalk.com/api"

export default class AdminOrderComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            status: "",
            invoice: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onClickUpload = this.onClickUpload.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
    }

    onClickUpload = () => {
        let formData = new FormData()
        formData.append(
            'invoice',
            this.state.invoice,
            this.state.invoice.name
        )
        axios.post(`${BACKEND_URL}/orders/${this.props.order._id}/upload-invoice`, formData)
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

    handleChange = event => {
        let { name, value } = event.target
        let state = Object.assign(this.state)
        state[name] = value === 'CANCEL ORDER' ? 'CANCELLED' : value
        this.setState(state)
    }

    handleFileChange = event => {
        const obj = { invoice: event.target.files[0] }
        this.setState({
            invoice: obj.invoice
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        axios.post(`${BACKEND_URL}/orders/${this.props.order._id}/update-status`, { status: this.state.status })
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
        const divColor = order.cancel || order.status === 'CANCELLED' ? 'hsla(0, 59%, 63%, 0.6)' : order.status === 'DELIVERED' ? 'rgb(154 200 157 / 0.5)' : 'transparent'
        const textColor = order.status === 'CANCELLED' || order.cancel ? 'text-danger' : order.status === 'DELIVERED' ? 'text-success' : 'text-secondary'

        return (
            <div class="my-2 row d-flex justify-content-center">
                <div id={order._id}>
                    <div class="rdf-order-container row p-3" ref={el => {
                        if (el) {
                            el.style.setProperty('background-color', divColor, 'important')
                        }
                    }}>
                        <div role="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="false" aria-controls="collapseExample" class="col-md-8">
                            <h1 class="fs-5 fw-bold mb-1">{`${order.first_name} ${order.last_name}`}</h1>
                            <h1 class="fs-6 fw-normal mb-1">{`Order id : ${order._id}`}</h1>
                            <h1 class="fs-6 fw-normal mb-3">{`Order time : ${order.order_time}`}</h1>
                            <h1 class="fs-6 fw-normal mb-2">{`Total amount : ${order.amount}`}</h1>
                            <h1 class="fs-6 fw-normal mb-2">{`Shipping address : ${order.address.line}, ${order.address.state}, ${order.address.pincode}`}</h1>
                            <h1 class={`fs-4 fw-bold mb-2 ${textColor}`}>{order.cancel ? 'CANCELLED BY CUSTOMER' : order.status === 'CANCELLED' ? 'NOT FULFILLED' : order.status}</h1>
                            {order.cancel || order.status === 'CANCELLED' ?
                                null
                                :
                                <div class="mt-1">
                                    <ProgressComponent status={order.status} />
                                </div>
                            }
                        </div>
                        {order.cancel || order.status === 'CANCELLED' ?
                            null
                            :
                            <div class="col-md-4 row d-flex flex-row-reverse">
                                <form class="needs-validation text-body col-12 mb-4" noValidate onSubmit={this.handleSubmit}>
                                    <div class="col-12 mb-2">
                                        <label for="status" class="form-label d-flex">Update Status</label>
                                        {order.status === 'PENDING' ?
                                            <select class="form-select" id="status" name="status" required onChange={this.handleChange}>
                                                <option value="">PENDING</option>
                                                <option>PACKED</option>
                                                <option>SHIPPED</option>
                                                <option>DELIVERED</option>
                                                <option>CANCEL ORDER</option>
                                            </select>
                                            :
                                            order.status === 'PACKED' ?
                                                <select class="form-select" id="status" name="status" required onChange={this.handleChange}>
                                                    <option value="">PACKED</option>
                                                    <option>SHIPPED</option>
                                                    <option>DELIVERED</option>
                                                    <option>CANCEL ORDER</option>
                                                </select>
                                                :
                                                order.status === 'SHIPPED' ?
                                                    <select class="form-select" id="status" name="status" required onChange={this.handleChange}>
                                                        <option value="">SHIPPED</option>
                                                        <option>DELIVERED</option>
                                                        <option>CANCEL ORDER</option>
                                                    </select>
                                                    :
                                                    <select class="form-select" id="status" name="status" required onChange={this.handleChange}>
                                                        <option value="">DELIVERED</option>
                                                        <option>CANCEL ORDER</option>
                                                    </select>
                                        }
                                        <div class="invalid-feedback">
                                            Please select a valid status.
                                    </div>
                                    </div>
                                    <div class="col-12">
                                        <input type="submit" value="Update" class="btn btn-warning" />
                                    </div>
                                </form>
                                <div class="col-12">
                                    {order.invoice_url ?
                                        <p class="my-1 text-dark fw-normal">Download invoice
                                        <Link to={order.invoice_url} >
                                                <a>here</a>
                                            </Link>
                                        </p>
                                        :
                                        null
                                    }
                                    <label for="formFile" class="form-label d-flex text-dark">Upload Invoice</label>
                                    <input class="form-control mb-2" type="file" id="formFile" onChange={this.handleFileChange} name="file" />
                                    <button class="btn btn-warning" onClick={this.onClickUpload}>
                                        Upload
                                </button>
                                </div>
                            </div>
                        }
                    </div>
                    <OrderSummaryComponent i={i} order={order} />
                </div>
            </div>
        )
    }
}