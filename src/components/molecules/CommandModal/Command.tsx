import { CommandCombobox } from "./ComandCombobox";
import { GameStateActions } from "@/components/organisms/GameBoard";
import {
  ActDrawDeckBottom,
  ActDrawDeckTop,
  ActionIds,
  ActionRollDice,
  ActRotateEnemyCards,
  ActScryX,
  ActToggleDisplayCards,
  ActUntapAll,
  ActViewCemetary,
} from "./Commands";
import { PlayerDataProps } from "@/types/card";

export const Command = (props: GameStateActions & PlayerDataProps) => {
  return (
    <div className="flex flex-col min-w-[800px] min-h-[500px]">
      <p className="text-[1.5rem] my-[0.5rem]">
        Command Box
      </p>
      <CommandCombobox>
        {({ action }) => {
          const id = action.value as ActionIds;

          if (id === "untap_all") return <ActUntapAll />;
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
          if (id === "toggle_display") return <ActToggleDisplayCards />;

          return <div>No action setup</div>;
        }}
      </CommandCombobox>
    </div>
  );
};
