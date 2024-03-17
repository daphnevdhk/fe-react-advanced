import { Textarea } from "@chakra-ui/react";
import { FormControlWithValidation } from "./FormControlWithValidation";

export const SimpleTextarea = ({
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
      <Textarea defaultValue={defaultValue} {...formRegister} />
    </FormControlWithValidation>
  );
};
