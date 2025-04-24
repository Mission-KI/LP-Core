import { Outlet } from "react-router-dom";

function LandingLayout() {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default LandingLayout;
