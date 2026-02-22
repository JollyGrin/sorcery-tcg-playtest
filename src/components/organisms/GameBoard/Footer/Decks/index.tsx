import {
  GRIDS,
  LAYOUT_HEIGHTS,
} from "@/components/organisms/GameBoard/constants";
import { GameStateActions } from "@/components/organisms/GameBoard";
import { actDrawAtlas, actDrawDeck, actShuffleDeck } from "@/utils/actions";
import { Modal } from "@/components/atoms/Modal";
import { useState } from "react";
import { DeckModalBody } from "./DeckPreviewModal";
import toast from "react-hot-toast";

export const DecksTray = (props: GameStateActions) => {
  const [preview, setPreview] = useState<"deck" | "atlas">();

  function draw(deck: GRIDS.DECK | GRIDS.ATLAS_DECK) {
    deck === GRIDS.DECK
      ? props.setGridItems(actDrawDeck(props.gridItems))
      : props.setGridItems(actDrawAtlas(props.gridItems));
  }

  function drawDeck() {
    draw(GRIDS.DECK);
  }
  function drawAtlas() {
    draw(GRIDS.ATLAS_DECK);
  }

  function shuffleDeck(deckType: typeof preview) {
    if (deckType) props.setGridItems(actShuffleDeck(props.gridItems, deckType));
    toast.success("Shuffled after closing");
  }

  const atlasRemainingCards = props.gridItems[GRIDS.ATLAS_DECK]?.length;
  const deckRemainingCards = props.gridItems[GRIDS.DECK]?.length;

  return (
    <>
      <Modal
        wrapperProps={{
          open: !!preview,
          onOpenChange: () => {
            // when closing the modal, delay shuffling the deck briefly
            // avoids briefly showing new deck order before modal closes
            const wasOpen = preview;
            setPreview(undefined);
            setTimeout(() => {
              if (!!wasOpen) shuffleDeck(wasOpen);
            }, 100);
          },
        }}
        content={<DeckModalBody deckType={preview} {...props} />}
      />
      <div
        className="flex flex-col items-center w-full py-[0.25rem]"
        style={{
          height: LAYOUT_HEIGHTS.footer,
          background:
            "linear-gradient(90deg, rgba(131,58,180,0.15) 0%, rgba(253,29,29,0.15) 50%, rgba(252,176,69,0.35) 100%)",
        }}
      >
        <div
          onContextMenu={(e) => {
            e.preventDefault();
            setPreview("atlas");
          }}
          className="grid place-items-center cursor-pointer"
          onClick={drawAtlas}
          style={{
            backgroundImage: "url(/card-backs/m_atlas.png)",
            height: "70px",
            aspectRatio: "3/2",
            borderRadius: "0.25rem",
            backgroundSize: "cover",
          }}
        >
          <p className="font-bold bg-[rgba(255,255,255,0.7)] px-[0.25rem] rounded-[0.25rem]">{atlasRemainingCards}</p>
        </div>
        <div
          onContextMenu={(e) => {
            e.preventDefault();
            setPreview("deck");
          }}
          className="grid place-items-center cursor-pointer"
          onClick={drawDeck}
          style={{
            backgroundImage: "url(/card-backs/m_spells.png)",
            width: "60px",
            aspectRatio: "2/3",
            borderRadius: "0.25rem",
            backgroundSize: "cover",
          }}
        >
          <p className="font-bold bg-[rgba(255,255,255,0.7)] px-[0.25rem] rounded-[0.25rem]">{deckRemainingCards}</p>
        </div>
      </div>
    </>
  );
};
