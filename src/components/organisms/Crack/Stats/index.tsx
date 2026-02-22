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
    <div
      className="flex items-center px-4 py-2"
      style={{
        background: "#292524",
        borderBottom: "1px solid rgba(168,162,158,0.12)",
      }}
    >
      <div className="flex items-center gap-4 text-xs tabular-nums">
        <Stat label="Cards" value={flat.length} />
        <Sep />
        <Stat
          label="Exceptional"
          value={exceptionals.length}
          color="rgba(60,160,210,0.9)"
        />
        <Stat
          label="Elite"
          value={elites.length}
          color="rgba(160,60,255,0.9)"
        />
        <Stat
          label="Unique"
          value={uniques.length}
          color="rgba(230,180,50,0.9)"
        />
        <Sep />
        <Stat label="Sites" value={sites.length} />
        <Stat label="Avatars" value={avatars.length} />
        <Sep />
        <Stat
          label="Packs"
          value={props.player.finishedPacks.length}
          color="#D4A853"
        />
      </div>
    </div>
  );
};

const Stat = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) => (
  <div className="flex flex-col items-center leading-tight">
    <span
      className="font-semibold text-sm"
      style={{ color: color ?? "#FAF7F0" }}
    >
      {value}
    </span>
    <span className="text-[10px] uppercase tracking-wider text-[#A8A29E]">
      {label}
    </span>
  </div>
);

const Sep = () => (
  <div
    className="w-px h-6"
    style={{ background: "rgba(168,162,158,0.2)" }}
  />
);
