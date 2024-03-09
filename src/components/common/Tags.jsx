import { Tag, Stack, Flex } from "@chakra-ui/react";
import { userStringToColor } from "../../hooks/useStringToColor";

export const Tags = ({ tags }) => {
  const renderedTags = tags.map((s, index) => (
    <Tag key={index} backgroundColor={userStringToColor(s)} mx={1}>
      {s}
    </Tag>
  ));

  return (
    <Stack>
      <Flex>{renderedTags}</Flex>
    </Stack>
  );
};
