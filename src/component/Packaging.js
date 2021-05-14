import React from 'react'
import Loading from './Loading'
import sleep from '../utils/Sleep'
import AllPackaging from './AllPackaging'
import EditPackaging from './admin/EditPackaging'
import { Switch, Route } from 'react-router-dom'
import AddPackaging from './admin/AddPackaging'
import axios from 'axios'
import ErrorComponent from './ErrorComponent'

export default class Packaging extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            packagings: [],
            category: {}
        }
        this.onClickAdd = this.onClickAdd.bind(this)
        this.updateComponent = this.updateComponent.bind(this)
        this.updateState = this.updateState.bind(this)
    }

    updateState = (packagings) => {
        this.setState({ packagings: packagings.packagings })
    }

    updateComponent() {
        this.forceUpdate()
    }

    onClickAdd = async (packagingId) => {
        const { match: { params } } = this.props.props;
        this.props.onClickAdd(params.categoryId, packagingId)
    }

    async componentDidMount() {
        const { match: { params } } = this.props.props;
        await sleep(200)
        axios.get(`/categories/${params.categoryId}/packaging`)
            .then(res => {
                this.setState({
                    isLoading: false,
                    packagings: res.data.packagings,
                    category: res.data
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

    render() {
        document.title = this.state.category ? this.state.category.name : 'Packaging'
        if (this.state.isLoading) {
            return (
                <Loading />
            )
        }

        return (
            <Switch>
                <Route path={`${this.props.props.match.path}/add`} exact render={(props) => {
                    if (this.props.isAdmin === false) {
                        props.history.push(`/categories/${this.props.props.match.params.categoryId}/packaging`)
                    } else {
                        return (
                            <AddPackaging props={props} updateState={this.updateState} />
                        )
                    }
                }} />
                <Route path={`${this.props.props.match.path}/:packagingId/edit`} exact render={(props) => {
                    if (this.props.isAdmin === false) {
                        props.history.push(`/categories/${this.props.props.match.params.categoryId}/packaging`)
                    } else {
                        const packaging = this.state.packagings.find(packaging => {
                            return packaging._id === props.match.params.packagingId
                        })
                        return (
                            <EditPackaging packaging={packaging} props={props} updateComponent={this.updateComponent} updateState={this.updateState} updateCart={this.props.updateCart} />
                        )
                    }
                }} />
                <Route path={`${this.props.props.match.path}`} exact render={(props) => (
                    <AllPackaging cart={this.props.cart} cartLoading={this.props.cartLoading} packagings={this.state.packagings} category={this.state.category} onClickAdd={this.props.onClickAdd} onClickSub={this.props.onClickSub} onClickUpdate={this.props.onClickUpdate} updateState={this.updateState} updateCart={this.props.updateCart} {...props} isAdmin={this.props.isAdmin} />
                )} />

            </Switch>
        )
    }
}