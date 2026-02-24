# Performance Optimization for Drag and Drop

## Core Strategies

### 1. Memoization (Highest Impact)

The single most impactful optimization. Research showed ~**2x drag performance improvement** from proper memoization.

#### React.memo on Draggable Components
```typescript
// Wrap item components to prevent re-renders of non-dragging items
const SortItemWrapper = React.memo(({ card, ...props }) => {
  return <SortableItem {...props}>{/* card content */}</SortableItem>;
});
```

#### useMemo for Computed Values
```typescript
// Overlay content
const overlayContent = useMemo(() => {
  if (!activeCard) return null;
  return activeCard.type === "site"
    ? <CardAtlas img={activeCard.img} />
    : <CardImage img={activeCard.img} />;
}, [activeCard]);

// Sorted item lists
const sortedItems = useMemo(
  () => cards.map(card => card.id),
  [cards]
);
```

#### useCallback for Event Handlers
```typescript
const handleDragStart = useCallback((event) => {
  // handler logic using refs (not state)
}, []); // stable reference
```

### 2. CSS Transform Optimization

- Use `transform` instead of `top`/`left` for positioning during drag
- Apply `will-change: 'transform'` for hardware acceleration
- Use `opacity` for fade effects (GPU-composited)

```css
.dragging {
  will-change: transform;
  transform: translate3d(0, 0, 0); /* force GPU layer */
}
```

Our current implementation correctly uses CSS transforms via `CSS.Transform.toString()` and `CSS.Translate.toString()`.

### 3. Throttling / Frame Limiting

- Limit drag update frequency to ~60fps intervals
- Debounce final position confirmations
- dnd-kit handles most of this internally, but custom collision detection should be efficient

### 4. Batch State Updates

```typescript
import { unstable_batchedUpdates } from 'react-dom';

// Group multiple state changes into single render
unstable_batchedUpdates(() => {
  setGridItems(newItems);
  setActiveId(null);
});
```

### 5. Efficient Data Structures

Current snapshot approach creates deep clones:
```typescript
// Current: O(n*m) clone on every drag start
snapshotRef.current = gridItemsRef.current.map((arr) =>
  arr.map((card) => ({ ...card }))
);
```

For 36 containers with potentially many cards, this is a consideration. Alternatives:
- Immutable data structures (structural sharing)
- Only snapshot containers that changed
- useReducer with replay pattern

### 6. Virtual Rendering (For Large Lists)

Not needed for our 20-cell grid + hand, but relevant if card counts grow:
- react-window or react-virtualized
- Only renders visible items in DOM
- Drawback: screen readers can't read non-rendered content, Cmd+F won't find them

## dnd-kit-Specific Performance Issues

### Known Re-render Problems

1. **useSortable re-renders all items** even on a simple click (Issue #1379)
2. **Cross-container drag re-renders ALL** draggable/droppable components (Issue #389)
3. These are acknowledged by the maintainer and targeted in the experimental rewrite

### Mitigation

- `React.memo` on item components is the primary defense
- Using `useRef` for mutable state during drag avoids triggering renders (our implementation already does this - good)
- The `collision` function should avoid allocations

## Measurement

### React DevTools Profiler
- Record profiles during drag interactions
- Identify which components re-render and why
- Look for "wasted renders" (re-renders with no visual change)

### Key Metric
One implementation reduced cross-container move time from **380ms to 8ms** with proper optimizations (memoization + batch updates).

## Current Implementation Assessment

### What we do well
- `useRef` for mutable state (`gridItemsRef`, `activeCardRef`, `snapshotRef`) - avoids re-renders
- CSS transforms for positioning
- 250ms transition with custom easing

### What needs improvement

| Issue | Impact | Fix |
|-------|--------|-----|
| DragOverlay content not memoized | Re-renders on every drag event | `useMemo` |
| SortItemWrapper not `React.memo` | All cards re-render during drag | `React.memo` |
| Event handlers recreated each render | Referential instability | `useCallback` |
| `gridItems.slice(0, 20).reverse()` | New array every render | `useMemo` |
| `collision` function in hook body | Recreated every render | `useCallback` or extract |
| Full 36-container deep clone on drag start | O(n*m) snapshot cost | Consider partial snapshot |

## Priority Order for Optimizations

1. **React.memo on SortItemWrapper** - prevents cascade re-renders
2. **useMemo on overlay content** - prevents DragOverlay re-renders
3. **useCallback on handlers** - referential stability
4. **useMemo on computed arrays** - prevents unnecessary array allocations
5. **Profile with React DevTools** - identify remaining bottlenecks

## References

- [freeCodeCamp - Optimize Graphical React Codebase](https://www.freecodecamp.org/news/how-to-optimize-a-graphical-react-codebase/)
- [dnd-kit Issue #389 - re-renders](https://github.com/clauderic/dnd-kit/issues/389)
- [dnd-kit Issue #1379 - useSortable re-renders](https://github.com/clauderic/dnd-kit/issues/1379)
- [Alex Reardon - Dragging React Performance Forward](https://medium.com/@alexandereardon/dragging-react-performance-forward-688b30d40a33)
