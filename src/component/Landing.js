import axios from 'axios'
import React from 'react'
import { Redirect } from 'react-router'
import '../css/Landing.css'
import Loading from './Loading'
import $ from 'jquery'
import Sleep from '../utils/Sleep'
const BACKEND_URL = "https://dryfruit-demo.herokuapp.com/api"

export default class Landing extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            categories: {},
            loading: true
        }
    }

    componentDidMount() {
        axios.get(BACKEND_URL + '/categories')
            .then(res => {
                this.setState({ categories: res.data, loading: false })
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
        this.images = ['https://media.gettyimages.com/photos/bunch-of-golden-yellow-raisins-isolated-on-white-background-picture-id171306112?k=6&m=171306112&s=612x612&w=0&h=jbgnUo6vFIjMVO4JBD9IeTPdMRRq5iOiCxtFkwW6oWg=', 'https://media.gettyimages.com/photos/close-up-of-dried-apple-slices-picture-id148197894?k=6&m=148197894&s=612x612&w=0&h=wRW0dkNMl2Zsel24tGhmHlBCNnn6kAnM1z-9bEMEI_0=', 'https://media.gettyimages.com/photos/-picture-id903250240?k=6&m=903250240&s=612x612&w=0&h=2zQDbu2i45p8qn-8Vf9DQFdIeCv5V9ndmtdf2yHfGSs=', 'https://media.gettyimages.com/photos/dried-fruiit-picture-id95229424?k=6&m=95229424&s=612x612&w=0&h=fTMemRyM8d-6uItqv7OnVoFcA1zsCKI-ULdbOa-Xy6Y=', 'https://media.gettyimages.com/photos/mix-variety-of-dried-fruit-picture-id880917678?k=6&m=880917678&s=612x612&w=0&h=GfdqnUmBjY61ED6V2wL_UEP74Uqtk7J-_EX_duhBvYU=', 'https://media.gettyimages.com/photos/mix-nuts-dry-fruits-and-grapes-on-a-white-background-in-bowl-picture-id990517438?k=6&m=990517438&s=612x612&w=0&h=gsc39sCTulU-8syFTAn_jGfTD9V-pwblh25UeCcu3No=']
        
        this.setActiveInterval = setInterval(async () => {
            document.querySelector('section').classList.add('active')
            await Sleep(2000)
            const randomElement = this.images[Math.floor(Math.random() * this.images.length)];
            document.querySelector('section').classList.remove('active')
            document.documentElement.style.setProperty('--image', 'url(' + randomElement + ')')
        }, 6500)
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        return (
            <a href="/categories">
                <div style={{ backgroundColor: '#6c3f19', cursor: 'pointer' }}>
                    <div class="rdf-landing-background">
                        {[...Array(321)].map(i => (
                            <div>
                                <img style={{width: '4.4vw', height: '4.4vw', opacity: '0.5'}} src="https://img.icons8.com/fluent/100/000000/almond.png" />
                                <img style={{width: '4.4vw', height: '4.4vw', opacity: '0.5'}} src="https://img.icons8.com/color/100/000000/ceshew.png" />
                            </div>
                        ))}
                    </div>
                    <section>
                        <h2>
                            Welcome !
                        </h2>
                        <div class="rdf-banner">
                            {[...Array(100)].map(i => (
                                <div class="rdf-blocks" ref={el => {
                                    if (el) {
                                        el.style.animationDuration = 0.5 + Math.random() * 1.5 + 's'
                                    }
                                }}></div>
                            ))}
                            {/* <div class="rdf-blocks"></div> */}
                        </div>
                    </section>
                </div>
            </a>
        )
    }
}