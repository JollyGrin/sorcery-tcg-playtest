import { Box, Flex } from "styled-system/jsx";
import { CommandCombobox } from "./ComandCombobox";
import { css } from "styled-system/css";
import { GameStateActions } from "@/components/organisms/GameBoard";
import {
  ActDrawDeckBottom,
  ActDrawDeckTop,
  ActionIds,
  ActionRollDice,
  ActRotateEnemyCards,
  ActScryX,
  ActViewCemetary,
} from "./Commands";
import { PlayerDataProps } from "@/types/card";

export const Command = (props: GameStateActions & PlayerDataProps) => {
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

          if (id === "dice") return <ActionRollDice {...props} />;
          if (id === "spawn_token")
            return "To spawn a token, right click empty space on a grid";
          if (id === "draw_deck_top") return <ActDrawDeckTop {...props} />;
          if (id === "draw_deck_bottom")
            return <ActDrawDeckBottom {...props} />;
          if (id === "scry_x") return <ActScryX {...props} deckType="deck" />;
          if (id === "scry_x_atlas")
            return <ActScryX {...props} deckType="atlas" />;
          if (id === "view_cemetary") return <ActViewCemetary />;
          if (id === "rotate_enemy") return <ActRotateEnemyCards />;

          return <Box>No action setup</Box>;
        }}
      </CommandCombobox>
    </Flex>
  );
};
