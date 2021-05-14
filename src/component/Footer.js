import React from 'react'
import phone from '../phone.png'
import gmail from '../gmail.png'
import location from '../location.png'

function Footer() {
    return (
        <div class="mt-5 py-3 text-center bg-dark text-light w-100" style={{zIndex: 0, height: 'min-content'}}>
            <div class="row justify-content-between">
                <div class="col-6">
                    <h2 class="text-light fs-2 fw-normal text-center">Address</h2>
                    <p class="fs-6 fw-normal p-1 m-0" ref={el => {
                        if (el) {
                            el.style.setProperty('font-size', 'clamp(0px, 4vw, 1rem)')
                        }
                    }}>
                        <img src={location} class="my-1" style={{ maxWidth: '25px', maxHeight: '25px' }} alt="" />
                        <span> </span>
                        Shop No. 1, Veer Sawarkar Block, Mandore Mandi,
                        <br />
                        Jodhpur, Rajasthan, 342006
                    </p>
                </div>
                <div class="col-6">
                    <h2 class="text-light fs-2 fw-normal text-center">Contact</h2>
                    <p class="fs-6 fw-normal p-1 m-0 text-break" ref={el => {
                        if (el) {
                            el.style.setProperty('font-size', 'clamp(0px, 4vw, 1rem)')
                        }
                    }}>
                        <img src={phone} class="my-1" style={{ maxWidth: '25px', maxHeight: '25px' }} alt="" />
                        <span> </span>
                        9413319397
                        <br />
                        <img src={phone} class="my-1" style={{ maxWidth: '25px', maxHeight: '25px' }} alt="" />
                        <span> </span>
                        9461123500
                        <br />
                        <img src={phone} class="my-1" style={{ maxWidth: '25px', maxHeight: '25px' }} alt="" />
                        <span> </span>
                        9414477681
                        <br />
                        <img src={phone} class="my-1" style={{ maxWidth: '25px', maxHeight: '25px' }} alt="" />
                        <span> </span>
                        7014872235
                        <br />
                        <img src={gmail} class="my-1" style={{ maxWidth: '25px', maxHeight: '25px' }} alt="" />
                        <span> </span>
                        raghavsarda14@gmail.com
                    </p>
                </div>
            </div>
        </div>
    )
}



export default Footer