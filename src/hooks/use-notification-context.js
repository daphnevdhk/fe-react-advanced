import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
