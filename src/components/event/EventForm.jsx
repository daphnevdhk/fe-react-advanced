import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
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

export const EventForm = ({ event }) => {
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

  //checkbox group does not work well with numbers
  const checkBoxValuesBug = state.categoryIds
    ? state.categoryIds.map((id) => `${id}`)
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
    state.createdBy && users.find((u) => u.id == state.createdBy);

  let selectedUserOption;

  if (selectedUser) {
    selectedUserOption = (
      <option value={selectedUser.id}>{selectedUser.name}</option>
    );
  } else {
    const option = <option value="-1"></option>;
    selectedUserOption = option;
    userOptions = [option, ...userOptions];
  }

  return (
    <Box as="form">
      <FormControl id="title">
        <FormLabel>Title</FormLabel>
        <Input
          defaultValue={state.title}
          onChange={(e) => handleChange(e, SET_TITLE)}
        />
      </FormControl>

      <FormControl id="description">
        <FormLabel>Description</FormLabel>
        <Textarea
          defaultValue={state.description}
          onChange={(e) => handleChange(e, SET_DESCRIPTION)}
        />
      </FormControl>

      <FormControl id="image">
        <FormLabel>Image URL</FormLabel>
        <Input
          defaultValue={state.image}
          onChange={(e) => handleChange(e, SET_IMAGE)}
        />
      </FormControl>

      <FormControl id="location">
        <FormLabel>Location</FormLabel>
        <Input
          defaultValue={state.location}
          onChange={(e) => handleChange(e, SET_LOCATION)}
        />
      </FormControl>

      <FormControl id="startTime">
        <FormLabel>Start Time</FormLabel>
        <Input
          type="datetime-local"
          defaultValue={state.startTime}
          onChange={(e) => handleChange(e, SET_STARTTIME)}
        />
      </FormControl>

      <FormControl id="endTime">
        <FormLabel>End Time</FormLabel>
        <Input
          type="datetime-local"
          defaultValue={state.endTime}
          onChange={(e) => handleChange(e, SET_ENDTIME)}
        />
      </FormControl>

      <FormControl id="categoryIds">
        <FormLabel>Categories</FormLabel>
        <CheckboxGroup
          defaultValue={checkBoxValuesBug}
          onChange={(e) => handleCategoryChange(e)}
        >
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            {categoryCheckboxes}
          </Stack>
        </CheckboxGroup>
      </FormControl>

      <FormControl id="createdBy">
        <FormLabel>Organizer</FormLabel>
        <Select
          defaultValue={selectedUserOption}
          onChange={(e) => handleChange(e, SET_CREATEDBY)}
        >
          {userOptions}
        </Select>
      </FormControl>

      <Button mt={4} colorScheme="teal" type="submit">
        Submit
      </Button>
    </Box>
  );
};
