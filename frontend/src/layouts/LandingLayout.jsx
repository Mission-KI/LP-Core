import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import logo from '../assets/img/brand/logo.webp';

function LandingLayout() {
    return (
        <>
            <div className='main-content-wrapper'>
                <div className="container pb-4" style={{ maxWidth: 1000 }}>
                    <div className='d-flex flex-column mb-5'>
                        <img src={logo} alt="" style={{ maxWidth: 150 }} />
                        <span className='text-muted ps-1 pt-1'>Dataset Search Engine</span>
                    </div>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LandingLayout