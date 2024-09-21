import { Box, Flex } from "styled-system/jsx";
import { CommandCombobox } from "./ComandCombobox";
import { css } from "styled-system/css";
import { GameStateActions } from "@/components/organisms/GameBoard";
import {
  ActDrawDeckBottom,
  ActDrawDeckTop,
  ActionIds,
  ActScryX,
} from "./Commands";

export const Command = (props: GameStateActions) => {
  return (
    <Flex direction="column" minW="800px" minH="500px">
      <p
        className={css({
          fontSize: "1.5rem",
          my: "0.5rem",
        })}
      >
        Command Box
      </p>
      <CommandCombobox>
        {({ action }) => {
          const id = action.value as ActionIds;

          if (id === "draw_deck_top") return <ActDrawDeckTop {...props} />;
          if (id === "draw_deck_bottom")
            return <ActDrawDeckBottom {...props} />;
          if (id === "scry_x") return <ActScryX {...props} />;

          return <Box>No action setup</Box>;
        }}
      </CommandCombobox>
    </Flex>
  );
};
