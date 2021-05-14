import './App.css';
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Category from './component/Category';
import Packaging from './component/Packaging'
import OrderSuccessPage from './component/OrderSuccessPage';
import Nav from './component/Nav';
import Footer from './component/Footer'
import OrderForm from './component/OrderForm'
import Landing from './component/Landing'
import Login from './component/Login'
import Register from './component/Register'
import UserOrders from './component/UserOrders'
import CartComponent from './component/CartComponent'
import PackagingService from './service/PackagingService'
import Admin from './component/admin/Admin'
import UserOrderComponent from './component/UserOrderComponent'
import axios from 'axios'
import Loading from './component/Loading'
import PageNotFound from './component/PageNotFound'
import ErrorComponent from './component/ErrorComponent'
import Sleep from './utils/Sleep'
import ErrorBoundary from './component/ErrorBoundary';
import NavbarScroll from './js/NavbarScroll';
import CategoryListComponent from './component/CategoryListComponent';
import walnut from './walnut.png'
import BackgroundComponent from './component/BackgroundComponent';
const BACKEND_URL = "https://dryfruit-demo.herokuapp.com/api"

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
			user: "",
			isAdmin: false,
			cart: {
				items: {}
			},
			cartLoading: {
				isLoading: false,
				id: null
			},
			scrolled: false
		}
		this.onClickAdd = this.onClickAdd.bind(this)
		this.onClickSub = this.onClickSub.bind(this)
		this.updateUserInfo = this.updateUserInfo.bind(this)
		this.updateCart = this.updateCart.bind(this)
	}

	onClickAdd = async (categoryId, packagingId) => {
		if (this.state.cartLoading.isLoading) {
			return
		}
		this.setState({
			cartLoading: {
				isLoading: true,
				id: `cart${packagingId}`
			}
		})
		// await Sleep(2000)
		const prevState = JSON.parse(JSON.stringify(this.state))
		let storedItem = prevState.cart.items[packagingId];
		if (!storedItem) {
			let packaging = await PackagingService.getPackaging(categoryId, packagingId)
			storedItem = prevState.cart.items[packagingId] = { item: packaging, qty: 0 };
		}
		prevState.cart.items[packagingId].qty++
		prevState.cart.totalQty++
		prevState.cart.totalPrice += prevState.cart.items[packagingId].item.price
		axios.post(BACKEND_URL + '/cart/update', { cart: prevState.cart, method: 'ADD', packagingId: packagingId })
			.then(res => {
				this.setState({
					cart: res.data,
					cartLoading: {
						isLoading: false,
						id: `cart${packagingId}`
					}
				})
			})
	}

	onClickSub = async (packagingId) => {
		if (this.state.cartLoading.isLoading) {
			return
		}
		this.setState({
			cartLoading: {
				isLoading: true,
				id: `cart${packagingId}`
			}
		})
		// await Sleep(2000)
		const prevState = JSON.parse(JSON.stringify(this.state))
		if (prevState.cart.items[packagingId].qty === 1) {
			prevState.cart.items[packagingId].qty--
			prevState.cart.totalQty--
			prevState.cart.totalPrice -= prevState.cart.items[packagingId].item.price
			delete prevState.cart.items[packagingId]
		}
		else {
			prevState.cart.items[packagingId].qty--
			prevState.cart.totalQty--
			prevState.cart.totalPrice -= prevState.cart.items[packagingId].item.price
		}
		axios.post(BACKEND_URL + '/cart/update', { cart: prevState.cart, method: 'SUBTRACT', packagingId: packagingId })
			.then(res => {
				this.setState({
					cart: res.data,
					cartLoading: {
						isLoading: false,
						id: `cart${packagingId}`
					}
				})
			})
	}

	updateUserInfo = (user, isAdmin) => {
		this.setState({
			isAdmin: isAdmin,
			user: user
		})
	}

	updateCart = (cart) => {
		this.setState({ cart: cart })
	}

	scrollListener = () => {
		if (window.pageYOffset > 30) {
			if (!this.state.scrolled) {
				this.setState({ scrolled: true });
			}
		} else {
			if (this.state.scrolled) {
				this.setState({ scrolled: false });
			}
		}
	}

	async componentDidMount() {
		window.addEventListener('scroll', this.scrollListener)
		console.log(BACKEND_URL)
		const getQueryParams = window.location.search.replace('?', '').split('&').reduce((r, e) => (r[e.split('=')[0]] = decodeURIComponent(e.split('=')[1]), r), {})
		const user = getQueryParams.user
		if (user) {
			localStorage.setItem('user', user)
		}
		const loggedInUser = localStorage.getItem('user')
		if (loggedInUser) {
			this.setState({
				user: loggedInUser
			})
		}
		axios.get(BACKEND_URL + '/isAdmin')
			.then(res => {
				this.setState({
					isAdmin: true
				})
			}).catch(error => {
				if (error.response) {
					switch (error.response.status) {
						case 500:
							this.setState(() => {
								throw new Error(error.response.data)
							})

						default:
							break
					}
				}
			})
		axios.get(BACKEND_URL + '/cart')
			.then(res => {
				this.setState({
					cart: res.data
				})
				this.setState({
					isLoading: false
				})
			})
	}

	render() {
		if (this.state.isLoading) {
			return (
				<Loading />
			)
		}
		return (
			<div class="App overflow-hidden" style={{ minHeight: "100vh", position: "relative", backgroundColor: '#ffd6b47d' }}>
				<ErrorBoundary>
					<Switch>
						<Route path='/' exact render={() => (<Landing />)} />
						<Route path='/' render={() => (
							<div style={{ minHeight: 'calc(100vh - 290px)' }}>
								<BackgroundComponent />
								<Nav user={this.state.user} updateUserInfo={this.updateUserInfo} isAdmin={this.state.isAdmin} scrolled={this.state.scrolled} />
								<div id="main-content">
									{this.state.scrolled === true ?
										<div style={{ height: '80px' }}></div>
										:
										<div style={{ height: '100px' }}></div>
									}
									<Switch>
										<Route path='/categories/:categoryId/packaging' render={(props) => (
											<Packaging cart={this.state.cart} cartLoading={this.state.cartLoading} onClickAdd={this.onClickAdd} onClickSub={this.onClickSub} onClickUpdate={this.onClickUpdate} updateCart={this.updateCart} renderCheckout={true} props={props} isAdmin={this.state.isAdmin} />
										)} />
										<Route path='/categories' render={(props) => (
											<Category isAdmin={this.state.isAdmin} props={props} />
										)} />
										<Route path='/order/success' exact render={(props) => (<OrderSuccessPage {...props} />)} />
										<Route path='/order' exact render={() => (
											<OrderForm cart={this.state.cart} cartLoading={this.state.cartLoading} onClickAdd={this.onClickAdd} onClickSub={this.onClickSub} onClickUpdate={this.onClickUpdate} />
										)} />
										<Route path='/webapp-ui/login' exact render={(props) => (
											!this.state.user ?
												<Login updateUserInfo={this.updateUserInfo} {...props} updateCart={this.updateCart} />
												:
												<Redirect to='/' />
										)} />
										<Route path='/register' exact render={(props) => (
											!this.state.user ?
												<Register props={props} />
												:
												<Redirect to='/' />
										)} />
										<Route path='/order/all' exact render={(props) => (<UserOrders {...props} />)} />
										<Route path='/test' exact render={() => (<Landing />)} />
										<Route path='/admin' render={(props) => (<Admin isAdmin={this.state.isAdmin} {...props} />)} />
										{/* <Route path='/cart' exact render={() => (
												<CartComponent cart={this.state.cart} cartLoading={this.state.cartLoading} onClickAdd={this.onClickAdd} onClickSub={this.onClickSub} onClickUpdate={this.onClickUpdate} renderCheckout={true} />
											)} /> */}
										<Route path='/' render={props => (
											<PageNotFound />
										)} />
									</Switch>
								</div>
								<Footer />
							</div>
						)} />
						</Switch>
				</ErrorBoundary>
			</div>
		)
	}
}

export default App;
