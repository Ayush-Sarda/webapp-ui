import axios from 'axios'
import React from 'react'
import '../css/CategoryList.css'
import $ from 'jquery'

export default class CategoryListComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios.get('/categories')
            .then(res => {
                this.setState({ categories: res.data })
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
        return (
            <ul class="rdf-category-list" style={{height: '100%'}}>
                <li class={`px-2 my-1 d-flex justify-content-end`}>
                    <p class="text-dark fs-3 m-0 fw-bold rdf-list-link">
                        <p style={{ color: '#e18841'}}>Category</p>
                    </p>
                </li>
                {this.state.categories.map(category => (
                    <li id={category._id} class={`px-2 my-1 d-flex justify-content-end ${category._id === this.props.id ? 'active' : null}`}>
                        <a class="text-dark fs-5 fw-normal rdf-list-link" href={`/categories/${category._id}/packaging`}>
                            {category.name}
                        </a>
                    </li>
                ))}
            </ul>
        )
    }
}