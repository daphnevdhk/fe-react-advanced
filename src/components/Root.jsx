import React from "react";
import { Outlet } from "react-router-dom";
import { SiteContextProvider } from "../contexts/SiteContext";
import { NavBar } from "./NavBar";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <SiteContextProvider>
      <NavBar />
      <Box padding="4">
        <Outlet />
      </Box>
    </SiteContextProvider>
  );
};
