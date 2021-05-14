import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Category.css'
import '../css/Button.css'
import Button from './elements/Button'

export default class CategoryComponent extends React.Component {
    render() {
        return (
            <div class="web-section" id={this.props.category._id} style={{
                backgroundColor: `#f00`, backgroundSize: 'cover', backgroundAttachment: 'fixed', background: 'url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/full-frame-shot-of-raw-almonds-royalty-free-image-683814187-1537885519.jpg)'
            }}>
                <div class="web-content w-100">
                    <h2>{this.props.category.name}</h2>
                    <div class="position-absolute d-flex flex-column" style={{ top: '7%', right: '0%' }}>
                        {this.props.isAdmin === true ?
                            <div>
                                <a class="btn btn-warning btn-sm mx-2" href={`/categories/${this.props.category._id}/edit`}>Edit</a>
                            </div>
                            :
                            null
                        }
                    </div>
                    <p>{this.props.category.description}</p>

                    <Link to={`/categories/${this.props.category._id}/packaging`}>
                        {/* <Button props={{ text: 'See packaging', bgColor: 'rdf-btn-transparent', textColor: 'rdf-btn-dark', width: '250px', height: '50px' }} /> */}
                        <button class="btn btn-success">See Packaging</button>
                    </Link>
                </div>
            </div>
        )
    }
}