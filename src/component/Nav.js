import React from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import '../css/Nav.css'
import ErrorComponent from './ErrorComponent'
const BACKEND_URL = "http://dryfruitbackend-env-1.eba-ipwmze3s.ap-south-1.elasticbeanstalk.com/api"

class Nav extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: "",
            categories: []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        axios.get(BACKEND_URL + '/categories')
            .then(res => {
                this.setState({ categories: res.data })
            }).catch(error => {
                console.log(error)
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

    handleClick = event => {
        event.preventDefault()
        axios.get(BACKEND_URL + '/logout')
            .then((res) => {
                this.props.updateUserInfo("", false)
                localStorage.removeItem('user')
                document.cookie.split(";").forEach((c) => {
                    document.cookie = c
                        .replace(/^ +/, "")
                        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                })
                if (window.location.pathname === '/order/all') {
                    this.setState({
                        redirect: '/categories'
                    })
                }
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
        let brandColor = { color: "rgb(225 136 65)", fontSize: '2.1em', fontWeight: '500' }
        let textColor = { color: "rgb(63,42,20, 0.75)" }
        if (this.state.redirect) {
            return (
                <Redirect to={this.state.redirect} />
            )
        }
        return (
            <nav id="header" class="navbar navbar-expand-lg navbar-light mb-3 position-fixed" style={{ fontSize: '1.2em', zIndex: '30', paddingTop: '15px', paddingBottom: '15px', width: 'clamp(10px, 100vw, 100000px)' }} ref={(el) => {
                if (el && this.props.scrolled === true) {
                    el.style.setProperty('background-color', 'rgb(154, 198, 157, 0.76)')
                    el.style.setProperty('backdrop-filter', 'blur(12px)')
                    el.style.setProperty('padding-top', '5px')
                    el.style.setProperty('padding-bottom', '5px')
                } else if (el && this.props.scrolled === false) {
                    el.style.setProperty('background-color', 'transparent')
                    el.style.setProperty('backdrop-filter', 'blur(5px)')
                    el.style.setProperty('padding-top', '15px')
                    el.style.setProperty('padding-bottom', '15px')
                }
            }}>
                <div class="container-fluid">
                    <Link to="/" >
                        <a class="navbar-brand ms-3" style={brandColor}>Dryfruits</a>
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item web-item">
                                <div class="web-link-container">
                                    <ul class="navbar-nav ms-auto">
                                        <li class="nav-item ">
                                            <div class="web-link-container">
                                                <a class="nav-link web-link dropdown-toggle" type="button" id="categoryDropdownButton" data-bs-toggle="dropdown" aria-expanded="false" style={textColor}>Products</a>
                                                <span class="focus-border"></span>
                                                <ul class="dropdown-menu" aria-labelledby="categoryDropdownButton" style={{ maxWidth: '100px', background: 'transparent !important' }}>
                                                    {this.state.categories.map(category => (
                                                        <li>
                                                            <Link to={`/categories/${category._id}/packaging`} >
                                                                <a class="dropdown-item">{category.name}</a>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        {this.props.isAdmin ?
                            <ul class="navbar-nav ms-auto">
                                <li class="nav-item ">
                                    <div class="web-link-container">
                                        <a class="nav-link web-link dropdown-toggle" type="button" id="adminDropdownButton" data-bs-toggle="dropdown" aria-expanded="false" style={textColor}>Admin</a>
                                        <span class="focus-border"></span>
                                        <ul class="dropdown-menu" aria-labelledby="adminDropdownButton" style={{ maxWidth: '100px' }}>
                                            <li>
                                                <Link to='/admin/orders'><a class="dropdown-item" >All Orders</a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                            :
                            null
                        }
                        {this.props.user ?
                            (
                                <ul class="navbar-nav ms-1 me-5">
                                    <li class="nav-item ">
                                        <div class="web-link-container">
                                            <a class="nav-link web-link dropdown-toggle" type="button" id="userDropdownButton" data-bs-toggle="dropdown" aria-expanded="false" style={textColor}>{this.props.user}</a>
                                            <span class="focus-border"></span>
                                            <ul class="dropdown-menu" aria-labelledby="userDropdownButton" style={{ maxWidth: '100px' }}>
                                                <li>
                                                    <Link to="/order/all">
                                                        <a class="dropdown-item" href="/order/all">Orders</a>
                                                    </Link>
                                                </li>
                                                <li><a class="dropdown-item" onClick={this.handleClick} style={{ cursor: "pointer" }}>Logout</a></li>
                                                {/* <li><a class="dropdown-item" href="/cart">Cart</a></li> */}
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            ) :
                            (
                                <ul class="navbar-nav ms-auto">
                                    <li class="nav-item ">
                                        <div class="web-link-container">
                                            <Link to='/login'>
                                                <a class="nav-link web-link" style={textColor} >Login</a>
                                            </Link>
                                            <span class="focus-border"></span>
                                        </div>
                                    </li>
                                    <li class="nav-item ">
                                        <div class="web-link-container">
                                            <Link to='/register'>
                                                <a class="nav-link web-link" style={textColor} >Sign Up</a>
                                            </Link>
                                            <span class="focus-border"></span>
                                        </div>
                                    </li>
                                    {/* <li class="nav-item ">
                                        <Link to='/cart'>
                                            <div class="web-link-container">
                                                <a class="nav-link web-link" style={textColor}>Cart</a>
                                                <span class="focus-border"></span>
                                            </div>
                                        </Link>
                                    </li> */}
                                </ul>
                            )
                        }
                    </div>
                </div>
            </nav>
        )
    }
}
export default Nav