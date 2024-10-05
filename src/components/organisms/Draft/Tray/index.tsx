import { Flex, HStack } from "styled-system/jsx";
import { DraftPlayerData } from "../types";

import { LuArrowBigRightDash as IconRight } from "react-icons/lu";
import { RiArrowGoBackLine as IconReturnArrow } from "react-icons/ri";
import { sortPlayersByJoin } from "../helpers";
import { useRouter } from "next/router";

export const DraftTray = (props: {
  players: Record<string, DraftPlayerData>;
}) => {
  const { query, push } = useRouter();
  const players = Object.entries(props.players).sort(sortPlayersByJoin);

  function changePlayer(name: string) {
    const { name: nameQuery, ...restQuery } = query;
    push({
      query: {
        ...restQuery,
        name,
      },
    });
  }

  return (
    <HStack data-testid="stats" p="1rem">
      {players?.map(([key, value], index) => {
        return (
          <Flex alignItems="center" gap={1}>
            <Flex
              key={key}
              direction="column"
              bg="lightblue"
              p="1rem"
              borderRadius="0.5rem"
              border="solid 2px"
              onClick={() => changePlayer(key)}
              style={{
                borderColor:
                  query.name === key ? "gold" : "rgba(0,200,250,0.5)",
              }}
            >
              <p>{key}</p>
              <p>{getStatus(value)}</p>
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

function getStatus(props: DraftPlayerData) {
  const activeIsEmpty = props.activePack.length === 0;
  const pendingIsEmpty = props.pendingPacks.length === 0;
  const isSelecting = props.selectedIndex !== undefined;

  if (activeIsEmpty) return "waiting";
  if (!activeIsEmpty && !isSelecting) return "thinking";
  if (!activeIsEmpty && isSelecting) return "selecting";
}
