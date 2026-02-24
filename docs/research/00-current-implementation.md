# Current Drag & Drop Implementation Analysis

## Library

**@dnd-kit** (dnd-kit.com)
- `@dnd-kit/core` ^6.1.0
- `@dnd-kit/sortable` ^8.0.0
- `@dnd-kit/utilities` ^3.2.2

## Architecture Overview

```
GameBoard (manages gridItems state)
├── DndContext (collision + sensors)
├── GameLayout
│   ├── Main Grid (0-19) ── 5x4 board
│   │   ├── DroppableGridItem (20 cells)
│   │   │   ├── SortableContext (rectSortingStrategy)
│   │   │   │   └── SortableItem (each card)
│   │   │   └── Green border highlight on hover
│   ├── Auras (20-31, overlay positions)
│   │   ├── AuraDrop (DroppableGridItem wrapper)
│   │   │   └── DragItem (when card present)
│   └── GameFooter (Hand = Grid 32)
│       ├── DroppableGridItem (horizontal)
│       │   ├── SortableContext (horizontalListSortingStrategy)
│       │   │   └── SortableItem (each hand card)
│       └── Other Trays: Grave (35), Decks (33-34), Counters
└── DragOverlay (frozen card image follows cursor)
```

## Container Map

| Range | Purpose | Count |
|-------|---------|-------|
| 0-19 | Main game board (5x4 grid) | 20 |
| 20-31 | Aura intersection positions | 12 |
| 32 | Hand/Tray (footer) | 1 |
| 33 | Deck | 1 |
| 34 | Atlas Deck | 1 |
| 35 | Grave | 1 |
| **Total** | | **36** |

## Three Drag Component Types

### 1. DragItem (Auras)
- Uses `useDraggable()` from @dnd-kit/core
- ID pattern: `"{gridIndex}-{index}"` (e.g., "20-0")
- Visual feedback: opacity 0.4, grab cursor
- Transform: `CSS.Translate.toString()` (3D translate)

### 2. SortableItem (Grid & Hand Cards)
- Uses `useSortable()` from @dnd-kit/sortable
- ID: card's UUID
- Visual feedback: opacity 0.5, grab cursor
- Transform: `CSS.Transform.toString()`
- Custom `animateLayoutChanges` - only animates during sorting/after drag

### 3. DroppableGridItem (Drop Targets)
- Uses `useDroppable()` from @dnd-kit/core
- ID pattern: `"droppable-{gridIndex}"`
- Green border on hover (`isOver`)
- Background: green-200 on hover, gray-200 default
- Supports right-click context menu for card injection

## Core Hook: useHandleDrag.ts

### State
- `activeId` - Currently dragging item's ID
- `activeCardRef` - Frozen card data for DragOverlay
- `gridItemsRef` - Mutable ref to current grid state
- `snapshotRef` - Deep clone at drag start (for cancel)

### Sensors
- **PointerSensor**: 5px activation distance
- **TouchSensor**: 250ms delay + 5px tolerance
- **KeyboardSensor**: Arrow keys with sortable coordinates

### Collision Detection
Custom composite strategy:
- **Footer area** (Y position check): `closestCenter` (horizontal layout)
- **Grid area**: `closestCorners` (2D grid)

### Event Flow
```
DragStart → Capture active card → Take snapshot
    ↓
DragOver → Cross-container? → Update state live (splice + insert)
    ↓
DragEnd → Same-container? → arrayMove() for reorder
    ↓
DragCancel → Restore snapshot
```

### DragOverlay
- Renders frozen card image at cursor position
- Different rendering for "site" cards (horizontal/atlas) vs regular cards
- Drop animation: 200ms with `cubic-bezier(0.18, 0.67, 0.6, 1.22)` (bounce)

## Known Issues & Pain Points

### 1. Dual ID Systems
Aura cards use `"{gridIndex}-{index}"` while regular cards use UUIDs. Every handler needs fallback logic:
```typescript
let activeContainer = findContainer(prev, active.id);
if (activeContainer === -1 && active.data.current?.gridIndex != null) {
  activeContainer = active.data.current.gridIndex; // fallback
}
```

### 2. Container Resolution Uncertainty
`resolveOverTarget()` returns -1 for unfound containers with no validation that the container actually exists. Cards could theoretically drop into invalid containers.

### 3. No Memoization
- DragOverlay content not memoized
- Event handlers not wrapped in useCallback
- `gridItems.slice(0, 20).reverse()` creates new array every render
- SortItemWrapper not wrapped in React.memo

### 4. Separate Preview System
Layout.tsx has an independent drag preview system (manual positioning via DragEvent) that isn't integrated with dnd-kit's DragOverlay.

### 5. Snapshot Cost
Deep cloning all 36 grid arrays on every drag start is safe but expensive:
```typescript
snapshotRef.current = gridItemsRef.current.map((arr) =>
  arr.map((card) => ({ ...card }))
);
```

### 6. Magic Numbers
Grid indices are raw numbers throughout. No enum or constant map for zones.
