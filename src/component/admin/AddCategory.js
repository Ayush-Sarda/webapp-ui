import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import FormValidation from '../../js/FormValidation'
import Input from '../elements/Input'
import ErrorComponent from '../ErrorComponent'
const BACKEND_URL = "http://dryfruitbackend-env-1.eba-ipwmze3s.ap-south-1.elasticbeanstalk.com/api"

export default class AddCategory extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            input: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateParentState = this.updateParentState.bind(this)
    }

    componentDidMount() {
        const script = document.createElement("script")
        script.async = true
        script.onload = FormValidation()
        document.body.appendChild(script)
    }

    updateParentState = async (data) => {
        const promise = new Promise(async (resolve, reject) => {
            axios.get(BACKEND_URL + '/categories')
                .then((res) => {
                    this.props.updateState(res.data)
                    resolve(res)
                }).catch(error => {
                    if (error.response) {
                        throw new Error(error.response.data)
                    }
                })
        })
        const res = await promise
        this.setState({
            redirect: true,
            to: `/categories?categoryId=${data._id}`
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        const category = {
            name: this.state.input.name,
            type: this.state.input.type,
            description: this.state.input.description,
            url: this.state.input.url
        }
        axios.post(`${BACKEND_URL}/categories`, { category: category })
            .then((res) => {
                this.updateParentState(res.data)
            }).catch(error => {
                if (error.response) {
                    this.setState(() => {
                        throw new Error('Something went wrong')
                    })
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
        if (this.state.redirect) {
            return (
                <Redirect to={this.state.to} />
            )
        }
        return (
            <div class="row d-flex justify-content-center">
                <form class="col-5 row g-3 needs-validation" noValidate method="POST" onSubmit={this.handleSubmit}>
                    <div class="col-12 d-flex justify-content-center">
                        <h3 class="fw-bold fs-1">Add new category</h3>
                    </div>
                    <Input params={{ name: 'name', required: true, value: this.state.input.name, type: 'text', invalidMessage: 'Please provide a name' }} handleChange={this.handleChange} />
                    <Input params={{ name: 'description', required: true, value: this.state.input.description, type: 'textarea', invalidMessage: 'Please provide a description' }} handleChange={this.handleChange} />
                    <Input params={{ name: 'type', required: true, value: this.state.input.type, type: 'select', invalidMessage: 'Please select a type', options: ['Choose...', 'NUTS', 'SPICES'] }} handleChange={this.handleChange} />
                    <Input params={{ name: 'url', required: true, value: this.state.input.url, type: 'text', invalidMessage: 'Please provide a url' }} handleChange={this.handleChange} />
                    <div class="col-12">
                        <input type="submit" value="Add" class="btn btn-outline-success" />
                    </div>
                </form>
            </div>
        )
    }
}
