import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { NotificationProvider } from "../contexts/NotificationContext";
import { Notifications } from "./notification/Notifications";

export const Root = () => {
  return (
    <Box>
      <Navigation />
      <NotificationProvider>
        <Notifications />
        <Outlet />
      </NotificationProvider>
    </Box>
  );
};
