import {
  Box,
  CheckboxGroup,
  Checkbox,
  Stack,
  Button,
  Select,
} from "@chakra-ui/react";
import {
  SET_CREATEDBY,
  SET_TITLE,
  SET_DESCRIPTION,
  SET_IMAGE,
  SET_CATEGORYIDS,
  SET_LOCATION,
  SET_STARTTIME,
  SET_ENDTIME,
  eventReducer,
} from "../../reducers/eventReducer";
import { useReducer, useEffect, useState } from "react";
import { getUsers } from "../../api/userApi";
import { getCategories } from "../../api/categoryApi";
import { SimpleInput } from "./SimpleInput";
import { SimpleTextarea } from "./SimpleTextarea";
import { SimpleDatePicker } from "./SimpleDatePicker";
import { FormControlWithValidation } from "./FormControlWithValidation";

export const EventForm = ({ event, onSave }) => {
  const [state, dispatch] = useReducer(eventReducer, event);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchUsers();
  }, []);

  const fetchCategories = async () => {
    const response = await getCategories();
    setCategories(response);
  };

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response);
  };

  const handleChange = (e, type) => {
    dispatch({ type: type, payload: e.target.value });
  };

  const handleCategoryChange = (selectedCategories) => {
    dispatch({
      type: SET_CATEGORYIDS,
      //checkbox group does not work well with numbers so we converted those to strings. Now we need the int value
      payload: selectedCategories.map((c) => Number(c)),
    });
  };

  const handleUserChange = (e) => {
    dispatch({
      type: SET_CREATEDBY,
      //checkbox group does not work well with numbers so we converted those to strings. Now we need the int value
      payload: Number(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(state);
  };

  //checkbox group does not work well with numbers
  const checkBoxValuesBug = state.categoryIds
    ? state.categoryIds.map((id) => `${id}`)
    : [];
  const categoriesIsError =
    state.categoryIds && state.categoryIds.length > 0 ? false : true;

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
    state.createdBy && users.find((u) => u.id == state.createdBy);

  let selectedUserOption;
  let selectedUserIsError;

  if (selectedUser) {
    selectedUserIsError = false;
    selectedUserOption = (
      <option value={selectedUser.id}>{selectedUser.name}</option>
    );
  } else {
    selectedUserIsError = true;
    const option = <option key="-1" value="-1"></option>;
    selectedUserOption = option;
    userOptions = [option, ...userOptions];
  }

  return (
    <Box as="form">
      <SimpleInput
        title="Title"
        defaultValue={state.title}
        onChange={(e) => handleChange(e, SET_TITLE)}
      />

      <SimpleTextarea
        title="Description"
        defaultValue={state.description}
        onChange={(e) => handleChange(e, SET_DESCRIPTION)}
      />

      <SimpleInput
        title="Image URL"
        defaultValue={state.image}
        onChange={(e) => handleChange(e, SET_IMAGE)}
      />

      <SimpleInput
        title="Location"
        defaultValue={state.location}
        onChange={(e) => handleChange(e, SET_LOCATION)}
      />

      <SimpleDatePicker
        title="Start Time"
        defaultValue={state.startTime}
        onChange={(e) => handleChange(e, SET_STARTTIME)}
      />

      <SimpleDatePicker
        title="End Time"
        defaultValue={state.endTime}
        onChange={(e) => handleChange(e, SET_ENDTIME)}
      />

      <FormControlWithValidation title="Category" isError={categoriesIsError}>
        <CheckboxGroup
          defaultValue={checkBoxValuesBug}
          onChange={(e) => handleCategoryChange(e)}
        >
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            {categoryCheckboxes}
          </Stack>
        </CheckboxGroup>
      </FormControlWithValidation>

      <FormControlWithValidation
        title="Organizer"
        isError={selectedUserIsError}
      >
        <Select
          defaultValue={selectedUserOption}
          onChange={(e) => handleUserChange(e)}
        >
          {userOptions}
        </Select>
      </FormControlWithValidation>

      <Button mt={4} colorScheme="teal" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};
