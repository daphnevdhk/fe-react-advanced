import { useEffect, useState } from "react";
import { getCategories } from "../../api/categoryApi";
import {
  Tag,
  Stack,
  HStack,
  Box,
  Input,
  Flex,
  TagCloseButton,
  Select,
} from "@chakra-ui/react";

export const SearchAndFilter = ({
  activeCategoryIds,
  onTagSelectionChange,
  onSearchChange,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await getCategories();
    setCategories(response);
  };

  const onCategorySelectChange = (e) => {
    const value = Number(e.target.value);
    if (value !== -1) {
      onTagSelectionChange(value, true);
    }
  };

  const renderedSelectedCatogories = categories
    .filter((c) => activeCategoryIds.some((a) => a == c.id))
    .map((c) => (
      <Tag key={c.id} mx={1} size={"lg"}>
        {c.name}
        <TagCloseButton onClick={() => onTagSelectionChange(c.id, false)} />
      </Tag>
    ));

  const renderedCatogoryOptions = categories
    .filter((c) => !activeCategoryIds.some((a) => a == c.id))
    .map((c) => (
      <option key={c.id} value={c.id}>
        {c.name}
      </option>
    ));

  return (
    <>
      <Stack>
        <HStack>
          <Box>
            <Input
              type="text"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </Box>
          <Box>
            <Select onChange={(event) => onCategorySelectChange(event)}>
              <option value="-1"></option>
              {renderedCatogoryOptions}
            </Select>
          </Box>
        </HStack>
        <Flex>{renderedSelectedCatogories}</Flex>
      </Stack>
    </>
  );
};
