import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header/Header'

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