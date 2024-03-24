import { Box, CheckboxGroup, Checkbox, Stack, Select } from "@chakra-ui/react";
import { SimpleInput } from "./SimpleInput";
import { SimpleTextarea } from "./SimpleTextarea";
import { SimpleDatePicker } from "./SimpleDatePicker";
import { FormControlWithValidation } from "./FormControlWithValidation";
import { useForm, Controller } from "react-hook-form";
import { useSiteContext } from "../../hooks/use-Site-Context";
import { Button } from "../common/Button";

export const EventForm = ({ event, onSave }) => {
  const { categories, users } = useSiteContext();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  //checkbox group does not work well with numbers
  const checkBoxValuesBug = event.categoryIds
    ? event.categoryIds.map((id) => `${id}`)
    : [];

  const categoryCheckboxes = categories.map((c) => (
    //checkbox group does not work well with numbers so convert id to string
    <Checkbox key={c.id} value={`${c.id}`}>
      {c.name}
    </Checkbox>
  ));

  let userOptions = users.map((u) => (
    <option key={u.id} value={u.id}>
      {u.name}
    </option>
  ));

  const selectedUser =
    event.createdBy && users.find((u) => u.id == event.createdBy);

  if (!selectedUser) {
    const option = <option key="-1" value=""></option>;
    userOptions = [option, ...userOptions];
  }

  function onSubmit(values) {
    onSave({
      title: values.title,
      description: values.description,
      image: values.image,
      location: values.location,
      categoryIds: values.categoryIds.map((c) => Number(c)),
      startTime: values.startTime,
      endTime: values.endTime,
      createdBy: Number(values.createdBy),
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <SimpleInput
          title="Title"
          defaultValue={event.title}
          formRegister={{
            ...register("title", {
              required: "Title is required",
            }),
          }}
          error={errors.title}
        />

        <SimpleTextarea
          title="Description"
          defaultValue={event.description}
          formRegister={{
            ...register("description", {
              required: "Description is required",
            }),
          }}
          error={errors.description}
        />

        <SimpleInput
          title="Image URL"
          defaultValue={event.image}
          formRegister={{
            ...register("image", {
              required: "Image is required",
            }),
          }}
          error={errors.image}
        />

        <SimpleInput
          title="Location"
          defaultValue={event.location}
          formRegister={{
            ...register("location", {
              required: "Location is required",
            }),
          }}
          error={errors.location}
        />

        <SimpleDatePicker
          title="Start Time"
          defaultValue={event.startTime}
          formRegister={{
            ...register("startTime", {
              required: "StartTime is required",
            }),
          }}
          error={errors.startTime}
        />

        <SimpleDatePicker
          title="End Time"
          defaultValue={event.endTime}
          formRegister={{
            ...register("endTime", {
              required: "EndTime is required",
            }),
          }}
          error={errors.endTime}
        />

        <Controller
          name="categoryIds"
          control={control}
          defaultValue={checkBoxValuesBug}
          rules={{ required: true }}
          render={({ field, fieldState }) => {
            return (
              <FormControlWithValidation
                title="Category"
                isError={fieldState.invalid}
              >
                <CheckboxGroup {...field} defaultValue={checkBoxValuesBug}>
                  <Stack spacing={[1, 5]} direction={["column", "row"]}>
                    {categoryCheckboxes}
                  </Stack>
                </CheckboxGroup>
              </FormControlWithValidation>
            );
          }}
        />

        <Controller
          name="createdBy"
          control={control}
          defaultValue={`${event.createdBy || ""}`}
          rules={{ required: true }}
          render={({ field, fieldState }) => {
            return (
              <FormControlWithValidation
                title="Organizer"
                isError={fieldState.invalid}
                errorMessage={fieldState.invalid && "Please select one"}
              >
                <Select
                  onChange={field.onChange}
                  defaultValue={`${event.createdBy || ""}`}
                >
                  {userOptions}
                </Select>
              </FormControlWithValidation>
            );
          }}
        />

        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
          isLoading={isSubmitting}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};
