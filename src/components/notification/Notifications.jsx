import { useNotificationContext } from "../../hooks/use-notification-context";

export const Notifications = () => {
  const { notifications } = useNotificationContext();

  console.log(notifications);

  return (
    <ul>
      {notifications.map((notification, index) => (
        <li key={index}>{notification.message}</li>
      ))}
    </ul>
  );
};
