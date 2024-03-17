import { Input } from "@chakra-ui/react";
import { FormControlWithValidation } from "./FormControlWithValidation";

export const SimpleInput = ({ title, defaultValue, formRegister, error }) => {
  return (
    <FormControlWithValidation
      title={title}
      isError={error}
      errorMessage={error && error.message}
    >
      <Input defaultValue={defaultValue} {...formRegister} />
    </FormControlWithValidation>
  );
};
