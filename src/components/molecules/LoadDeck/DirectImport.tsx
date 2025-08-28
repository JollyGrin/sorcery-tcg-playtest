import React, { useState } from "react";
import { Box, Flex } from "styled-system/jsx";
import { button, input } from "styled-system/recipes";
import { CuriosaResponse } from "@/utils/api/curiosa/api";
import {
  decodeDeck,
  isValidDeck,
} from "../../organisms/DeckBuilder/utils/deckEncoding";
import Link from "next/link";

interface DirectImportProps {
  setDeck: (deck?: CuriosaResponse) => void;
}

const DirectImport: React.FC<DirectImportProps> = ({ setDeck }) => {
  const [importText, setImportText] = useState("");
  const [error, setError] = useState("");
  const [importedDeck, setImportedDeck] = useState<{ name?: string; avatar?: string; spellbook?: string[]; atlas?: string[] } | null>(null);

  const handleImport = () => {
    if (!importText.trim()) {
      setError("Please enter a spells.bar deck URL or share code");
      return;
    }

    setError("");

    try {
      let deckData: Partial<{ name: string; avatar?: string; spellbook?: string[]; atlas?: string[] }>;

      // Check if it's a full URL
      if (importText.includes("deck=")) {
        const url = new URL(importText);
        const deckParam = url.searchParams.get("deck");
        if (!deckParam) {
          throw new Error("No deck data found in URL");
        }
        deckData = decodeDeck(deckParam);
      }
      // Check if it's just the encoded deck parameter
      else if (importText.length > 20 && !importText.includes(" ")) {
        deckData = decodeDeck(importText);
      } else {
        throw new Error("Please provide a valid deck URL or share code");
      }

      if (!isValidDeck(deckData)) {
        throw new Error("Invalid deck format");
      }

      setImportedDeck(deckData);
      setError("");
    } catch (error) {
      console.error("Import error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to import deck",
      );
      setImportedDeck(null);
    }
  };

  // Convert imported deck to CuriosaResponse format
  const convertToCuriosaFormat = (localDeck: { name?: string; avatar?: string; spellbook?: string[]; atlas?: string[] }): CuriosaResponse => {
    const createCard = (slug: string, quantity: number = 1) => ({
      identifier: slug,
      name: slug,
      cost: 0,
      attack: 0,
      defence: 0,
      life: 0,
      thresholds: { air: 0, earth: 0, fire: 0, water: 0 },
      rulesText: "",
      type: "",
      subTypes: "",
      rarity: "",
      elements: "",
      keywords: [],
      quantity,
    });

    // Count occurrences of each card in spellbook
    const spellbookCounts = (localDeck.spellbook || []).reduce(
      (acc: Record<string, number>, slug: string) => {
        acc[slug] = (acc[slug] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Count occurrences of each card in atlas
    const atlasCounts = (localDeck.atlas || []).reduce(
      (acc: Record<string, number>, slug: string) => {
        acc[slug] = (acc[slug] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      avatar: localDeck.avatar ? [createCard(localDeck.avatar, 1)] : [],
      spellbook: Object.entries(spellbookCounts).map(([slug, count]) =>
        createCard(slug, count),
      ),
      atlas: Object.entries(atlasCounts).map(([slug, count]) =>
        createCard(slug, count),
      ),
      sideboard: []
    };
  };

  const handleUseDeck = () => {
    if (importedDeck) {
      const curiousaDeck = convertToCuriosaFormat(importedDeck);
      setDeck(curiousaDeck);
    }
  };

  return (
    <Box>
      <p style={{ marginBottom: "1rem" }}>
        Import a deck directly from a spells.bar{" "}
        <Link href="/deckbuilder" style={{ color: "blue" }} target="_blank">
          deck URL
        </Link>
        :
      </p>

      <textarea
        placeholder="Paste deck URL or share code here..."
        className={input()}
        value={importText}
        onChange={(e) => setImportText(e.target.value)}
        style={{
          width: "100%",
          height: "80px",
          marginBottom: "1rem",
          resize: "vertical",
          fontFamily: "monospace",
          fontSize: "0.875rem",
        }}
      />

      <button
        className={button()}
        onClick={handleImport}
        disabled={!importText.trim()}
        style={{ width: "100%", marginBottom: "1rem" }}
      >
        Import Deck
      </button>

      {error && (
        <Box
          p="0.75rem"
          mb="1rem"
          bg="rgba(239,68,68,0.1)"
          border="1px solid #ef4444"
          borderRadius="0.5rem"
        >
          <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>{error}</p>
        </Box>
      )}

      {importedDeck && (
        <Box>
          <Box
            p="1rem"
            mb="1rem"
            bg="rgba(34,197,94,0.1)"
            border="1px solid #22c55e"
            borderRadius="0.5rem"
          >
            <h3
              style={{
                fontWeight: "bold",
                marginBottom: "0.5rem",
                color: "#22c55e",
              }}
            >
              Successfully imported: {importedDeck.name || 'Imported Deck'}
            </h3>
            <p style={{ fontSize: "0.875rem" }}>
              {(importedDeck.spellbook || []).length} cards,{" "}
              {(importedDeck.atlas || []).length} sites
            </p>
          </Box>

          <button
            className={button()}
            onClick={handleUseDeck}
            style={{ width: "100%", marginBottom: "1rem" }}
          >
            Use This Deck
          </button>

          {/* Show deck preview */}
          <Box>
            <h4 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              Deck Preview:
            </h4>
            <Flex wrap="wrap" gap="0.25rem" maxH="200px" overflowY="auto">
              {importedDeck.avatar && (
                <img
                  src={`https://card.cards.army/cards/${importedDeck.avatar}.webp`}
                  alt="Avatar"
                  width="120px"
                  style={{ borderRadius: "0.25rem" }}
                />
              )}
              {Array.from(
                new Set([
                  ...(importedDeck.spellbook || []),
                  ...(importedDeck.atlas || []),
                ]),
              )
                .slice(0, 20)
                .map((slug: string, index: number) => (
                  <img
                    key={slug + index}
                    src={`https://card.cards.army/cards/${slug}.webp`}
                    alt={slug}
                    width="120px"
                    style={{ borderRadius: "0.25rem" }}
                  />
                ))}
            </Flex>
            {(importedDeck.spellbook || []).length +
              (importedDeck.atlas || []).length >
              20 && (
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  textAlign: "center",
                  marginTop: "0.5rem",
                }}
              >
                ... and{" "}
                {(importedDeck.spellbook || []).length +
                  (importedDeck.atlas || []).length -
                  20}{" "}
                more cards
              </p>
            )}
          </Box>
        </Box>
      )}

      <Box
        mt="1rem"
        p="0.75rem"
        bg="rgba(59,130,246,0.1)"
        borderRadius="0.5rem"
      >
        <p style={{ fontSize: "0.75rem", color: "#3b82f6" }}>
          <strong>Tip:</strong> Get shareable deck URLs from the Deck Builder&apos;s
          export feature.
        </p>
      </Box>
    </Box>
  );
};

export default DirectImport;
