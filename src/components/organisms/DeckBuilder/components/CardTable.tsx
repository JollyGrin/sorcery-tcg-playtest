import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from "@tanstack/react-table";
import { Card } from "../types";
import { FiPlus, FiChevronUp, FiChevronDown } from "react-icons/fi";

interface CardTableProps {
  cards: Card[];
  onAddCard: (card: Card) => void;
  getCardCount: (slug: string) => number;
  getCardImage: (slug: string) => string;
}

const RARITY_COLORS: Record<string, string> = {
  Ordinary: "#A8A29E",
  Exceptional: "#60A5FA",
  Elite: "#A78BFA",
  Unique: "#FBBF24",
};

const ELEMENT_COLORS: Record<string, string> = {
  air: "#93C5FD",
  earth: "#86EFAC",
  fire: "#FCA5A5",
  water: "#7DD3FC",
};

const columnHelper = createColumnHelper<Card>();

const CardTable: React.FC<CardTableProps> = ({
  cards,
  onAddCard,
  getCardCount,
  getCardImage,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "add",
        header: "",
        size: 40,
        cell: ({ row }) => {
          const count = getCardCount(row.original.slug);
          return (
            <button
              onClick={() => onAddCard(row.original)}
              className="w-7 h-7 rounded flex items-center justify-center cursor-pointer bg-white/5 hover:bg-accent-gold/20 hover:text-accent-gold text-text-muted transition-colors relative"
              title={`Add ${row.original.name} to deck`}
            >
              <FiPlus className="w-3.5 h-3.5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 card-count-badge rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                  {count}
                </span>
              )}
            </button>
          );
        },
      }),
      columnHelper.display({
        id: "image",
        header: "",
        size: 48,
        cell: ({ row }) => (
          <img
            src={getCardImage(row.original.slug)}
            alt=""
            className="w-8 h-11 object-cover rounded"
            loading="lazy"
          />
        ),
      }),
      columnHelper.accessor("name", {
        header: "Name",
        size: 200,
        cell: (info) => (
          <span className="text-text-primary font-medium text-sm truncate block max-w-[200px]">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("type", {
        header: "Type",
        size: 90,
        cell: (info) => (
          <span className="text-text-secondary text-xs capitalize">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("subType", {
        header: "Subtype",
        size: 120,
        cell: (info) => (
          <span className="text-text-muted text-xs truncate block max-w-[120px]">
            {info.getValue() || "—"}
          </span>
        ),
      }),
      columnHelper.accessor("rarity", {
        header: "Rarity",
        size: 100,
        cell: (info) => (
          <span
            className="text-xs font-medium"
            style={{ color: RARITY_COLORS[info.getValue()] }}
          >
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("cost", {
        header: "Cost",
        size: 60,
        cell: (info) => (
          <span className="text-text-secondary text-sm font-mono">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("attack", {
        header: "ATK",
        size: 55,
        cell: (info) => (
          <span className="text-red-400/80 text-sm font-mono">
            {info.getValue() || "—"}
          </span>
        ),
      }),
      columnHelper.accessor("defence", {
        header: "DEF",
        size: 55,
        cell: (info) => (
          <span className="text-blue-400/80 text-sm font-mono">
            {info.getValue() || "—"}
          </span>
        ),
      }),
      columnHelper.accessor("life", {
        header: "HP",
        size: 50,
        cell: (info) => (
          <span className="text-green-400/80 text-sm font-mono">
            {info.getValue() ?? "—"}
          </span>
        ),
      }),
      columnHelper.accessor("thresholds", {
        header: "Elements",
        size: 120,
        enableSorting: false,
        cell: (info) => {
          const t = info.getValue();
          const elements = Object.entries(t).filter(([, v]) => v > 0);
          if (elements.length === 0)
            return <span className="text-text-muted text-xs">—</span>;
          return (
            <div className="flex gap-1">
              {elements.map(([key, val]) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-sm bg-white/5"
                  style={{ color: ELEMENT_COLORS[key] }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: ELEMENT_COLORS[key] }}
                  />
                  {val}
                </span>
              ))}
            </div>
          );
        },
      }),
    ],
    [getCardCount, onAddCard, getCardImage]
  );

  const table = useReactTable({
    data: cards,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <p className="text-text-muted text-xs mb-3">
        {cards.length} card{cards.length !== 1 ? "s" : ""}
      </p>
      <table className="w-full border-collapse text-left">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b border-white/8"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`py-2 px-2 text-xs font-medium text-text-muted uppercase tracking-wider ${
                    header.column.getCanSort()
                      ? "cursor-pointer select-none hover:text-text-secondary"
                      : ""
                  }`}
                  style={{ width: header.getSize() }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-1">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getIsSorted() === "asc" && (
                      <FiChevronUp className="w-3 h-3 text-accent-gold" />
                    )}
                    {header.column.getIsSorted() === "desc" && (
                      <FiChevronDown className="w-3 h-3 text-accent-gold" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="table-view-row border-b border-white/4"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-1.5 px-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardTable;
