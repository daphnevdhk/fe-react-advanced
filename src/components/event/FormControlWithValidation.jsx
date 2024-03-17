import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

export const FormControlWithValidation = ({
  title,
  isError,
  errorMessage,
  children,
}) => {
  return (
    <FormControl id={title.toLowerCase()} isInvalid={isError}>
      <FormLabel>{title}</FormLabel>
      {children}
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
