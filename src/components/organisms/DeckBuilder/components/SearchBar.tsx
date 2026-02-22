import React from "react";
import { inputVariants } from "@/components/ui/input/variants";
import { FiGrid, FiList, FiLayers, FiPlus, FiDownload, FiEye } from "react-icons/fi";

export type ViewMode = "grid" | "tilt" | "table";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedRarity: string;
  setSelectedRarity: (rarity: string) => void;
  costRange: [number, number];
  setCostRange: (range: [number, number]) => void;
  selectedElements: string[];
  setSelectedElements: (elements: string[]) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  showMyDecks: boolean;
  setShowMyDecks: (show: boolean) => void;
  showDeckCards: boolean;
  setShowDeckCards: (show: boolean) => void;
  savedDecksCount: number;
  onCreateNewDeck: () => void;
  onImport: () => void;
}

const TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "avatar", label: "Avatar" },
  { value: "minion", label: "Minion" },
  { value: "magic", label: "Magic" },
  { value: "artifact", label: "Artifact" },
  { value: "aura", label: "Aura" },
  { value: "site", label: "Site" },
];

const RARITY_OPTIONS = [
  { value: "all", label: "All Rarities" },
  { value: "Ordinary", label: "Ordinary" },
  { value: "Exceptional", label: "Exceptional" },
  { value: "Elite", label: "Elite" },
  { value: "Unique", label: "Unique" },
];

const ELEMENT_OPTIONS = [
  { value: "air", label: "Air", color: "#93C5FD" },
  { value: "earth", label: "Earth", color: "#86EFAC" },
  { value: "fire", label: "Fire", color: "#FCA5A5" },
  { value: "water", label: "Water", color: "#7DD3FC" },
];

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedRarity,
  setSelectedRarity,
  costRange,
  setCostRange,
  selectedElements,
  setSelectedElements,
  viewMode,
  setViewMode,
  showMyDecks,
  setShowMyDecks,
  showDeckCards,
  setShowDeckCards,
  savedDecksCount,
  onCreateNewDeck,
  onImport,
}) => {
  const toggleElement = (element: string) => {
    if (selectedElements.includes(element)) {
      setSelectedElements(selectedElements.filter((e) => e !== element));
    } else {
      setSelectedElements([...selectedElements, element]);
    }
  };

  return (
    <div className="sticky top-0 z-10 deckbuilder-searchbar px-4 py-3">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-3">
        {/* Row 1: Nav actions + search */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          {/* Navigation buttons */}
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={() => {
                setShowMyDecks(!showMyDecks);
                setShowDeckCards(false);
              }}
              className={`filter-chip flex items-center gap-1.5 px-3 py-2 rounded-md text-sm cursor-pointer ${showMyDecks ? "!border-accent-gold/50 !bg-accent-gold/12 !text-accent-gold" : "text-text-secondary"}`}
            >
              <FiLayers className="w-3.5 h-3.5" />
              Decks ({savedDecksCount})
            </button>
            <button
              onClick={() => {
                setShowDeckCards(!showDeckCards);
                setShowMyDecks(false);
              }}
              className={`filter-chip flex items-center gap-1.5 px-3 py-2 rounded-md text-sm cursor-pointer ${showDeckCards ? "!border-accent-gold/50 !bg-accent-gold/12 !text-accent-gold" : "text-text-secondary"}`}
            >
              <FiEye className="w-3.5 h-3.5" />
              Deck Cards
            </button>
            <button
              onClick={onCreateNewDeck}
              className="filter-chip flex items-center gap-1.5 px-3 py-2 rounded-md text-sm text-text-secondary cursor-pointer"
            >
              <FiPlus className="w-3.5 h-3.5" />
              New
            </button>
            <button
              onClick={onImport}
              className="filter-chip flex items-center gap-1.5 px-3 py-2 rounded-md text-sm text-text-secondary cursor-pointer"
            >
              <FiDownload className="w-3.5 h-3.5" />
              Import
            </button>
          </div>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search cards..."
            className={inputVariants() + " !bg-white/5 !border-white/8 flex-1"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* View toggle */}
          <div className="flex gap-0.5 bg-white/5 rounded-md p-0.5 shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded cursor-pointer transition-colors ${viewMode === "grid" ? "bg-accent-gold/20 text-accent-gold" : "text-text-muted hover:text-text-secondary"}`}
              title="Grid view"
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("tilt")}
              className={`p-2 rounded cursor-pointer transition-colors ${viewMode === "tilt" ? "bg-accent-gold/20 text-accent-gold" : "text-text-muted hover:text-text-secondary"}`}
              title="Tilt view (3D)"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="18" rx="2" transform="rotate(-6 12 12)" />
                <path d="M8 10l4-2 4 2" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded cursor-pointer transition-colors ${viewMode === "table" ? "bg-accent-gold/20 text-accent-gold" : "text-text-muted hover:text-text-secondary"}`}
              title="Table view"
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Row 2: Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Type filter */}
          <select
            className="bg-white/5 border border-white/8 rounded-md px-2.5 py-1.5 text-sm text-text-secondary focus:outline-none focus:border-accent-gold/40 cursor-pointer"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Rarity filter */}
          <select
            className="bg-white/5 border border-white/8 rounded-md px-2.5 py-1.5 text-sm text-text-secondary focus:outline-none focus:border-accent-gold/40 cursor-pointer"
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
          >
            {RARITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Cost range */}
          <div className="flex items-center gap-1.5 text-sm text-text-muted">
            <span className="text-xs">Cost</span>
            <input
              type="number"
              min={0}
              max={20}
              value={costRange[0]}
              onChange={(e) =>
                setCostRange([parseInt(e.target.value) || 0, costRange[1]])
              }
              className="w-12 bg-white/5 border border-white/8 rounded px-1.5 py-1 text-xs text-text-secondary text-center focus:outline-none focus:border-accent-gold/40"
            />
            <span>-</span>
            <input
              type="number"
              min={0}
              max={20}
              value={costRange[1]}
              onChange={(e) =>
                setCostRange([costRange[0], parseInt(e.target.value) || 20])
              }
              className="w-12 bg-white/5 border border-white/8 rounded px-1.5 py-1 text-xs text-text-secondary text-center focus:outline-none focus:border-accent-gold/40"
            />
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10" />

          {/* Element filters */}
          {ELEMENT_OPTIONS.map((el) => (
            <button
              key={el.value}
              onClick={() => toggleElement(el.value)}
              className="filter-chip px-2.5 py-1 rounded-md text-xs cursor-pointer flex items-center gap-1.5"
              data-active={selectedElements.includes(el.value)}
              style={{
                borderColor: selectedElements.includes(el.value)
                  ? el.color + "66"
                  : undefined,
                color: selectedElements.includes(el.value)
                  ? el.color
                  : undefined,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: el.color }}
              />
              {el.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
