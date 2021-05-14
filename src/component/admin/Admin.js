import axios from 'axios'
import React from 'react'
import { Redirect, Route, Router, Switch } from 'react-router'
import Loading from '../Loading'
import ErrorComponent from '../ErrorComponent'
import Orders from './Orders'
import PageNotFound from '../PageNotFound'

export default class Admin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            admin: true
        }
    }

    componentDidMount() {
        this.setState({
            admin: this.props.isAdmin
        })    
    }

    render() {
        const { match: { path } } = this.props
        if (this.state.redirect || !this.state.admin) {
            return (
                <Redirect to={this.state.redirect ? this.state.redirect : '/categories'} />
            )
        }
        return (
            <div>
                <Switch>
                    <Route path={`${path}/orders`} component={Orders} />
                    <Route path={`${path}`} component={PageNotFound} />
                </Switch>
            </div>
        )
    }
}