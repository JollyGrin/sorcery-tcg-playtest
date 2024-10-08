import { CardDTO } from "@/utils/api/cardData/CardDataType";
import { DraftPlayerData } from "../types";

export function sortAlphabetical(a: CardDTO, b: CardDTO) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export function reduceCardCount(
  acc: { name: string; count: number }[],
  card: Card,
) {
  const existingCard = acc.find((item) => item.name === card.name);
  if (existingCard) {
    existingCard.count += 1;
  } else {
    acc.push({ name: card.name, count: 1 });
  }
  return acc;
}

export function mapPackKey(pack: CardDTO[]) {
  const cardKeys = pack.map((card) => card.slug.slice(0, 2));
  return cardKeys.join("");
}
