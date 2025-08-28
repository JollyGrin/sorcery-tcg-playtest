export interface PreconDeck {
  name: string;
  description: string;
  avatar: string;
  spellbook: string[];
  atlas: string[];
  type: 'precon';
  element: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface PreconMeta {
  id: string;
  name: string;
  description: string;
  element: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  cardCount: {
    total: number;
    spellbook: number;
    atlas: number;
  };
  filePath: string;
}

// Load the precon index
export const getPreconList = async (): Promise<PreconMeta[]> => {
  try {
    const response = await fetch('/precons/index.json');
    if (!response.ok) {
      throw new Error('Failed to fetch precon list');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading precon list:', error);
    return [];
  }
};

// Load a specific precon deck
export const getPreconDeck = async (preconId: string): Promise<PreconDeck | null> => {
  try {
    const response = await fetch(`/precons/${preconId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch precon: ${preconId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading precon ${preconId}:`, error);
    return null;
  }
};

// Convert PreconDeck to LocalDeck format for saving
export const preconToLocalDeck = (precon: PreconDeck) => {
  return {
    name: precon.name,
    avatar: precon.avatar,
    spellbook: precon.spellbook,
    atlas: precon.atlas
  };
};

// Convert PreconDeck to CuriosaResponse format for game use
export const preconToCuriosaFormat = (precon: PreconDeck) => {
  const createCard = (slug: string, quantity: number = 1) => ({
    identifier: slug,
    name: slug,
    cost: 0,
    attack: 0,
    defence: 0,
    life: 0,
    thresholds: { air: 0, earth: 0, fire: 0, water: 0 },
    rulesText: '',
    type: '',
    subTypes: '',
    rarity: '',
    elements: '',
    keywords: [],
    quantity
  });

  // Count occurrences of each card in spellbook
  const spellbookCounts = precon.spellbook.reduce((acc, slug) => {
    acc[slug] = (acc[slug] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Count occurrences of each card in atlas
  const atlasCounts = precon.atlas.reduce((acc, slug) => {
    acc[slug] = (acc[slug] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    avatar: precon.avatar ? [createCard(precon.avatar, 1)] : [],
    spellbook: Object.entries(spellbookCounts).map(([slug, count]) => createCard(slug, count)),
    atlas: Object.entries(atlasCounts).map(([slug, count]) => createCard(slug, count)),
    sideboard: []
  };
};