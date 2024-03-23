import {
  Tag,
  Stack,
  HStack,
  Box,
  Input,
  Flex,
  TagCloseButton,
  Select,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useSiteContext } from "../../hooks/use-Site-Context";

export const SearchAndFilter = ({
  activeCategoryIds,
  onTagSelectionChange,
  onSearchChange,
}) => {
  const { categories } = useSiteContext();

  const onCategorySelectChange = (e) => {
    const value = Number(e.target.value);
    if (value !== -1) {
      onTagSelectionChange(value, true);
    }
  };

  const renderedSelectedCategories = categories
    .filter((c) => activeCategoryIds.some((a) => a == c.id))
    .map((c) => (
      <Tag key={c.id} mx={1} size={"lg"}>
        {c.name}
        <TagCloseButton onClick={() => onTagSelectionChange(c.id, false)} />
      </Tag>
    ));

  const renderedCategoryOptions = categories
    .filter((c) => !activeCategoryIds.some((a) => a == c.id))
    .map((c, index) => (
      <option key={index + 1} value={c.id}>
        {c.name}
      </option>
    ));

  console.log(categories);

  return (
    <Stack>
      <HStack>
        {renderedCategoryOptions.length > 0 && (
          <Box w="20%">
            <Select
              placeholder="Filter on Category"
              value={-100}
              defaultValue={-100}
              onChange={(event) => onCategorySelectChange(event)}
            >
              {renderedCategoryOptions}
            </Select>
          </Box>
        )}
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color={useColorModeValue("teal", "gray.300")} />
          </InputLeftElement>
          <Input type="text" onChange={(e) => onSearchChange(e.target.value)} />
        </InputGroup>
      </HStack>
      <Flex>{renderedSelectedCategories}</Flex>
    </Stack>
  );
};
