import React from 'react'
import walnut from '../walnut.png'
import almond from '../almond.png'
import pistachio from '../pistachio.png'

export default class BackgroundComponent extends React.Component {
    shouldComponentUpdate() {
        return false
    }

    render() {
        return (
            <div>
                <div style={{ zIndex: '-1', position: 'absolute', top: `${Math.random() * 10}%`, left: `${Math.random() * 20}%`, transform: 'rotate(49deg) translate(-50%, -50%)' }}>
                    <img src={walnut} style={{ height: '70%', width: '70%', opacity: '0.7' }} />
                </div>
                <div style={{ zIndex: '-1', position: 'absolute', top: `${Math.random() * 10}%`, left: `${20 + Math.random() * 20}%`, transform: 'rotate(201deg) translate(-50%, -50%)' }}>
                    <img src={almond} style={{ height: '70%', width: '70%', opacity: '0.7' }} />
                </div>
                <div style={{ zIndex: '-1', position: 'absolute', top: `${10 + Math.random() * 10}%`, left: `${Math.random() * 20}%`, transform: 'rotate(251deg) translate(-50%, -50%)' }}>
                    <img src={pistachio} style={{ height: '70%', width: '70%', opacity: '0.7' }} />
                </div>
                <div style={{ zIndex: '-1', position: 'absolute', top: `${10 + Math.random() * 10}%`, left: `${20 + Math.random() * 20}%`, transform: 'rotate(419deg) translate(-50%, -50%)' }}>
                    <img src={walnut} style={{ height: '70%', width: '70%', opacity: '0.7' }} />
                </div>
                <div style={{ zIndex: '-1', position: 'absolute', top: `${20 + Math.random() * 10}%`, left: `${Math.random() * 20}%`, transform: 'rotate(101deg) translate(-50%, -50%)' }}>
                    <img src={almond} style={{ height: '70%', width: '70%', opacity: '0.7' }} />
                </div>
                <div style={{ zIndex: '-1', position: 'absolute', top: `${20 + Math.random() * 10}%`, left: `${20 + Math.random() * 20}%`, transform: 'rotate(221deg) translate(-50%, -50%)' }}>
                    <img src={pistachio} style={{ height: '70%', width: '70%', opacity: '0.7' }} />
                </div>
                <div style={{ zIndex: '-1', position: 'absolute', top: `${30 + Math.random() * 10}%`, left: `${Math.random() * 20}%`, transform: 'rotate(101deg) translate(-50%, -50%)' }}>
                    <img src={almond} style={{ height: '70%', width: '70%', opacity: '0.7' }} />
                </div>
                <div style={{ zIndex: '-1', position: 'absolute', top: `${30 + Math.random() * 10}%`, left: `${20 + Math.random() * 20}%`, transform: 'rotate(221deg) translate(-50%, -50%)' }}>
                    <img src={pistachio} style={{ height: '70%', width: '70%', opacity: '0.7' }} />
                </div>
                <div style={{ zIndex: '-1', position: 'absolute', top: `${40 + Math.random() * 10}%`, left: `${Math.random() * 20}%`, transform: 'rotate(419deg) translate(-50%, -50%)' }}>
                    <img src={walnut} style={{ height: '70%', width: '70%', opacity: '0.7' }} />
                </div>
            </div>
        )
    }
}