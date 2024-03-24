import { useToast } from "@chakra-ui/react";

export const useNotification = () => {
  const toast = useToast();
  const showToast = (title, description, status) =>
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });

  const showSuccess = (title, description) =>
    showToast(title, description, "success");

  const showError = (title, description) =>
    showToast(title, description, "error");

  return { showError, showSuccess };
};
