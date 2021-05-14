import React from 'react'

export default class AddAndSubscriber extends React.Component {


    render() {
        return (
            <div class="row border border-dark" style={{ width: '80px' }}>
                <div role="button" onClick={() => this.props.onClickSub(key)} class="col-4 p-0 m-0 text-center text-dark">-</div>
                <div class="col-4 p-0 m-0 text-dark text-center">{this.state.cart.items[key].qty}</div>
                <div role="button" onClick={() => this.props.onClickAdd(key)} class="col-4 p-0 m-0 text-center text-dark">+</div>
            </div>
        )
    }
}