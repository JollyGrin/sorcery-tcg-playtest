import { CardDTO } from "@/utils/api/cardData/CardDataType";
import { DraftPlayerData } from "./types";

function shuffleAndSelect(arr: CardDTO[], count = 15) {
  const shuffled = arr.slice(); // Shallow copy to avoid mutating the original array
  for (let i = arr.length - 1; i > arr.length - 1 - count; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled.slice(-count); // Return the last `count` items
}

type Expansion = "alp" | "bet";
export function generateBoosterPack(props: {
  cardData: CardDTO[];
  expansionSlug: Expansion | "all";
}) {
  const cards = props.cardData.slice(); // shallow copy
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

/**
 * SORT PLAYERS BASED ON JOIN
 * */
type PlayersEntry = [string, DraftPlayerData];
export function sortPlayersByJoin(a: PlayersEntry, b: PlayersEntry) {
  const [, valueA] = a;
  const [, valueB] = b;
  return valueA.joinedSessionTimestamp - valueB.joinedSessionTimestamp;
}

/**
 * FIND ADJACENT SEATS IN DRAFT
 * */
export const findAdjacentPlayers = (
  currentPlayer: DraftPlayerData,
  _players: Record<string, DraftPlayerData>,
) => {
  const players = Object.entries(_players).sort(sortPlayersByJoin);

  const currentIndex = players.findIndex(
    ([, value]) =>
      value.joinedSessionTimestamp === currentPlayer.joinedSessionTimestamp,
  );

  const previousPlayer =
    currentIndex === 0
      ? players[players.length - 1] // If first player, return the last player
      : players[currentIndex - 1]; // Else, return the previous player

  const nextPlayer =
    currentIndex === players.length - 1
      ? players[0] // If last player, return the first player
      : players[currentIndex + 1]; // Else, return the next player

  console.log({ players, previousPlayer, nextPlayer });

  return {
    previousPlayer,
    nextPlayer,
  };
};
