import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

function LandingLayout() {
    return (
        <>
            <div>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default LandingLayout