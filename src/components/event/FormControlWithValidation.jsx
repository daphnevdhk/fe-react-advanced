import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

export const FormControlWithValidation = ({ title, isError, children }) => {
  return (
    <FormControl id={title.toLowerCase()} isInvalid={isError}>
      <FormLabel>{title}</FormLabel>
      {children}
      <FormErrorMessage>{`${title} is required.`}</FormErrorMessage>
    </FormControl>
  );
};
