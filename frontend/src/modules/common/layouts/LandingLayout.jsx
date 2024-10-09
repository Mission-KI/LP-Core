import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function LandingLayout() {
    return (
        <>
            <div className='main-content-wrapper'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default LandingLayout