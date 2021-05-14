import React from 'react'
import PackagingComponent from './PackagingComponent'
import CartComponent from './CartComponent'
import ScrollJS from '../js/ScrollOnRedirect'
import CategoryListComponent from './CategoryListComponent';
import '../css/Packaging.css'


export default class AllPackaging extends React.Component {

    componentDidMount() {
        const getQueryParams = window.location.search.replace('?', '').split('&').reduce((r, e) => (r[e.split('=')[0]] = decodeURIComponent(e.split('=')[1]), r), {});
        const script = document.createElement("script");
        script.async = true;
        script.onload = ScrollJS.scrollToComponent(getQueryParams.packagingId)
        document.body.appendChild(script)
        // this.props.location.search = ""
        // window.location.replace(window.location.pathname)
    }

    render() {
        return (
            <div>
                <div class="rdf-packaging-header d-flex align-items-center justify-content-start p-3" style={{ height: '100%', backgroundColor: '#8429039c', flexWrap: 'wrap' }}>
                    <img class="rdf-packaging-header-img me-4" src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/full-frame-shot-of-raw-almonds-royalty-free-image-683814187-1537885519.jpg' />
                    <div class="">
                        <p class="fw-bold my-0" style={{ color: '#e18841', fontSize: 'clamp(4rem, 12vw, 8rem)' }}>
                            {this.props.category.name}
                        </p>
                    </div>
                </div>
                <div class="row d-flex justify-content-between mt-5 px-4">
                    <div class="col-lg-2 align-self-start d-none d-lg-block align-self-stretch border-4 border-end" ref={el => {
                        if (el) {
                            el.style.setProperty('border-color', '#e188415e', 'important')
                        }
                    }}>
                        <CategoryListComponent id={this.props.category._id} />
                    </div>
                    <div class="d-flex justify-content-start col-lg-6 order-2 order-lg-1 py-2">
                        <div class="row d-flex justify-content-center">
                            {this.props.isAdmin === true ?
                                <div class="my-2">
                                    <a href={`/categories/${this.props.match.params.categoryId}/packaging/add`} class="btn btn-outline-primary">Add a new Packaging</a>
                                </div>
                                :
                                null
                            }
                            {this.props.packagings.map(packaging => (
                                <PackagingComponent onClickAdd={this.props.onClickAdd} packaging={packaging} {...this.props} isAdmin={this.props.isAdmin} updateState={this.props.updateState} updateCart={this.props.updateCart} />
                            ))}
                        </div>
                    </div>
                    <div class="col-lg-3 order-1 order-lg-2 px-0 py-2">
                        <CartComponent cart={this.props.cart} cartLoading={this.props.cartLoading} onClickAdd={this.props.onClickAdd} onClickSub={this.props.onClickSub} onClickUpdate={this.props.onClickUpdate} renderCheckout={true} />
                    </div>
                </div>
            </div>
        )
    }
}