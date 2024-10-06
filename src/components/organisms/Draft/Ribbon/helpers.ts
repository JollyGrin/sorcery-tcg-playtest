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
