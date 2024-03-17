import React from "react";
import { Outlet } from "react-router-dom";
import { SiteContextProvider } from "../contexts/SiteContext";

export const Root = () => {
  return (
    <SiteContextProvider>
      <Outlet />
    </SiteContextProvider>
  );
};
