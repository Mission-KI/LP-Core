import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

function AppLayout() {
    return (
        <>
            <Header />
            <div className='main-content-wrapper'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default AppLayout