import react from 'react'
import Loading from './Loading'
import '../css/Category.css'
import { Route, Switch } from 'react-router-dom'
import EditCategory from './admin/EditCategory'
import AllCategory from './AllCategory'
import AddCategory from './admin/AddCategory'
import ErrorComponent from './ErrorComponent'
import axios from 'axios'

class Category extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            reload: false
        }
        this.updateState = this.updateState.bind(this)
    }

    updateState = (categories) => {
        this.setState({ categories: categories })
    }

    async componentDidMount() {
        axios.get('/categories')
            .then(res => {
                this.setState({
                    categories: res.data,
                    isLoading: false
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
        document.title = 'Category'
        if (this.state.isLoading) {
            return (
                <Loading />
            )
        }

        return (
            <Switch>
                <Route path={`${this.props.props.match.path}/add`} exact render={(props) => {
                    console.log(this.props)
                    if (this.props.isAdmin !== true) {
                        props.history.push('/categories')
                    } else {
                        return (
                            <AddCategory updateState={this.updateState} />
                        )
                    }
                }} />
                <Route path={`${this.props.props.match.path}/:categoryId/edit`} exact render={(props) => {
                    if (this.props.isAdmin !== true) {
                        props.history.push('/categories')
                    } else {
                        const category = this.state.categories.find(category => (
                            category._id === props.match.params.categoryId
                        ))
                        return (
                            <EditCategory category={category} updateState={this.updateState} />
                        )
                    }
                }} />
                <Route path={`${this.props.props.match.path}`} exact render={(props) => (
                    <AllCategory isAdmin={this.props.isAdmin} categories={this.state.categories} props={props} />
                )} />
            </Switch>
        )
    }
}

export default Category