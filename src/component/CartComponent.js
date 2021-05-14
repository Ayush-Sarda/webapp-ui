import react from 'react'
import { Link } from 'react-router-dom'
import '../css/Button.css'
import Button from './elements/Button'
import '../css/Cart.css'
import $ from 'jquery'

class CartComponent extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            scrolled: false
        }
        this.handleScroll = this.handleScroll.bind(this)
    }

    getSnapshotBeforeUpdate() {
        if (this.props.cartLoading) {
            const loadingEl = document.getElementById(this.props.cartLoading.id)
            if (loadingEl) {
                if (this.props.cartLoading.isLoading === true) {
                    loadingEl.classList.add('rdf-cart-loading')
                } else {
                    loadingEl.classList.remove('rdf-cart-loading')
                }
            }
        }
    }

    handleScroll = () => {
        const width = $('#cart').parent().width();
        if (window.scrollY > 288) {
            this.setState({ scrolled: true, width: width })
        } else {
            this.setState({ scrolled: false })
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    render() {
        return (
            <div id='cart' class="p-3 pb-0" style={{
                height: 'min-content', transition: 'all 0.4s' }} ref={el => {
                // if (el) {
                //     if (this.state.scrolled && window.outerWidth > 992) {
                //         el.style.setProperty('position', 'fixed')
                //         el.style.setProperty('top', '80px')
                //         el.style.setProperty('width', `${this.state.width}px`)
                //     } else {
                //         el.style.setProperty('position', 'relative')
                //     }
                // }
            }}>
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span>
                        <h3 class=" fs-2 fw-bold" style={{ color: '#e18841'}}>Cart</h3>
                        {this.props.cart.items ?
                            <h5 class="fs-6 " style={{ color: '#e18841'}}>{Object.keys(this.props.cart.items).length} items</h5>
                            :
                            <h5 class="fs-6 " style={{ color: '#2c2d30' }}>Empty</h5>
                        }
                    </span>
                </h4>
                <ul class="mb-3 p-0">
                    {this.props.cart && Object.keys(this.props.cart.items ? this.props.cart.items : {}).map((key, i) => (
                        <li class="pe-2 d-flex justify-content-between bg-transparent border-0 p-0 py-2 row" ref={el => {
                            if (el) {
                                if (this.props.cart.items[key].item.units <= 0) {
                                    el.style.setProperty('pointer-events', 'none')
                                    el.style.setProperty('opacity', '0.7')
                                }
                            }
                        }}>
                            <div class="col-5 d-flex align-items-center">
                                <h6 class="my-0 fs-7 fw-normal">{this.props.cart.items[key].item.name}</h6>
                            </div>
                            <div class="col-7 row d-flex justify-content-end">
                                <div class="col-6 px-0 d-flex justify-content-center position-relative">
                                    <div id={`cart${key}`} class="row border border-2 align-items-center " style={{ width: '100%', height: '30px' }}>
                                        <div role="button" onClick={() => this.props.onClickSub(key)} class="fw-light-bold col-4 p-0 m-0 text-center text-danger">-</div>
                                        <div class="fw-light-bold col-4 p-0 m-0 text-success text-center fs-7">{this.props.cart.items[key].qty}</div>
                                        <div role="button" onClick={() => this.props.onClickAdd(null, key)} class="fw-light-bold col-4 p-0 m-0 text-center text-success">+</div>
                                    </div>
                                </div>
                                <div class="col-6 d-flex justify-content-end text-dark align-items-center fs-7 fw-normal px-0">₹{this.props.cart.items[key].item.price * this.props.cart.items[key].qty}
                                </div>
                            </div>

                        </li>
                    ))}
                    <li class="pe-2 d-flex justify-content-between bg-transparent border-0 py-2 mt-2 mb-4 row">
                        <div class="col-5 text-dark fs-5 fw-ultra-light-bold">
                            Subtotal
                        </div>
                        <div class="col-7 row d-flex justify-content-end">
                            <div class="col-6 px-0 d-flex justify-content-end">
                                <p class="text-dark fs-6 fw-ultra-light-bold my-0">
                                    ₹{this.props.cart.totalPrice}
                                </p>
                            </div>
                        </div>
                    </li>
                    {Object.keys(this.props.cart.items).length === 0 || !this.props.renderCheckout ?
                        null
                        :
                        <li class="px-0 d-flex flex-row-reverse row px-0" style={{ maxWidth: "1000px", border: "0px", background: 'transparent' }}>
                            <a href={`/order`} class="px-0">
                                <Button props={{ text: 'Checkout', bgColor: 'rdf-btn-primary', textColor: 'rdf-btn-dark', width: '1000px', height: '50px' }} />
                            </a>
                        </li>
                    }
                </ul>
            </div>
        )
    }
}

export default CartComponent