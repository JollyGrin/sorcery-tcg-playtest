import { Box, Flex, HStack } from "styled-system/jsx";
import { DraftProps } from "@/components/organisms/Draft/types";
import { CardDTO } from "@/utils/api/cardData/CardDataType";

function filterRarity(rarity: CardDTO["guardian"]["rarity"]) {
  return (card: CardDTO) => card?.guardian?.rarity === rarity;
}

export const CrackStats = (props: DraftProps) => {
  if (props.player.finishedPacks.length === 0) return <div />;
  const flat = props.player.finishedPacks.flat();

  const exceptionals = flat.filter(filterRarity("Exceptional"));
  const elites = flat.filter(filterRarity("Elite"));
  const uniques = flat.filter(filterRarity("Unique"));

  const sites = flat.filter((card) => card?.guardian?.type === "Site");
  const avatars = flat.filter((card) => card?.guardian?.type === "Avatar");

  return (
    <HStack justifyContent="space-between">
      <Flex p="0 1.25rem" gap="2rem" fontSize={{ base: "0.85rem", md: "1rem" }}>
        <Flex
          alignItems="start"
          direction={{ base: "row", md: "column" }}
          gap={{ base: 2, md: 0 }}
        >
          <p>Exceptionals: {exceptionals.length.toString()}</p>
          <p>Elites: {elites.length.toString()}</p>
          <p>Uniques: {uniques.length.toString()}</p>
        </Flex>
        <Flex
          alignItems="start"
          direction={{ base: "row", md: "column" }}
          gap={{ base: 2, md: 0 }}
        >
          <p>Total Cards: {flat.length.toString()}</p>
          <p>Sites: {sites.length.toString()}</p>
          <p>Avatars: {avatars.length.toString()}</p>
        </Flex>
      </Flex>
      <Box display={{ base: "none", lg: "block" }} p="1rem" mx="1rem" bg="plum">
        <p>Online draft currently in development!</p>
      </Box>
    </HStack>
  );
};
