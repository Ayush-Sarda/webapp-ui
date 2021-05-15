import React from 'react';
import CategoryComponent from './CategoryComponent'
import ScrollJS from '../js/ScrollOnRedirect'
import { Link } from 'react-router-dom';

export default class AllCategory extends React.Component {

    componentDidMount() {
        const getQueryParams = window.location.search.replace('?', '').split('&').reduce((r, e) => (r[e.split('=')[0]] = decodeURIComponent(e.split('=')[1]), r), {});
        const script = document.createElement("script");
        script.async = true
        script.onload = ScrollJS.scrollToComponent(getQueryParams.categoryId)
        document.body.appendChild(script)
    }

    render() {
        document.title = 'Category'
        return (
            <div class="web-container" id="category-container" style={{ zIndex: '100' }}>
                <div class="position-absolute d-flex flex-column" style={{ top: '10%', right: '10%',zIndex: '1000' }}>
                    {this.props.isAdmin === true ?
                        <div>
                            <Link to='/categories/add'>
                                <a class="btn btn-primary">Add a new category</a>
                            </Link>
                        </div>
                        :
                        null
                    }
                </div>
                {this.props.categories.map(category => (
                    <CategoryComponent category={category} isAdmin={this.props.isAdmin} />
                ))}
            </div>
        )
    }
}