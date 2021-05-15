import react from 'react'
import Loading from './Loading'
import { Redirect } from 'react-router-dom'
import FormValidation from '../js/FormValidation'
import axios from 'axios'
import SubmitButton from './elements/SubmitButton'
import CartComponent from './CartComponent'
import ErrorComponent from './ErrorComponent'
import '../css/OrderForm.css'
const BACKEND_URL = "https://dryfruitbackend-env-1.eba-ipwmze3s.ap-south-1.elasticbeanstalk.com/api"

export default class OrderForm extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: {},
            isLoading: true,
            address: {
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                addressLine: "",
                country: "",
                state: "",
                pincode: "",
                city: "Jodhpur"
            },
            redirect: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount() {
        const script = document.createElement("script")
        script.async = true
        script.onload = FormValidation()
        document.head.appendChild(script)
        console.log('component mounted')
        const loggedInUser = localStorage.getItem('user')
        if (!loggedInUser) {
            this.setState({
                redirect: '/login'
            })
        }
        this.setState({
            isLoading: false
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        let details = []
        Object.keys(this.props.cart.items).map((key, i) => (
            this.props.cart.items[key].item.units > 0 &&
            details.push({ packaging_id: JSON.stringify(this.props.cart.items[key].item), units: `${this.props.cart.items[key].qty}`, rate: this.props.cart.items[key].item.price })
        ))
        const body = {
            firstName: this.state.address.firstName,
            lastName: this.state.address.lastName,
            phone: this.state.address.phone,
            email: this.state.address.email,
            address: {
                'line': this.state.address.addressLine,
                'city': this.state.address.city,
                'country': this.state.address.country,
                'state': this.state.address.state,
                'pincode': this.state.address.pincode
            },
            details: details,
            amount: this.props.cart.totalPrice
        }
        axios.post(BACKEND_URL + '/orders', body)
            .then((res) => {
                this.setState({
                    redirect: '/order/success',
                    order: res.data.order
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


    handleChange = event => {
        let { name, value } = event.target
        let address = Object.assign(this.state)
        address[name] = value
        this.setState({
            address: address
        })
    }

    render() {
        document.title = "Place Order"
        if (this.state.isLoading) {
            return (
                <Loading />
            )
        }

        if (this.state.redirect) {
            return (
                <Redirect to={{
                    pathname: this.state.redirect,
                    order: this.state.order
                }} />
            )
        }

        console.log('component rendered')
        return (
            <div class="container">
                <main>
                    <div class="pb-3 pt-5 text-center ">
                        <h2 class="fw-bold text-uppercase" style={{ color: '#e18841', letterSpacing: '2px', fontSize: '3rem' }}>Checkout</h2>
                    </div>

                    <div class="row g-5">
                        <div class="col-md-5 col-lg-4 order-md-last">
                            <CartComponent cart={this.props.cart} cartLoading={this.props.cartLoading} onClickAdd={this.props.onClickAdd} onClickSub={this.props.onClickSub} onClickUpdate={this.props.onClickUpdate} renderCheckout={false} />
                        </div>
                        <div class="col-md-7 col-lg-8 rdf-order-form py-3">
                            <h4 class="mb-3 fs-3 fw-bold text-uppercase">Billing details</h4>
                            <form class="needs-validation text-body" noValidate onSubmit={this.handleSubmit} method="POST">
                                <div class="row g-3">
                                    <div class="col-sm-6">
                                        <label for="firstName" class="form-label d-flex">First name</label>
                                        <input type="text" class="form-control" id="firstName" placeholder="" name="firstName" value={this.state.address.firstName} required onChange={this.handleChange} />
                                        <div class="invalid-feedback">
                                            Valid first name is required.
                                        </div>
                                    </div>

                                    <div class="col-sm-6">
                                        <label for="lastName" class="form-label d-flex">Last name</label>
                                        <input type="text" class="form-control" id="lastName" placeholder="" name="lastName" value={this.state.address.lastName} required onChange={this.handleChange} />
                                        <div class="invalid-feedback">
                                            Valid last name is required.
                                        </div>
                                    </div>

                                    <div class="col-sm-6">
                                        <label for="phone" class="form-label d-flex">Phone</label>
                                        <input type="text" class="form-control" id="phone" placeholder="" name="phone" value={this.state.address.phone} required onChange={this.handleChange} />
                                        <div class="invalid-feedback">
                                            Valid phone number is required.
                                        </div>
                                    </div>

                                    <div class="col-sm-6">
                                        <label for="email" class="form-label d-flex">Email <span class="text-muted">(Optional)</span></label>
                                        <input type="email" name="email" value={this.state.address.email} class="form-control" id="email" placeholder="you@example.com" onChange={this.handleChange} />
                                        <div class="invalid-feedback">
                                            Please enter a valid email address for shipping updates.
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <label for="address" class="form-label d-flex">Full Address</label>
                                        <input type="text" name="addressLine" value={this.state.address.addressLine} class="form-control" id="address" placeholder="1234 Main St" required onChange={this.handleChange} />
                                        <div class="invalid-feedback">
                                            Please enter your shipping address.
                                        </div>
                                    </div>

                                    <div class="col-12 me-auto d-flex">
                                        Currently we are only serving in Jodhpur, Rajasthan
                                    </div>

                                    <div class="col-md-5">
                                        <label for="country" class="form-label d-flex">Country</label>
                                        <select class="form-select" id="country" name="country" required onChange={this.handleChange}>
                                            <option value="">Choose...</option>
                                            <option>India</option>
                                        </select>
                                        <div class="invalid-feedback">
                                            Please select a valid country.
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <label for="state" class="form-label d-flex">State</label>
                                        <select class="form-select" name="state" id="state" required onChange={this.handleChange}>
                                            <option value="">Choose...</option>
                                            <option>Rajasthan</option>
                                        </select>
                                        <div class="invalid-feedback">
                                            Please provide a valid state.
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <label for="pincode" class="form-label d-flex">Pincode</label>
                                        <input type="text" name="pincode" value={this.state.address.pincode} class="form-control" id="pincode" placeholder="" required onChange={this.handleChange} />
                                        <div class="invalid-feedback">
                                            Pincode code required.
                                        </div>
                                    </div>
                                </div>

                                <hr class="my-4" />

                                <h4 class="mb-3">Payment</h4>

                                <div class="my-3 col-sm-4 d-flex flex-column">
                                    <div class="form-check d-flex">
                                        <input id="cod" name="paymentMethod" type="radio" class="form-check-input me-2" checked required />
                                        <label class="form-check-label" for="paypal">Cash On Delivery</label>
                                    </div>
                                    <div class="form-check d-flex">
                                        <input id="credit" name="paymentMethod" type="radio" class="form-check-input me-2" required disabled />
                                        <label class="form-check-label" for="credit">Credit card</label>
                                    </div>
                                    <div class="form-check d-flex">
                                        <input id="debit" name="paymentMethod" type="radio" class="form-check-input me-2" required disabled />
                                        <label class="form-check-label" for="debit">Debit card</label>
                                    </div>
                                </div>

                                <hr class="my-4" />

                                <SubmitButton props={{ text: 'Place Your Order', bgColor: 'rdf-btn-primary', textColor: 'rdf-btn-dark', width: '250px', height: '50px' }} />
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

