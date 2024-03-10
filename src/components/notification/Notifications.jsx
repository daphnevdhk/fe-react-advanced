import { Alert, AlertIcon, Stack, CloseButton } from "@chakra-ui/react";
import { useNotificationContext } from "../../hooks/use-notification-context";

export const Notifications = () => {
  const { notifications, removeNotification } = useNotificationContext();

  console.log(notifications);

  const renderedAlers = notifications.map((n) => (
    <Alert key={n.id} status={alert.status}>
      <AlertIcon />
      {n.message}
      <CloseButton onClick={() => removeNotification(n.id)} />
    </Alert>
  ));

  return <Stack spacing={3}>{renderedAlers}</Stack>;
};
