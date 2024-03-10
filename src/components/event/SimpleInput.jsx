import { Input } from "@chakra-ui/react";
import { FormControlWithValidation } from "./FormControlWithValidation";

export const SimpleInput = ({ title, defaultValue, onChange }) => {
  const isError = !defaultValue;
  return (
    <FormControlWithValidation title={title} isError={isError}>
      <Input defaultValue={defaultValue} onChange={(e) => onChange(e)} />
    </FormControlWithValidation>
  );
};
