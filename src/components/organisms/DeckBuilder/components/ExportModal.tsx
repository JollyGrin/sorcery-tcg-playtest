import React, { useState } from 'react';
import { buttonVariants } from '@/components/ui/button/variants';
import { LocalDeck, Card } from '../types';
import { generateShareableURL } from '../utils/deckEncoding';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  deck: Partial<LocalDeck>;
  cards: Card[];
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  deck,
  cards
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'url' | 'text'>('url');

  if (!isOpen) return null;

  const shareableURL = generateShareableURL(deck);

  const generateTextList = (): string => {
    let textList = `${deck.name || 'Deck'}\n\n`;

    if (deck.avatar) {
      const avatarCard = cards.find(c => c.slug === deck.avatar);
      textList += `Avatar:\n1x ${avatarCard?.name || deck.avatar}\n\n`;
    }

    if (deck.spellbook && deck.spellbook.length > 0) {
      textList += `Spellbook (${deck.spellbook.length} cards):\n`;
      const spellbookCounts = deck.spellbook.reduce((acc, slug) => {
        acc[slug] = (acc[slug] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      Object.entries(spellbookCounts)
        .sort(([a], [b]) => {
          const cardA = cards.find(c => c.slug === a);
          const cardB = cards.find(c => c.slug === b);
          return (cardA?.name || a).localeCompare(cardB?.name || b);
        })
        .forEach(([slug, count]) => {
          const card = cards.find(c => c.slug === slug);
          textList += `${count}x ${card?.name || slug}\n`;
        });
      textList += '\n';
    }

    if (deck.atlas && deck.atlas.length > 0) {
      textList += `Atlas (${deck.atlas.length} sites):\n`;
      deck.atlas.forEach((slug) => {
        const card = cards.find(c => c.slug === slug);
        textList += `1x ${card?.name || slug}\n`;
      });
    }

    return textList.trim();
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const textList = generateTextList();

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-50 flex items-center justify-center p-4"
    >
      <div
        className="bg-[rgba(40,40,40,0.95)] rounded-[1rem] p-8 max-w-[600px] w-full max-h-[80vh] overflow-y-auto border border-[rgba(255,255,255,0.2)]"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[1.5rem] font-bold text-brand-highlight">
            Export Deck: {deck.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-[1.5rem] cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-4">
          <button
            className={buttonVariants()}
            onClick={() => setActiveTab('url')}
          >
            Shareable URL
          </button>
          <button
            className={buttonVariants()}
            onClick={() => setActiveTab('text')}
          >
            Text List
          </button>
        </div>

        {/* URL Tab */}
        {activeTab === 'url' && (
          <div className="flex flex-col gap-4 items-stretch">
            <div>
              <p className="mb-2 text-gray-300">
                Share this URL to let others import your deck:
              </p>
              <div
                className="bg-[rgba(0,0,0,0.3)] p-4 rounded-[0.5rem] border border-[rgba(255,255,255,0.2)]"
              >
                <code className="text-sm break-all text-green-400">
                  {shareableURL}
                </code>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className={buttonVariants()}
                onClick={() => copyToClipboard(shareableURL)}
                style={{ flex: 1 }}
              >
                {copied ? 'Copied!' : 'Copy URL'}
              </button>
              <button
                className={buttonVariants()}
                onClick={() => window.open(`mailto:?subject=Sorcery TCG Deck - ${deck.name}&body=Check out my deck: ${shareableURL}`, '_blank')}
              >
                Email
              </button>
            </div>
          </div>
        )}

        {/* Text Tab */}
        {activeTab === 'text' && (
          <div className="flex flex-col gap-4 items-stretch">
            <div>
              <p className="mb-2 text-gray-300">
                Copy this text list to share your deck:
              </p>
              <div
                className="bg-[rgba(0,0,0,0.3)] p-4 rounded-[0.5rem] border border-[rgba(255,255,255,0.2)] max-h-[300px] overflow-y-auto"
              >
                <pre className="text-sm whitespace-pre-wrap text-gray-100">
                  {textList}
                </pre>
              </div>
            </div>
            <button
              className={buttonVariants()}
              onClick={() => copyToClipboard(textList)}
            >
              {copied ? 'Copied!' : 'Copy Text List'}
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Anyone with the URL can import this deck and save it to their collection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
