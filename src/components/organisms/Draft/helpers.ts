import { CardDTO } from "@/utils/api/cardData/CardDataType";

function shuffleAndSelect(arr: any[], count = 15) {
  let shuffled = arr.slice(); // Shallow copy to avoid mutating the original array
  for (let i = arr.length - 1; i > arr.length - 1 - count; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled.slice(-count); // Return the last `count` items
}

type Expansion = "alp" | "bet";
export function generateBoosterPack(props: {
  cardData: CardDTO[];
  expansionSlug: Expansion | "all";
}) {
  let cards = props.cardData.slice(); // shallow copy
  const cardsInSet = cards.filter((card) => {
    if (props.expansionSlug === "all") return true;
    const setsFoundIn = card.sets.map((set) => set.slug);
    return setsFoundIn.includes(props.expansionSlug);
  });

  // 3 exceptionals
  const exceptionals = cardsInSet?.filter(
    (card) => card.guardian.rarity === "Exceptional",
  );

  // special pull card
  const pullCard = cardsInSet?.filter((card) => {
    const weightedCoinFlip = Math.random() <= 0.2; // 20% chance of success
    const rarity: CardDTO["guardian"]["rarity"] = weightedCoinFlip
      ? "Unique"
      : "Elite";

    // const isSpecialRarity = !["Exceptional", "Ordinary"].includes(
    //   card.guardian.rarity,
    // );
    //
    const isSpecialRarity = card.guardian.rarity === rarity;
    const isAvatar = card.guardian.type === "Avatar";
    return isSpecialRarity || isAvatar;
  });

  // 10 ordinaries
  const ordinaries = cardsInSet?.filter((card) => {
    const isOrdinary = card.guardian.rarity === "Ordinary";
    const isAvatar = card.guardian.type === "Avatar";
    const isSite = card.guardian.type === "Site";
    return isOrdinary && !isAvatar && !isSite;
  });

  // 1 ordinary land
  const ordinarySite = cardsInSet?.filter((card) => {
    const isOrdinary = card.guardian.rarity === "Ordinary";
    const isSite = card.guardian.type === "Site";
    return isOrdinary && isSite;
  });

  const newBooster = [
    ...shuffleAndSelect(exceptionals, 3),
    ...shuffleAndSelect(pullCard, 1),
    ...shuffleAndSelect(ordinaries, 10),
    ...shuffleAndSelect(ordinarySite, 1),
  ];

  return newBooster;
}
