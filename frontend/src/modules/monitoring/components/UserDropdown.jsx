import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import {
  ArrowCounterclockwise,
  BoxArrowRight,
  Folder,
  PersonCircle,
  Search,
  UiChecksGrid,
} from "react-bootstrap-icons";
import placeholderProfileImage from "../../common/assets/img/vectors/profile.svg";
import { useAuth } from "../../common/contexts/AuthContext";

function UserDropdown() {
  const { username } = useAuth();

  return (
    <Dropdown className="d-flex align-items-center">
      <Dropdown.Toggle
        variant="light"
        id="dropdown-basic"
        className="p-0 border-0 bg-transparent"
      >
        <img
          src={placeholderProfileImage}
          className="rounded-circle border pointer"
          style={{ width: 26, height: 26, objectFit: "cover" }}
          alt="Profile"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu
        className="border-0 shadow rounded-lg mt-2 px-2"
        align="end"
        style={{ width: 290, background: "var(--color-body-background)" }}
      >
        <div className="d-flex align-items-center pt-1 px-2">
          <div className="position-relative">
            <img
              src={placeholderProfileImage}
              className="rounded-circle"
              style={{ width: 30, height: 30, objectFit: "cover" }}
              alt=""
            />
          </div>
          <div className="d-flex flex-column ps-3">
            <span className="small txt-lighter">{username}</span>
          </div>
        </div>

        <Dropdown.Divider />

        <Dropdown.Item className="rounded" as={Link} to="/">
          <Search /> <span className="ps-3 medium">Search</span>
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item
          className="rounded text-danger"
          as={Link}
          to="/auth/logout"
        >
          <BoxArrowRight className="text-danger" />{" "}
          <span className="ps-3 medium text-danger">Logout</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;
