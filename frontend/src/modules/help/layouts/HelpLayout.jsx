import { Outlet, useLocation } from 'react-router-dom';
import MainHeader from '../../search_engine/components/MainHeader/MainHeader';
import Breadcrumbs from '../../common/components/Breadcrumbs';
import TopicsSidebarNav from '../components/TopicsSidebarNav';

function HelpLayout() {
    const location = useLocation();
    const isHelpPage = location.pathname === "/help";

    return (
        <>
            <MainHeader />



            <div className="w-100">
                <div className="d-flex w-100">

                    {!isHelpPage && (
                        <aside style={{ minWidth: 300 }}>
                            <TopicsSidebarNav />
                        </aside>
                    )}
                    <div className="container px-5 content-scrollable" style={{ maxWidth: 1150 }}>
                        <Breadcrumbs />
                        <div className="d-flex mt-4">
                            <div className="flex-grow-1">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HelpLayout;
