import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  UiChecksGrid,
  People,
  List,
  Gear,
  Speedometer,
  FileEarmarkPdf,
  FilePdf,
  Box2Heart,
  Person,
  QuestionCircle,
  InfoSquare,
} from "react-bootstrap-icons";

function Sidebar() {
  const [sidebarActive] = useState(true);
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 855) {
        const sidebar = document.getElementById("sidebar");
        if (!sidebar.classList.contains("active")) {
          sidebar.classList.toggle("active");
        }
        document.documentElement.style.setProperty("--sidebar-width", "0");
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const toggleModal = () => {
  //   const sidebar = document.getElementById("sidebar");
  //   sidebar.classList.toggle("active");
  //   if (sidebar.classList.contains("active")) {
  //     document.documentElement.style.setProperty("--sidebar-width", "0");
  //   } else {
  //     document.documentElement.style.setProperty("--sidebar-width", "236px");
  //   }
  // };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
      document.documentElement.style.setProperty("--sidebar-width", "0");
    } else {
      document.documentElement.style.setProperty("--sidebar-width", "236px");
    }
  };

  return (
    <>
      <nav id="sidebar" className={!sidebarActive ? "active" : ""}>
        <ul className="list-unstyled">
          <div className="sidebar-link-group">
            <div className="d-flex justify-content-between align-items-center">
              <span
                className={`d-flex justify-content-end align-items-center rounded`}
              >
                <div
                  className="w-fit pointer rounded-lg"
                  onClick={toggleSidebar}
                >
                  <List className="h5 mb-0" />
                </div>
              </span>
            </div>
          </div>

          <div className="sidebar-link-group">
            <li
              className={`nav-item px-2 rounded my-1 ${currentPage === "/monitoring/dashboard" ? "active" : ""}`}
            >
              <Link
                to="/monitoring/dashboard"
                className="nav-link"
                onClick={() => handlePageChange("/monitoring/dashboard")}
              >
                <UiChecksGrid />
                <span className="ps-3 medium">Dashboard</span>
              </Link>
            </li>
            <li
              className={`nav-item px-2 rounded my-1 ${currentPage === "/monitoring/logs" ? "active" : ""}`}
            >
              <Link
                to="/monitoring/logs"
                className="nav-link"
                onClick={() => handlePageChange("/monitoring/logs")}
              >
                <InfoSquare />
                <span className="ps-3 medium">Logs</span>
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
