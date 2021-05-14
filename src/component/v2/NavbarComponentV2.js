import React from 'react'
import '../../css/v2/Nav.css'

export default class NavbarComponentV2 extends React.Component {


    render() {
        return (
            <div class="d-flex justify-content-center align-items-center">
                <nav class="rdf-navbar d-flex justify-content-between align-items-center mt-3">
                    <ul class="rdf-nav-list">
                        <li class="rdf-nav-list-item">Logo</li>
                        <li class="rdf-nav-list-item">Products</li>
                    </ul>
                    <ul class="rdf-nav-list">
                        <li class="rdf-nav-list-item">Login</li>
                        <li class="rdf-nav-list-item">Sign Up</li>
                    </ul>
                </nav>
            </div>
        )
    }
}