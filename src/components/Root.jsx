import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { NotificationProvider } from "../contexts/NotificationContext";
import { Notifications } from "./notification/Notifications";
import { SiteContextProvider } from "../contexts/SiteContext";

export const Root = () => {
  return (
    <Box>
      <Navigation />
      <SiteContextProvider>
        <NotificationProvider>
          <Notifications />
          <Outlet />
        </NotificationProvider>
      </SiteContextProvider>
    </Box>
  );
};
