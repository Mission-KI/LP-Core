import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainHeader from "../../search/components/MainHeader/MainHeader";
import Breadcrumbs from "../../common/components/Breadcrumbs";
import TopicsSidebarNav from "../components/TopicsSidebarNav";

function HelpLayout() {
  const location = useLocation();
  const isHelpPage = location.pathname === "/help";

  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;

    const id = hash.replace("#", "");

    setTimeout(() => {
      const element = document.getElementById(id);
      const container = document.querySelector(".content-scrollable");

      if (element && container) {
        const topOffset = element.offsetTop - container.offsetTop - 20;

        container.scrollTo({
          top: topOffset,
          behavior: "smooth",
        });
      }
    }, 50);
  }, [location.hash]);

  return (
    <>
      <MainHeader />

      <div className="w-100">
        <div className="d-flex w-100">
          {!isHelpPage && (
            <aside style={{ minWidth: 300 }} className="d-none d-md-block">
              <TopicsSidebarNav />
            </aside>
          )}
          <div
            className="container px-5 content-scrollable"
            style={{ maxWidth: 1150 }}
          >
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
