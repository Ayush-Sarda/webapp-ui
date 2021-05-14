import React from 'react'
import '../../css/v2/CategoryComponent.css'

export default class CategoryComponentV2 extends React.Component {


    render() {
        return (
            <div>
                <div class="rdf-card ms-5 row">
                    <div class="rdf-card-header col-md-3">
                        <img class="rdf-card-img" src="https://image.shutterstock.com/z/stock-photo-old-grunge-dark-textured-wooden-background-the-surface-of-the-brown-wood-texture-image-1645309615.jpg"></img>
                    </div>
                    <div class="rdf-card-content col-md-9 ps-4">
                        <h1 class="rdf-card-head">Heading</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        {/* add weight and cost details */}
                        <h2></h2>
                    </div>
                </div>
            </div>
        )
    }
}