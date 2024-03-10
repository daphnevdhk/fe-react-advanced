import { Input } from "@chakra-ui/react";
import { FormControlWithValidation } from "./FormControlWithValidation";

export const SimpleDatePicker = ({ title, defaultValue, onChange }) => {
  const isError = !defaultValue;
  return (
    <FormControlWithValidation title={title} isError={isError}>
      <Input
        type="datetime-local"
        defaultValue={defaultValue}
        onChange={(e) => onChange(e)}
      />
    </FormControlWithValidation>
  );
};
