import React from 'react'
import '../css/Progress.css'
import checkProgress from '../checkProgress.png'

export default class ProgressComponent extends React.Component {

    render() {
        let status = this.props.status
        let statusStep = status === 'PENDING' ? 0 : status === 'PACKED' ? 1 : status === 'SHIPPED' ? 2 : status === 'DELIVERED' ? 3 : -1
        return (
            <div class="row p-3" style={{ maxWidth: '540px'}}>
                <div class="row col-12 p-0" style={{ height: '30px' }}>
                    <div class="col-3 p-0 d-flex align-items-center justify-content-center position-relative">
                        <div class="w-50 position-absolute" style={{ height: '5px', backgroundColor: 'rgb(59, 181, 74)', left: '50%' }} ref={el => {
                            if (el) {
                                if (statusStep < 0) {
                                    el.style.setProperty('filter', 'grayscale(100%)')
                                    el.parentElement.style.setProperty('opacity', '0.7')
                                }
                            }
                        }}></div>
                        <div class="rounded-circle position-absolute" >
                            <img src={checkProgress} style={{ height: 'clamp(10px, 6vw, 30px)', width: 'clamp(10px, 6vw, 30px)' }} ref={el => {
                                if (el) {
                                    if (statusStep < 0) {
                                        el.style.setProperty('filter', 'grayscale(100%)')
                                    }
                                }
                            }}></img>
                        </div>
                    </div>
                    <div class="col-3 p-0 d-flex align-items-center justify-content-center position-relative">
                        <div class="w-100" style={{ height: '5px', backgroundColor: 'rgb(59, 181, 74)' }} ref={el => {
                            if (el) {
                                if (statusStep < 1) {
                                    el.style.setProperty('filter', 'grayscale(100%)')
                                    el.parentElement.style.setProperty('opacity', '0.7')
                                }
                            }
                        }}></div>
                        <div class="rounded-circle position-absolute">
                            <img src={checkProgress} style={{ height: 'clamp(10px, 6vw, 30px)', width: 'clamp(10px, 6vw, 30px)' }} ref={el => {
                                if (el) {
                                    if (statusStep < 1) {
                                        el.style.setProperty('filter', 'grayscale(100%)')
                                    }
                                }
                            }}></img>
                        </div>
                    </div>
                    <div class="col-3 p-0 d-flex align-items-center justify-content-center position-relative">
                        <div class="w-100" style={{ height: '5px', backgroundColor: 'rgb(59, 181, 74)' }} ref={el => {
                            if (el) {
                                if (statusStep < 2) {
                                    el.style.setProperty('filter', 'grayscale(100%)')
                                    el.parentElement.style.setProperty('opacity', '0.7')
                                }
                            }
                        }}></div>
                        <div class="rounded-circle position-absolute">
                            <img src={checkProgress} style={{ height: 'clamp(10px, 6vw, 30px)', width: 'clamp(10px, 6vw, 30px)' }} ref={el => {
                                if (el) {
                                    if (statusStep < 2) {
                                        el.style.setProperty('filter', 'grayscale(100%)')
                                    }
                                }
                            }}></img>
                        </div>
                    </div>
                    <div class="col-3 p-0 d-flex align-items-center justify-content-center position-relative">
                        <div class="w-50 position-absolute" style={{ height: '5px', backgroundColor: 'rgb(59, 181, 74)', right: '50%' }} ref={el => {
                            if (el) {
                                if (statusStep < 3) {
                                    el.style.setProperty('filter', 'grayscale(100%)')
                                    el.parentElement.style.setProperty('opacity', '0.7')
                                }
                            }
                        }}></div>
                        <div class="rounded-circle position-absolute">
                            <img src={checkProgress} style={{ height: 'clamp(10px, 6vw, 30px)', width: 'clamp(10px, 6vw, 30px)' }} ref={el => {
                                if (el) {
                                    if (statusStep < 3) {
                                        el.style.setProperty('filter', 'grayscale(100%)')
                                    }
                                }
                            }}></img>
                        </div>
                    </div>
                </div>
                <div class="col-12 row p-0 mt-1">
                    <div class="col-3 p-0 text-center">
                        <h1 class="fw-normal text-success" style={{ fontSize: 'clamp(0px, 3.2vw, 20px)' }} ref={el => {
                            if (el) {
                                if (statusStep < 0) {
                                    el.style.setProperty('filter', 'grayscale(100%)')
                                    el.style.setProperty('opacity', '0.7')
                                }
                            }
                        }}>RECIEVED</h1>
                    </div>
                    <div class="col-3 p-0 text-center">
                        <h1 class="w-normal text-success" style={{ fontSize: 'clamp(0px, 3.2vw, 20px)' }} ref={el => {
                            if (el) {
                                if (statusStep < 1) {
                                    el.style.setProperty('filter', 'grayscale(100%)')
                                    el.style.setProperty('opacity', '0.7')
                                }
                            }
                        }}>PACKED</h1>
                    </div>
                    <div class="col-3 p-0 text-center">
                        <h1 class="fw-normal text-success" style={{ fontSize: 'clamp(0px, 3.2vw, 20px)' }} ref={el => {
                            if (el) {
                                if (statusStep < 2) {
                                    el.style.setProperty('filter', 'grayscale(100%)')
                                    el.style.setProperty('opacity', '0.7')
                                }
                            }
                        }}>SHIPPED</h1>
                    </div>
                    <div class="col-3 p-0 text-center">
                        <h1 class="fw-normal text-success" style={{ fontSize: 'clamp(5px, 3.2vw, 20px)' }} ref={el => {
                            if (el) {
                                if (statusStep < 3) {
                                    el.style.setProperty('filter', 'grayscale(100%)')
                                    el.style.setProperty('opacity', '0.7')
                                }
                            }
                        }}>DELIVERED</h1>
                    </div>
                </div>
            </div>
        )
    }
}