import { Input } from "@chakra-ui/react";
import { FormControlWithValidation } from "./FormControlWithValidation";

export const SimpleDatePicker = ({
  title,
  defaultValue,
  formRegister,
  error,
}) => {
  return (
    <FormControlWithValidation
      title={title}
      isError={error}
      errorMessage={error && error.message}
    >
      <Input
        type="datetime-local"
        defaultValue={defaultValue}
        {...formRegister}
      />
    </FormControlWithValidation>
  );
};
