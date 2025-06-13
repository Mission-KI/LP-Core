import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UiChecksGrid, InfoSquare, LayoutSidebar } from "react-bootstrap-icons";

function Sidebar() {
  const [sidebarActive, setSidebarActive] = useState(true);
  const { pathname, search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const publisher = queryParams.get("publisher");
  const dataspace = queryParams.get("dataspace");

  const filteredParams = new URLSearchParams();
  if (publisher) filteredParams.set("publisher", publisher);
  if (dataspace) filteredParams.set("dataspace", dataspace);
  const filteredQuery = filteredParams.toString();
  const querySuffix = filteredQuery ? `?${filteredQuery}` : "";

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
              className={`nav-item px-2 rounded my-1 ${
                pathname === "/admin/dashboard" ? "active" : ""
              }`}
            >
              <Link to={`/admin/dashboard${querySuffix}`} className="nav-link">
                <UiChecksGrid />
                <span className="ps-3 medium">Dashboard</span>
              </Link>
            </li>
            <li
              className={`nav-item px-2 rounded my-1 ${
                pathname === "/admin/logs" ? "active" : ""
              }`}
            >
              <Link to={`/admin/logs${querySuffix}`} className="nav-link">
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
        className={`btn btn-basic rounded position-fixed ${
          !sidebarActive ? "shadow" : ""
        }`}
      >
        <LayoutSidebar className="h5 mb-0" />
      </button>
    </>
  );
}

export default Sidebar;
