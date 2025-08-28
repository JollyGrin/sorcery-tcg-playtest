# GOAL

Enable users to create their own decks on spells bar

# why?

Curiosa api changed and broke how deck imports work. I need an evergreen solution

# plan

We have a full list of cards at @public/card-data/processed_cards.json and even more information about each card in @public/card-data/cards.json.

Enable the user to browse/select cards to make a deck. Use searchbar to narrow down options. Should be very performant. Does not need to load all the cards at once to avoid loading too many images.

Decks should be able to be saved to localstorage. Enable exporting via copy/paste text list AND/OR a url using params (how can we get a large decklist to work in params? use ids?)

Decks should be usable with the deckimport and mapping component in @src/components/organisms/GameBoard/useDeckQuery.ts

enable the use of using these decks in deck import: src/components/molecules/LoadDeck/index.tsx

## Current Architecture Analysis

### Routing Structure

- App uses Next.js pages routing (pages directory)
- Main routes: `/`, `/solo`, `/online`, `/game`, `/crack`, `/draft`
- Recommend creating `/deckbuilder` route for the new feature

### Card Data Structure

- `processed_cards.json`: Minimal card data with name, slug, and type
- `cards.json`: Full card details including:
  - Guardian properties (cost, attack, defence, life, thresholds)
  - Elements and subTypes
  - Set information with variants
  - Rules text and flavor text
- Card types: artifact, aura, minion, site, avatar, magic
- Images available at: `https://card.cards.army/cards/{slug}.webp`

### Deck System

- Deck format follows `CuriosaResponse` structure:
  - `avatar`: Avatar card identifier
  - `spellbook`: Array of card identifiers (main deck)
  - `atlas`: Array of site card identifiers
- `useDeckQuery.ts` handles deck loading from URL params
- Supports deck sources: curiosa, realms-app, four-cores
- `LoadDeck` component provides UI for deck importing

### Implementation Plan

#### 1. New Route: `/deckbuilder`

Create `src/pages/deckbuilder.tsx` as the main entry point

#### 2. Component Structure

```
src/components/organisms/DeckBuilder/
├── index.tsx              // Main deck builder container
├── CardBrowser/
│   ├── index.tsx         // Card browsing interface
│   ├── CardFilter.tsx    // Filter by type, cost, element
│   ├── CardSearch.tsx    // Search by name/text
│   └── CardGrid.tsx      // Lazy-loaded card display
├── DeckList/
│   ├── index.tsx         // Current deck display
│   ├── DeckSection.tsx   // Avatar/Spellbook/Atlas sections
│   └── DeckStats.tsx     // Card count, element distribution
└── DeckActions/
    ├── SaveDeck.tsx      // Save to localStorage
    ├── ExportDeck.tsx    // Export as text list or URL
    └── ImportDeck.tsx    // Import from text list
```

#### 3. Technical Implementation

**Performance Optimizations:**

- Use React virtualization for card grid (react-window)
- Lazy load card images with Intersection Observer
- Index cards by name for instant search
- Paginate results (50-100 cards per page), using infinite scroll loading

**LocalStorage Structure:**

```typescript
interface LocalDeck {
  id: string; // UUID for the deck
  name: string; // User-defined deck name
  avatar: string; // Avatar card identifier
  spellbook: string[]; // Array of card identifiers
  atlas: string[]; // Array of site identifiers
  createdAt: number; // Timestamp
  updatedAt: number; // Timestamp
}
```

**URL Parameter Encoding:**

- Use base64 encoding for compact deck representation
- Format: `?deck=base64(avatar|card1,card2|site1,site2)`
- Alternative: Create deck IDs and store in a simple backend

#### 4. Integration Points

**With useDeckQuery:**

- Add new deck source type: `local`
- URL format: `?p1=local-{deckId}`
- Retrieve deck from localStorage by ID

**With LoadDeck component:**

- Add "My Decks" tab showing saved local decks
- Add "Build New Deck" button linking to `/deckbuilder`
- Support importing local deck URLs

**Navigation:**

- Add deck builder option to landing page
- Include in navigation menu if exists
- Add quick access from solo/online play modes

#### 5. Deck Building Rules

- Enforce deck size limits if any
- Validate card quantities (max copies per card)
- Ensure avatar is selected
- Separate site cards into atlas deck
- Show warnings for illegal deck configurations

#### 6. Export Formats

**Text List Format:**

```
1x Avatar Name

Spellbook:
4x Card Name 1
3x Card Name 2
...

Atlas:
1x Site Name 1
1x Site Name 2
...
```

**URL Format:**

- Full URL with encoded deck: `https://app.com?deck=base64string` (no database to create public deckids)
