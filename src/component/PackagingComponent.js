import axios from 'axios'
import React from 'react'
import Button from './elements/Button'
import '../css/Packaging.css'
const BACKEND_URL = "https://dryfruit-demo.herokuapp.com/api"

export default class PackagingComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reload: false,
        }
        this.updateParentState = this.updateParentState.bind(this)
    }

    updateParentState = async () => {
        const promise = new Promise(async (resolve, reject) => {
            axios.get(`${BACKEND_URL}/categories/${this.props.match.params.categoryId}/packaging`)
                .then(async (res) => {
                    this.props.updateState(res.data)
                    window.location.reload()
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
    }

    deletePackaging = (event) => {
        event.preventDefault()
        axios.post(`${BACKEND_URL}/categories/${this.props.match.params.categoryId}/packaging/${this.props.packaging._id}/delete`)
            .then(async (res) => {
                axios.get(BACKEND_URL + '/cart')
                    .then(res => {
                        this.props.updateCart(res.data)
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
                window.location.replace(`/categories/${this.props.match.params.categoryId}/packaging/`)
            })
    }

    render() {
        let packaging = this.props.packaging
        return (
            <div id={packaging._id} class="position-relative">
                <div class="modal fade" style={{ zIndex: '1100' }} id={`deletePackaging${packaging._id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Confirm delete?</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-dark">
                                Are you sure you want to delete {packaging.name}
                            </div>
                            <div class="modal-footer">
                                <form onSubmit={this.deletePackaging} method="POST">
                                    <input type="submit" class="btn btn-danger" onClick={this.deletePackaging} data-bs-dismiss="modal" value="Delete" />
                                </form>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isAdmin === true ?
                    <div>
                        <div class="position-absolute" style={{ top: '10%', right: '1%', zIndex: '10' }}>
                            <a href={`/categories/${this.props.match.params.categoryId}/packaging/${packaging._id}/edit`} class="btn btn-warning btn-sm mx-2">Edit</a>
                            <button type="button" class="btn btn-danger btn-sm mx-2" data-bs-toggle="modal" data-bs-target={`#deletePackaging${packaging._id}`}>
                                Delete
                            </button>


                        </div>
                    </div>
                    :
                    null
                }
                <div class="pb-3" ref={el => {
                    if (el) {
                        if (packaging.units === 0) {
                            el.style.setProperty('pointer-events', 'none')
                            el.style.setProperty('opacity', 0.7)
                        }
                    }
                }}>
                    <div class="rdf-packaging row py-4">
                        <div class="col-md-4 d-flex justify-content-center align-items-center">
                            <img style={{ width: '100%', height: '100%' }} src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"></img>
                        </div>
                        <div class="col-md-8 d-flex">
                            <div class="col-8">
                                <h2 class="fs-5 fw-bold my-2">{packaging.name}</h2>
                                <h2 class="fs-6 fw-normal mb-2">{packaging.description}</h2>
                                <h2 class="fs-5 fw-bold text-secondary">₹{packaging.price}</h2>
                            </div>
                            <div class="d-flex align-self-end col-4 justify-content-end" onClick={() => this.props.onClickAdd(this.props.match.params.categoryId, this.props.packaging._id)}>
                                <Button props={{ text: 'Add', bgColor: 'rdf-btn-danger', textColor: 'rdf-btn-dark', width: '100px', height: '50px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}