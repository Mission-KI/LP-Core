import React from 'react'
import { Outlet } from 'react-router-dom'
import MainHeader from '../../search_engine/components/MainHeader/MainHeader'
import Footer from '../components/Footer/Footer'

function AppLayout() {
    return (
        <>
            <MainHeader />
            <div className='main-content-wrapper'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default AppLayout