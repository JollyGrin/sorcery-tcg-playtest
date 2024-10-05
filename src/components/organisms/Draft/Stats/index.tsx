import { Box, Flex } from "styled-system/jsx";
import { DraftProps } from "../types";
import { CardDTO } from "@/utils/api/cardData/CardDataType";

function filterRarity(rarity: CardDTO["guardian"]["rarity"]) {
  return (card: CardDTO) => card.guardian.rarity === rarity;
}

export const DraftStats = (props: DraftProps) => {
  const flat = props.player.finishedPacks.flat();

  const exceptionals = flat.filter(filterRarity("Exceptional"));
  const elites = flat.filter(filterRarity("Elite"));
  const uniques = flat.filter(filterRarity("Unique"));

  const sites = flat.filter((card) => card.guardian.type === "Site");
  const avatars = flat.filter((card) => card.guardian.type === "Avatar");

  return (
    <Flex p="0 1.25rem" gap="2rem">
      <Box>
        <p>Exceptionals: {exceptionals.length.toString()}</p>
        <p>Elites: {elites.length.toString()}</p>
        <p>Uniques: {uniques.length.toString()}</p>
      </Box>
      <Box>
        <p>Total Cards: {flat.length.toString()}</p>
        <p>Sites: {sites.length.toString()}</p>
        <p>Avatars: {avatars.length.toString()}</p>
      </Box>
    </Flex>
  );
};
