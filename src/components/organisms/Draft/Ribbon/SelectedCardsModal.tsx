import { Modal } from "@/components/atoms/Modal";
import { getCardImage } from "../../GameBoard/constants";
import { reduceCardCount, sortAlphabetical } from "./helpers";
import { CardDTO } from "@/utils/api/cardData/CardDataType";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/utils/hooks";
import toast from "react-hot-toast";

export const SelectedCardsModal = ({
  cards = [],
  isOpen,
  onToggle,
}: {
  cards?: CardDTO[];
  isOpen?: boolean;
  onToggle?(): void;
}) => {
  const [, copy] = useCopyToClipboard();

  return (
    <>
      <Modal
        wrapperProps={{ open: isOpen, onOpenChange: onToggle }}
        content={
          <div
            className="grid min-w-[70vw] min-h-[50vh] max-h-[70vh] w-full"
            style={{ gridTemplateColumns: "4fr 1fr" }}
          >
            <div className="flex flex-wrap gap-[0.25rem] h-full overflow-y-auto overflow-x-clip">
              {cards.sort(sortAlphabetical).map((card, index) => (
                <div
                  key={card.slug + index}
                  className="w-[18rem] h-fit transition-all duration-[0.25s] ease-in-out hover:scale-125"
                  style={{
                    transform: undefined,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    if (card.guardian.type === "Site") {
                      el.style.transform = "scale(1.25) rotate(90deg)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                  }}
                >
                  <img
                    alt="card image"
                    src={getCardImage(card.slug)}
                    height="inherit"
                    width="inherit"
                  />
                </div>
              ))}
            </div>
            <div>
              {cards
                .sort(sortAlphabetical)
                .reduce(reduceCardCount, [])
                .map((card, index) => {
                  return (
                    <div
                      key={card.name + index}
                      className="grid"
                      style={{ gridTemplateColumns: "1.5rem auto" }}
                    >
                      <p>{card.count}x</p>
                      <p>{card.name}</p>
                    </div>
                  );
                })}
              <Button
                className="mt-8 w-full"
                onClick={() => {
                  const list = cards
                    .sort(sortAlphabetical)
                    .reduce(reduceCardCount, [])
                    .map((card) => `${card.count} ${card.name}`);
                  const parsed = list.join("\n");
                  copy(parsed);
                  toast.success("Copied decklist to clipboard");
                }}
              >
                Copy Bulk List
              </Button>
              <p
                style={{
                  marginTop: "0.25rem",
                  fontSize: "0.85rem",
                  opacity: 0.6,
                  textAlign: "center",
                }}
              >
                Copy &amp; Paste into Curiosa &apos;bulk add&apos; in Create
                Deck
              </p>
            </div>
          </div>
        }
      />
    </>
  );
};
