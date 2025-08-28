export interface LocalDeck {
  id: string;
  name: string;
  avatar: string;
  spellbook: string[];
  atlas: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Card {
  name: string;
  slug: string;
  type: string;
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