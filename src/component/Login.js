import React from 'react'
import { Link } from 'react-router-dom'
import FormValidation from '../js/FormValidation'
import axios from 'axios'
import Input from './elements/Input'
import '../css/Auth.css'
import GoogleButton from './GoogleButton'
const BACKEND_URL = "https://dryfruitbackend-env-1.eba-ipwmze3s.ap-south-1.elasticbeanstalk.com/api"

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            input: {
                username: "",
                password: ""
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        const script = document.createElement("script")
        script.async = true
        script.onload = FormValidation()
        document.body.appendChild(script)
    }

    onSubmit = (event) => {
        event.preventDefault()
        axios.post(BACKEND_URL + '/login', { username: this.state.input.password, password: this.state.input.password })
            .then(res => {
                console.log(res)
                localStorage.setItem('user', res.data.user)
                this.props.updateUserInfo(res.data.user, res.data.isAdmin)
                axios.get(BACKEND_URL + '/cart')
                    .then(cart => {
                        this.props.updateCart(cart.data)
                        this.props.history.go(-1)
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
            }).catch(error => {
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            this.setState({
                                input: {
                                    username: "",
                                    password: ""
                                }
                            })
                            alert('Bad credentials')
                            break
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
        let input = Object.assign(this.state.input)
        input[name] = value
        this.setState(prevState => ({
            redirect: prevState.redirect,
            input: input
        }))
    }

    render() {
        document.title = 'Login'
        return (
            <div class="d-flex justify-content-center">
                <div class="rdf-auth-container col-md-5 col-lg-4 col-8 row d-flex justify-content-center mt-4 p-3">
                    <div class="col-12 d-flex justify-content-start" style={{ paddingInline: '22px' }}>
                        <h1 class="mb-0 fs-1" style={{ color: '#734520' }}>Login</h1>
                    </div>
                    <form class="row g-3 needs-validation mt-0" noValidate onSubmit={this.onSubmit} method="POST">
                        <Input params={{ name: 'username', required: true, value: this.state.input.username, type: 'text', invalidMessage: 'Please provide a username' }} handleChange={this.handleChange} />
                        <Input params={{ name: 'password', required: true, value: this.state.input.password, type: 'password', invalidMessage: 'Please provide a password' }} handleChange={this.handleChange} />
                        <div class="col-12 mt-4">
                            <input type="submit" value="Login" class="btn btn-outline-primary" />
                        </div>
                    </form>
                    <div class="d-flex justify-content-center mt-4">
                        <h4>OR</h4>
                    </div>
                    <GoogleButton text="Sign In with Google" />
                    <div class="mt-4 d-flex justify-content-center" style={{ color: '#040404', fontSize: 'clamp(0rem, 4vw, 1.1rem)' }}>
                        <p>Don't have an account?</p>
                        <Link to="/register">
                            <div class="d-block">
                                <span class="ms-1">Create account</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login