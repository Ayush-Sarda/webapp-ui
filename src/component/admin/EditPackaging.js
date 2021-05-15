import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import FormValidation from '../../js/FormValidation'
import Input from '../elements/Input'
import ErrorComponent from '../ErrorComponent'
const BACKEND_URL = "http://dryfruitbackend-env-1.eba-ipwmze3s.ap-south-1.elasticbeanstalk.com/api"

export default class EditPackaging extends React.Component {

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

    updateParentState = async (data) => {
        const promise = new Promise(async (resolve, reject) => {
            axios.get(`${BACKEND_URL}/categories/${this.props.props.match.params.categoryId}/packaging`)
                .then(res => {
                    this.props.updateState(res.data)

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
            axios.get(BACKEND_URL + '/cart/session-cart')
                .then(res => {
                    this.props.updateCart(res.data)
                    resolve('success')
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
            to: `/categories/${this.props.props.match.params.categoryId}/packaging?packagingId=${data._id}`
        })
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.async = true;
        script.onload = FormValidation()
        document.body.appendChild(script);
        const input = {
            name: this.props.packaging.name,
            description: this.props.packaging.description,
            image_url: this.props.packaging.image_url,
            unit_weight: this.props.packaging.unit_weight,
            units: this.props.packaging.units,
            price: this.props.packaging.price,
            gst: this.props.packaging.gst
        }
        this.setState({
            input: input
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        const packaging = {
            name: this.state.input.name,
            description: this.state.input.description,
            image_url: this.state.input.image_url,
            unit_weight: this.state.input.unit_weight,
            units: this.state.input.units,
            price: this.state.input.price,
            gst: this.state.input.gst
        }
        axios.post(`${BACKEND_URL}/categories/${this.props.props.match.params.categoryId}/packaging/${this.props.props.match.params.packagingId}`, { packaging: packaging })
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
                <Redirect to={`/categories/${this.props.props.match.params.categoryId}/packaging?packagingId=${this.props.props.match.params.packagingId}`} />
            )
        }

        return (
            <div class="row d-flex justify-content-center">
                <form class="col-5 row g-3 needs-validation" noValidate method="POST" onSubmit={this.handleSubmit}>
                    <div class="col-12 d-flex justify-content-center">
                        <h3 class="fw-bold fs-1">Edit {this.props.packaging.name}</h3>
                    </div>
                    <Input params={{ name: 'name', required: true, value: this.state.input.name, type: 'text', invalidMessage: 'Please provide a name' }} handleChange={this.handleChange} />
                    <Input params={{ name: 'description', required: true, value: this.state.input.description, type: 'textarea', invalidMessage: 'Please provide a description' }} handleChange={this.handleChange} />
                    <Input params={{ name: 'gst', required: true, value: this.state.input.gst, type: 'select', invalidMessage: 'Please select a gst option', options: ['12', '15', '18'] }} handleChange={this.handleChange} />
                    <Input params={{ name: 'image_url', required: true, value: this.state.input.image_url, type: 'text', invalidMessage: 'Please provide an image url' }} handleChange={this.handleChange} />
                    <Input params={{ name: 'unit_weight', required: true, value: this.state.input.unit_weight, type: 'text', invalidMessage: 'Please provide a unit weight' }} handleChange={this.handleChange} />
                    <Input params={{ name: 'units', required: true, value: this.state.input.units, type: 'text', invalidMessage: 'Please provide units' }} handleChange={this.handleChange} />
                    <Input params={{ name: 'price', required: true, value: this.state.input.price, type: 'text', invalidMessage: 'Please provide a price' }} handleChange={this.handleChange} />
                    <div class="col-12">
                        <input type="submit" value="Update" class="btn btn-outline-warning" />
                    </div>
                </form>
            </div>
        )
    }
}
