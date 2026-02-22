import React, { useState } from "react";
import { buttonVariants } from "@/components/ui/button/variants";
import { inputVariants } from "@/components/ui/input/variants";
import { LocalDeck } from "../types";
import { decodeDeck, isValidDeck } from "../utils/deckEncoding";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (deck: Partial<LocalDeck>) => void;
}

const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [importText, setImportText] = useState("");
  const [error, setError] = useState("");
  const [importing, setImporting] = useState(false);

  if (!isOpen) return null;

  const handleImport = async () => {
    if (!importText.trim()) {
      setError("Please enter a deck URL or code");
      return;
    }

    setImporting(true);
    setError("");

    try {
      let deckData: Partial<LocalDeck>;

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
      }
      // Otherwise, it might be a text list (future enhancement)
      else {
        throw new Error("Please provide a valid deck URL or share code");
      }

      if (!isValidDeck(deckData)) {
        throw new Error("Invalid deck format");
      }

      // Import the deck
      onImport(deckData);
      onClose();
      setImportText("");
      setError("");
    } catch (error) {
      console.error("Import error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to import deck",
      );
    } finally {
      setImporting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setImportText("");
    setError("");
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-50 flex items-center justify-center p-4"
    >
      <div
        className="bg-[rgba(40,40,40,0.95)] rounded-[1rem] p-8 max-w-[500px] w-full border border-[rgba(255,255,255,0.2)]"
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-[1.5rem] font-bold text-brand-highlight"
          >
            Import Deck
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white text-[1.5rem] cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-4 items-stretch">
          <div>
            <p className="mb-2 text-gray-300">
              Paste a deck URL or share code:
            </p>
            <textarea
              placeholder="https://spells.bar/deckbuilder?deck=... or just the deck code"
              className={inputVariants()}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              style={{
                width: "100%",
                height: "100px",
                resize: "vertical",
                fontFamily: "monospace",
                fontSize: "0.875rem",
              }}
            />
          </div>

          {error && (
            <div
              className="bg-[rgba(239,68,68,0.1)] border border-red-400 rounded-[0.5rem] p-3"
            >
              <p className="text-red-400 text-sm">
                {error}
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <button
              className={buttonVariants()}
              onClick={handleClose}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              className={buttonVariants()}
              onClick={handleImport}
              disabled={importing || !importText.trim()}
              style={{ flex: 1 }}
            >
              {importing ? "Importing..." : "Import Deck"}
            </button>
          </div>
        </div>

        <div
          className="mt-6 p-3 bg-[rgba(59,130,246,0.1)] rounded-[0.5rem]"
        >
          <p className="text-xs text-blue-400">
            <strong>Tip:</strong> You can also visit a deck URL directly to
            import it automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
