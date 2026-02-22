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
    <div className="flex items-center justify-between">
      <div className="flex px-[1.25rem] py-0 gap-8 text-[0.85rem] md:text-[1rem]">
        <div className="flex items-start flex-row md:flex-col gap-2 md:gap-0">
          <p>Exceptionals: {exceptionals.length.toString()}</p>
          <p>Elites: {elites.length.toString()}</p>
          <p>Uniques: {uniques.length.toString()}</p>
        </div>
        <div className="flex items-start flex-row md:flex-col gap-2 md:gap-0">
          <p>Total Cards: {flat.length.toString()}</p>
          <p>Sites: {sites.length.toString()}</p>
          <p>Avatars: {avatars.length.toString()}</p>
        </div>
      </div>
      <div className="hidden lg:block p-4 mx-4 bg-[plum]">
        <p>Online draft currently in development!</p>
      </div>
    </div>
  );
};
