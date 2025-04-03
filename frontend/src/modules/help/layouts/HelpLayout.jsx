import { Outlet } from 'react-router-dom'
import MainHeader from '../../search_engine/components/MainHeader/MainHeader'
import Breadcrumbs from '../../common/components/Breadcrumbs'

function HelpLayout() {
    return (
        <>
            <MainHeader />
            <div className='main-content-wrapper'>
                <div className='container' style={{ maxWidth: 1150 }}>
                    <Breadcrumbs />
                    <div className='mt-4'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HelpLayout