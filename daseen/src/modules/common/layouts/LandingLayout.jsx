import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function LandingLayout() {
    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default LandingLayout