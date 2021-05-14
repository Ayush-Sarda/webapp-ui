import React from 'react'
import axios from 'axios'
import Loading from './Loading'
import ScrollJS from '../js/ScrollOnRedirect'
import UserOrderComponent from './UserOrderComponent'
import ErrorComponent from './ErrorComponent'
const BACKEND_URL = "https://dryfruit-demo.herokuapp.com/api"


export default class UserOrders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            isLoading: false
        }
    }

    async componentDidMount() {
        axios.get(BACKEND_URL + '/orders/all')
            .then((res) => {
                this.setState({
                    orders: res.data,
                    isLoading: false
                })
                const getQueryParams = window.location.search.replace('?', '').split('&').reduce((r, e) => (r[e.split('=')[0]] = decodeURIComponent(e.split('=')[1]), r), {})
                const script = document.createElement("script")
                script.async = true
                script.onload = ScrollJS.scrollToComponent(getQueryParams.order)
                document.body.appendChild(script)
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
        document.title = 'Orders'
        if (this.state.isLoading) {
            return (
                <Loading />
            )
        }
        if (this.state.error) {
            <ErrorComponent error={this.state.error} />
        }
        let style = { maxWidth: "800px" }
        return (
            <div class="row justify-content-center mt-4">
                {this.state.orders.map((order, i) => (
                    <UserOrderComponent order={order} i={i} />
                ))}
            </div>
        )
    }

}