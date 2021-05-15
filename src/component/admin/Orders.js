import axios from 'axios'
import React from 'react'
import ErrorComponent from '../ErrorComponent'
import AdminOrderComponent from './AdminOrderComponent'
import '../../css/AdminOrders.css'
const BACKEND_URL = "https://dryfruitbackend-env-1.eba-ipwmze3s.ap-south-1.elasticbeanstalk.com/api"

export default class Orders extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            orders: {
                cancelled: [],
                delivered: [],
                pending: [],
                unfulfilled: []
            }
        }
    }

    componentDidMount() {
        axios.get(BACKEND_URL + '/orders/admin')
            .then(res => {
                console.log(res.data)
                this.setState({
                    orders: res.data
                })
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
        document.title = 'All Orders'
        return (
            <div class="row justify-content-center mt-4">
                <div class="col-10 px-0">
                    <div style={{ maxWidth: 'fit-content' }}>
                        <div class="nav nav-tabs border-0" id="nav-tab" role="tablist">
                            <button class="nav-link fs-5 fw-normal" id="delivered-orders-tab" data-bs-toggle="tab" data-bs-target="#delivered-orders" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Delivered Orders</button>
                            <button class="nav-link fs-5 fw-normal active" id="pending-orders-tab" data-bs-toggle="tab" data-bs-target="#pending-orders" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Pending Orders</button>
                            <button class="nav-link fs-5 fw-normal" id="cancelled-orders-tab" data-bs-toggle="tab" data-bs-target="#cancelled-orders" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Cancelled Orders</button>
                            <button class="nav-link fs-5 fw-normal" id="unfulfilled-orders-tab" data-bs-toggle="tab" data-bs-target="#unfulfilled-orders" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Unfulfilled Orders</button>
                        </div>
                    </div>
                </div>
                <div class="tab-content col-10" id="nav-tabContent">
                    <div class="tab-pane fade show" id="delivered-orders" role="tabpanel" >
                        {this.state.orders.delivered.map((order, i) => (
                            <AdminOrderComponent key={i} order={order} i={i} />
                        ))}
                    </div>
                    <div class="tab-pane fade show active" id="pending-orders" role="tabpanel" >
                        {this.state.orders.pending.map((order, i) => (
                            <AdminOrderComponent key={i} order={order} i={i} />
                        ))}
                    </div>
                    <div class="tab-pane fade" id="cancelled-orders" role="tabpanel" >
                        {this.state.orders.cancelled.map((order, i) => (
                            <AdminOrderComponent key={i} order={order} i={i} />
                        ))}
                    </div>
                    <div class="tab-pane fade" id="unfulfilled-orders" role="tabpanel" >
                        {this.state.orders.unfulfilled.map((order, i) => (
                            <AdminOrderComponent key={i} order={order} i={i} />
                        ))}
                    </div>
                </div>

            </div>
        )
    }
}