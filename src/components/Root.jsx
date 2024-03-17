import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { SiteContextProvider } from "../contexts/SiteContext";

export const Root = () => {
  return (
    <Box>
      <Navigation />
      <SiteContextProvider>
        <Outlet />
      </SiteContextProvider>
    </Box>
  );
};
