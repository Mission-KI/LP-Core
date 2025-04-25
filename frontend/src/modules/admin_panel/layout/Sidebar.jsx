import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UiChecksGrid, InfoSquare, LayoutSidebar } from "react-bootstrap-icons";

function Sidebar() {
  const [sidebarActive, setSidebarActive] = useState(true);
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 855) {
        setSidebarActive(false);
        document.documentElement.style.setProperty("--sidebar-width", "0");
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      sidebarActive ? "236px" : "0",
    );
  }, [sidebarActive]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleSidebar = () => {
    setSidebarActive((prev) => !prev);
  };

  return (
    <>
      <nav id="sidebar" className={!sidebarActive ? "active" : ""}>
        <ul className="list-unstyled">
          <div className="sidebar-link-group"></div>

          <div className="sidebar-link-group mt-5">
            <li
              className={`nav-item px-2 rounded my-1 ${currentPage === "/admin/dashboard" ? "active" : ""}`}
            >
              <Link
                to="/admin/dashboard"
                className="nav-link"
                onClick={() => handlePageChange("/admin/dashboard")}
              >
                <UiChecksGrid />
                <span className="ps-3 medium">Dashboard</span>
              </Link>
            </li>
            <li
              className={`nav-item px-2 rounded my-1 ${currentPage === "/admin/logs" ? "active" : ""}`}
            >
              <Link
                to="/admin/logs"
                className="nav-link"
                onClick={() => handlePageChange("/admin/logs")}
              >
                <InfoSquare />
                <span className="ps-3 medium">Logs</span>
              </Link>
            </li>
          </div>
        </ul>
      </nav>
      <button
        onClick={toggleSidebar}
        id="sidebar-toggle-btn"
        style={{ top: "2rem", left: "1rem" }}
        className={`btn btn-basic rounded position-fixed ${!sidebarActive ? "shadow" : ""}`}
      >
        <LayoutSidebar className="h5 mb-0" />
      </button>
    </>
  );
}

export default Sidebar;
