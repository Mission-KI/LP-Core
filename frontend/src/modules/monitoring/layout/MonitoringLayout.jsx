import Header from "./Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function MonitoringLayout() {
  return (
    <div className="monitoring-page-content-wrapper">
      <Sidebar />
      <div className="monitoring-content-wrapper">
        <Header />
        <div className="container px-5 pb-5 mb-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MonitoringLayout;
