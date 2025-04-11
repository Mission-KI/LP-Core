import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../../search/components/MainHeader/MainHeader";

function AppLayout() {
  return (
    <>
      <MainHeader />
      <div className="main-content-wrapper">
        <Outlet />
      </div>
    </>
  );
}

export default AppLayout;
