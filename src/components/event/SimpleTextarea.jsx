import { Textarea } from "@chakra-ui/react";
import { FormControlWithValidation } from "./FormControlWithValidation";

export const SimpleTextarea = ({ title, defaultValue, onChange }) => {
  const isError = !defaultValue;
  return (
    <FormControlWithValidation title={title} isError={isError}>
      <Textarea defaultValue={defaultValue} onChange={(e) => onChange(e)} />
    </FormControlWithValidation>
  );
};
