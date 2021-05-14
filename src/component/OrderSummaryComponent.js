import React from 'react'

export default class OrderSummaryComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            totalQty: 0
        }
    }

    componentDidMount() {
        let totalQty = 0
        this.props.order.details.map(detail => {
            totalQty += detail.units
        })
        this.setState({totalQty: totalQty})
    }

    render() {
        return (
            <div class="collapse p-2 " id={`collapse${this.props.i}`} style={{ overflow: 'auto' }}>
                <div class="rdf-order-summary border-1 border-top d-flex" ref={el => {
                    if (el) {
                        el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                        el.style.setProperty('width', 'clamp(650px, 100%, 20000px)')
                    }
                }}>
                    <div class="col-2 px-2 py-1 border-2 border-start border-end" ref={el => {
                        if (el) {
                            el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                        }
                    }}>
                        <h1 class="fs-6 text-break fw-bold">S. No.</h1>
                    </div>
                    <div class="col-3 px-2 py-1 border-2 border-start border-end" ref={el => {
                        if (el) {
                            el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                        }
                    }}>
                        <h1 class="fs-6 text-break fw-bold">Name</h1>
                    </div>
                    <div class="col-2 px-2 py-1 border-2 border-start border-end" ref={el => {
                        if (el) {
                            el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                        }
                    }}>
                        <h1 class="fs-6 text-break fw-bold">Weight</h1>
                    </div>
                    <div class="col-2 px-2 py-1 border-2 border-start border-end" ref={el => {
                        if (el) {
                            el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                        }
                    }}>
                        <h1 class="fs-6 text-break fw-bold">Rate</h1>
                    </div>
                    <div class="col-1 px-2 py-1 border-2 border-start border-end" ref={el => {
                        if (el) {
                            el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                        }
                    }}>
                        <h1 class="fs-6 text-break fw-bold">Qty.</h1>
                    </div>
                    <div class="col-2 px-2 py-1 border-2 border-start border-end" ref={el => {
                        if (el) {
                            el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                        }
                    }}>
                        <h1 class="fs-6 text-break fw-bold">Amt.</h1>
                    </div>
                </div>
                {Object.keys(this.props.order.details).map((key, i) => {
                    return (
                        <div class={`d-flex rdf-order-summary border-1 border-top`} ref={el => {
                            if (el) {
                                el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                                el.style.setProperty('width', 'clamp(650px, 100%, 20000px)')
                            }
                        }}>
                            <div class="col-2 px-2 py-1 border-2 border-start border-end" ref={el => {
                                if (el) {
                                    el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                                }
                            }}>
                                <h1 class="fs-6 text-break">{i + 1}.</h1>
                            </div>
                            <div class="col-3 px-2 py-1 border-2 border-start border-end" ref={el => {
                                if (el) {
                                    el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                                }
                            }}>
                                <h1 class="fs-6 text-break">{this.props.order.details[key].packaging_id.name}</h1>
                            </div>
                            <div class="col-2 px-2 py-1 border-2 border-start border-end" ref={el => {
                                if (el) {
                                    el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                                }
                            }}>
                                <h1 class="fs-6 text-break">{this.props.order.details[key].packaging_id.unit_weight} gm</h1>
                            </div>
                            <div class="col-2 px-2 py-1 border-2 border-start border-end" ref={el => {
                                if (el) {
                                    el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                                }
                            }}>
                                <h1 class="fs-6 text-break">₹{this.props.order.details[key].rate}</h1>
                            </div>
                            <div class="col-1 px-2 py-1 border-2 border-start border-end" ref={el => {
                                if (el) {
                                    el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                                }
                            }}>
                                <h1 class="fs-6 text-break">{this.props.order.details[key].units}</h1>
                            </div>
                            <div class="col-2 px-2 py-1 border-2 border-start border-end" ref={el => {
                                if (el) {
                                    el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                                }
                            }}>
                                <h1 class="fs-6 text-break">₹{this.props.order.details[key].units * this.props.order.details[key].rate}</h1>
                            </div>
                        </div>
                    )
                })}
                <div class={`d-flex rdf-order-summary border-1 border-top border-bottom`} ref={el => {
                    if (el) {
                        el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                        el.style.setProperty('width', 'clamp(650px, 100%, 20000px)')
                    }
                }}>
                    <div class="col-9 px-2 py-1 border-2 border-start border-end" ref={el => {
                        if (el) {
                            el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                            el.style.setProperty('text-align', 'center')
                        }
                    }}>
                        <h1 class="fs-6 fw-bold text-break">Total</h1>
                    </div>
                    <div class="col-1 px-2 py-1 border-2 border-start border-end" ref={el => {
                        if (el) {
                            el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                        }
                    }}>
                        <h1 class="fs-6 fw-bold text-break">{this.state.totalQty}</h1>
                    </div>
                    <div class="col-2 px-2 py-1 border-2 border-start border-end" ref={el => {
                        if (el) {
                            el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.6)', 'important')
                        }
                    }}>
                        <h1 class="fs-6 fw-bold text-break">₹{this.props.order.amount}</h1>
                    </div>
                </div>
            </div>
        )
    }
}