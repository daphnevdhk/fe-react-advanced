import React from "react";
import { useReducer } from "react";

const NotificationContext = React.createContext();

function reducer(state, action) {
  console.log(action.type, action);
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        notifications: [
          ...state.notifications,
          { id: state.notifications.length + 1, message: action.payload },
        ],
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    default:
      throw new Error();
  }
}

function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { notifications: [] });

  const addNotification = (notification) => {
    console.log("addNotification", notification);
    dispatch({ type: "ADD_NOTIFICATION", payload: notification });
  };

  const removeNotification = (id) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications: state.notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export { NotificationProvider };
export default NotificationContext;
