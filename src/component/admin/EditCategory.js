import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import FormValidation from '../../js/FormValidation'
import Input from '../elements/Input'
import ErrorComponent from '../ErrorComponent'

export default class EditCategory extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            input: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.async = true;
        script.onload = FormValidation()
        document.body.appendChild(script);
        const input = {
            name: this.props.category.name,
            description: this.props.category.description,
            url: this.props.category.url,
            type: this.props.category.type,
        }
        this.setState({
            input: input
        })
    }

    updateParentState = async (data) => {
        const promise = new Promise(async (resolve, reject) => {
            axios.get('/categories')
                .then((res) => {
                    this.props.updateState(res.data)
                    resolve(res)
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
        axios.post(`/categories/${this.props.category._id}`, { category: category })
            .then((res) => {
                this.updateParentState(res.data)
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
        if (this.state.redirect) {
            return (
                <Redirect to={`/categories?categoryId=${this.props.category._id}`} />
            )
        }

        return (
            <div class="row d-flex justify-content-center">
                <form class="col-5 row g-3 needs-validation" noValidate method="POST" onSubmit={this.handleSubmit}>
                    <div class="col-12 d-flex justify-content-center">
                        <h3 class="fw-bold fs-1">Edit {this.props.category.name}</h3>
                    </div>
                    <Input params={{ name: 'name', required: true, value: this.state.input.name, type: 'text', invalidMessage: 'Please provide a name' }} handleChange={this.handleChange} />
                    <Input params={{ name: 'description', required: true, value: this.state.input.description, type: 'textarea', invalidMessage: 'Please provide a description' }} handleChange={this.handleChange} />
                    <Input params={{ name: 'type', required: true, value: this.state.input.type, type: 'select', invalidMessage: 'Please provide a type', options: ['NUTS', 'SPICES'] }} handleChange={this.handleChange} />
                    <Input params={{ name: 'url', required: true, value: this.state.input.url, type: 'text', invalidMessage: 'Please provide a url' }} handleChange={this.handleChange} />
                    <div class="col-12">
                        <input type="submit" value="Update" class="btn btn-outline-warning" />
                    </div>
                </form>
            </div>
        )
    }
}
