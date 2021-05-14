import React from 'react'
import axios from 'axios'
import FormValidation from '../js/FormValidation'
import Input from './elements/Input'
import ErrorComponent from './ErrorComponent'
import GoogleButton from './GoogleButton'
const BACKEND_URL = "https://dryfruit-demo.herokuapp.com/api"

class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            input: {
                username: "",
                password: "",
                name: "",
                email: "",
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.async = true;
        script.onload = FormValidation()
        document.body.appendChild(script);
    }

    handleSubmit = event => {
        event.preventDefault()
        const body = {
            email: this.state.input.email,
            name: this.state.input.name,
            username: this.state.input.username,
            password: this.state.input.password,
        }
        axios.post(BACKEND_URL + '/register', body)
            .then((res) => {
                localStorage.setItem('user', res.data.user)
                this.setState({
                    redirect: true
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
        let input = Object.assign(this.state.input)
        input[name] = value
        this.setState({
            input: input
        })
    }

    render() {
        document.title = 'Sign up'
        if (this.state.redirect) {
            this.props.props.history.goBack()
        }

        return (
            <div class="d-flex justify-content-center">
                <div class="rdf-auth-container col-md-5 col-lg-4 col-8 row d-flex justify-content-center mt-4 p-3">
                    <div class="col-12 d-flex justify-content-start" style={{ paddingInline: '22px' }}>
                        <h1 class="mb-0 fs-1 mt-3" style={{ color: '#734520'}}>Sign Up</h1>
                    </div>
                    <form class="row g-3 needs-validation mt-0" noValidate method="POST" onSubmit={this.handleSubmit}>
                        <Input params={{ name: 'name', required: true, value: this.state.input.name, type: 'text', invalidMessage: 'Please provide a name' }} handleChange={this.handleChange} />
                        <Input params={{ name: 'email', required: true, value: this.state.input.email, type: 'text', invalidMessage: 'Please provide an email address' }} handleChange={this.handleChange} />
                        <Input params={{ name: 'username', required: true, value: this.state.input.username, type: 'text', invalidMessage: 'Please provide a username' }} handleChange={this.handleChange} />
                        <Input params={{ name: 'password', required: true, value: this.state.input.password, type: 'password', invalidMessage: 'Please provide a password' }} handleChange={this.handleChange} />
                        <div class="py-2 mt-3">
                            <input type="submit" value="Sign Up" class="btn btn-outline-primary" />
                        </div>
                    </form>
                    <div class="d-flex justify-content-center mt-4">
                        <h4>OR</h4>
                    </div>
                    <GoogleButton text="Sign Up with Google" />
                </div>
            </div>
        )
    }
}

export default Register