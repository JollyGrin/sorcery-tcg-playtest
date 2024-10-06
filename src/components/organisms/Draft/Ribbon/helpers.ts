import { CardDTO } from "@/utils/api/cardData/CardDataType";

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
