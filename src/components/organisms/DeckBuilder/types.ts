export interface LocalDeck {
  id: string;
  name: string;
  avatar: string;
  spellbook: string[];
  atlas: string[];
  createdAt: number;
  updatedAt: number;
}

export interface CardThresholds {
  air: number;
  earth: number;
  fire: number;
  water: number;
}

export interface Card {
  name: string;
  slug: string;
  type: string;
  rarity: "Ordinary" | "Exceptional" | "Elite" | "Unique";
  cost: number;
  attack: number;
  defence: number;
  life: number | null;
  subType: string;
  rulesText: string;
  thresholds: CardThresholds;
}

export interface DeckBuilderState {
  cards: Card[];
  currentDeck: Partial<LocalDeck>;
  savedDecks: LocalDeck[];
  loading: boolean;
  searchQuery: string;
  selectedType: string;
  showMyDecks: boolean;
  showDeckCards: boolean;
  editingDeckId: string | null;
}