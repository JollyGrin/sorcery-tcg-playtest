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

  const siteCount = cards.filter((c) => c.guardian.type === "Site").length;
  const spellbookCount = cards.length - siteCount;
  const sorted = [...cards].sort(sortAlphabetical);
  const counted = sorted.reduce(reduceCardCount, []);

  return (
    <>
      <Modal
        wrapperProps={{ open: isOpen, onOpenChange: onToggle }}
        content={
          <div
            className="grid min-w-[70vw] min-h-[50vh] max-h-[70vh] w-full gap-4"
            style={{ gridTemplateColumns: "4fr 1fr" }}
          >
            {/* Card images */}
            <div className="flex flex-wrap gap-1 h-full overflow-y-auto overflow-x-clip content-start">
              {sorted.map((card, index) => (
                <div
                  key={card.slug + index}
                  className="w-[16rem] h-fit transition-all duration-200 ease-out hover:scale-110 hover:z-10"
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    if (card.guardian.type === "Site") {
                      el.style.transform = "scale(1.1) rotate(90deg)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                  }}
                >
                  <img
                    alt={card.name}
                    src={getCardImage(card.slug)}
                    height="inherit"
                    width="inherit"
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>

            {/* Card list sidebar */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between text-xs pb-2 mb-1" style={{ borderBottom: "1px solid rgba(168,162,158,0.15)" }}>
                <span className="text-[#A8A29E]">
                  Spellbook: <span className="text-[#FAF7F0] font-medium">{spellbookCount}</span>
                  <span className="text-[#78716C]">/24</span>
                </span>
                <span className="text-[#A8A29E]">
                  Atlas: <span className="text-[#FAF7F0] font-medium">{siteCount}</span>
                  <span className="text-[#78716C]">/12</span>
                </span>
              </div>

              {counted.map((card, index) => (
                <div
                  key={card.name + index}
                  className="grid text-sm"
                  style={{ gridTemplateColumns: "1.5rem auto" }}
                >
                  <p className="text-[#A8A29E]">{card.count}x</p>
                  <p>{card.name}</p>
                </div>
              ))}

              <div className="mt-auto pt-4 flex flex-col gap-2">
                <Button
                  className="w-full bg-[#D4A853] text-[#1C1917] hover:bg-[#E0BC6A] font-semibold"
                  onClick={() => {
                    const list = sorted
                      .reduce(reduceCardCount, [])
                      .map((card) => `${card.count} ${card.name}`);
                    const parsed = list.join("\n");
                    copy(parsed);
                    toast.success("Copied decklist to clipboard");
                  }}
                >
                  Copy Bulk List
                </Button>
                <p className="text-[10px] text-[#78716C] text-center leading-tight">
                  Paste into Curiosa &apos;bulk add&apos; in Create Deck
                </p>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};
