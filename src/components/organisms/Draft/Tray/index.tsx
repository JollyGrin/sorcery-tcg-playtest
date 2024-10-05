import { Flex, HStack } from "styled-system/jsx";
import { DraftPlayerData } from "../types";

import { LuArrowBigRightDash as IconRight } from "react-icons/lu";
import { RiArrowGoBackLine as IconReturnArrow } from "react-icons/ri";
import { sortPlayersByJoin } from "../helpers";

export const DraftTray = (props: {
  players: Record<string, DraftPlayerData>;
}) => {
  const players = Object.entries(props.players).sort(sortPlayersByJoin);

  return (
    <HStack data-testid="stats" p="1rem">
      {players?.map(([key, value], index) => {
        return (
          <Flex alignItems="center" gap={1}>
            <Flex
              key={key}
              bg="lightblue"
              p="1rem"
              borderRadius="0.5rem"
              border="solid 2px rgba(0,200,250,0.5)"
            >
              <p>
                {key}:{value.joinedSessionTimestamp}
              </p>
            </Flex>
            {index !== players.length - 1 ? (
              <IconRight size="2rem" />
            ) : (
              <IconReturnArrow size="2rem" />
            )}
          </Flex>
        );
      })}
    </HStack>
  );
};
