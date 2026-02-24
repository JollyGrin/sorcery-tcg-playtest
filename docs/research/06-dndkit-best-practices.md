# dnd-kit Best Practices

## DragOverlay

- **Always keep `<DragOverlay>` mounted** in the DOM. Conditionally render only the *children*, never the component itself - otherwise drop animations break.
- Components inside `<DragOverlay>` must **NOT** use `useDraggable` hook.
- Use **presentational component pattern**: create decoupled components that don't import @dnd-kit, then wrap one with `useDraggable` and render the other inside `<DragOverlay>`.
- Render `<DragOverlay>` via `createPortal` to `document.body` for z-index management.
- **Memoize overlay content** with `useMemo` to prevent re-renders.
- Default drop animation: 250ms with `ease`. Customizable via `dropAnimation` prop (`duration`, `easing`, `keyframes`, `sideEffects`).

## Collision Detection

| Algorithm | Behavior | Best for |
|-----------|----------|----------|
| `rectIntersection` | Requires rectangular overlap | Default, general purpose |
| `closestCenter` | Center-to-center distance | Sortable lists (forgiving) |
| `closestCorners` | Prevents false positives in stacked layouts | Kanban boards, layered grids |
| `pointerWithin` | High precision pointer-based | Primary strategy when pointer is reliable |

### Composition Pattern
Compose multiple algorithms: use `pointerWithin` as primary, fall back to `rectIntersection` for keyboard users. This gives best precision for mouse while maintaining keyboard accessibility.

### Our Current Approach
Custom collision function that switches between `closestCenter` (footer) and `closestCorners` (grid) based on Y position. This works but:
- Footer height is hardcoded - could be dynamic
- Could benefit from `pointerWithin` as primary with current approach as fallback

## Sorting Strategies

- `rectSortingStrategy` is default for grid layouts - does NOT support virtualized lists
- Items passed to `SortableContext` **must be sorted in same order they render**
- For unpredictable layouts (variable-size items): pass empty function as strategy and change order in `onDragOver` instead of `onDragEnd`

## Sensor Configuration

### Pointer Sensor
- Small distance constraint (5px) prevents accidental drags
- Our current: 5px distance (correct)

### Touch Sensor
- `distance` and `delay` activation constraints are **mutually exclusive**
- Typical: 250ms delay with 5px tolerance
- Set CSS `touch-action: manipulation` on draggable elements
- Our current: 250ms delay + 5px tolerance (correct)

### Keyboard Sensor
- Use `sortableKeyboardCoordinates` for grid/list navigation
- Arrow keys for movement, Enter/Space for grab/release, Escape for cancel
- Our current: configured with sortable coordinates (correct)

## Multi-Container Pattern

### Architecture
1. `DndContext` wraps everything
2. Multiple `SortableContext` providers, one per container
3. `DragOverlay` rendered outside containers
4. State tracks all containers with items

### Event Handler Pattern
- **onDragOver**: Detect cross-container moves, immediately update state (live visual feedback). Ignore same-container moves (SortableContext handles internally).
- **onDragEnd**: Handle same-container reordering with `arrayMove`. Cross-container already handled by onDragOver.
- **onDragCancel**: Restore snapshot.

### Our Implementation
This pattern is correctly implemented in `useHandleDrag.ts`. The main complexity comes from the dual ID system (aura DragItem IDs vs card UUIDs).

## Performance

### Memoization (Most impactful)
- `React.memo` on draggable item components
- `useMemo` for computed values (overlay content, sorted lists)
- `useCallback` for event handlers (referential stability)
- Research showed ~2x drag performance improvement from proper memoization

### CSS Optimization
- Use `transform` not `top`/`left` for positioning
- Apply `will-change: 'transform'` for hardware acceleration
- Use `opacity` for fade effects

### Batch Updates
- `unstable_batchedUpdates` for grouping multiple state changes
- When updating multiple items after drop, batch

### Known Performance Issues
- `useSortable` re-renders ALL items even on a simple click (#1379)
- Every cross-container drag re-renders all draggable/droppable components
- The experimental branch specifically targets these

### Our Current State
- Uses `useRef` for mutable state (correct - avoids re-renders)
- CSS transforms (correct)
- **Missing**: React.memo on SortItemWrapper, useMemo for overlay, useCallback for handlers

## Accessibility

### Built-in Support
dnd-kit provides:
- Keyboard sensor with arrow key navigation
- ARIA attributes via `useDraggable`/`useSortable` `attributes` spread
- `announcements` prop on `DndContext` for screen reader announcements

### Our Announcements
Currently use card IDs (UUIDs) in announcements - not meaningful to screen readers. Should use card names/titles.

### Missing
- No visible focus indicators specific to drag-and-drop
- No non-drag alternative controls (buttons for moving cards)
- No `aria-describedby` instructions

## Common Mistakes to Avoid

1. **Mounting/unmounting DragOverlay** - breaks drop animations
2. **Using useDraggable inside DragOverlay** - conflicts with internal state
3. **Not memoizing overlay content** - causes re-renders
4. **Mismatched item order** between SortableContext items and render order
5. **Using both `distance` and `delay`** on touch sensor (mutually exclusive)
6. **Not handling stale closures** in event handlers (use refs for mutable state)
7. **Forgetting `touch-action: manipulation`** CSS on touch draggables

## References

- [dnd-kit DragOverlay docs](https://dndkit.com/api-documentation/draggable/drag-overlay)
- [dnd-kit Collision Detection docs](https://dndkit.com/api-documentation/context-provider/collision-detection-algorithms)
- [dnd-kit Sortable docs](https://docs.dndkit.com/presets/sortable)
- [dnd-kit Touch Sensor docs](https://docs.dndkit.com/api-documentation/sensors/touch)
- [dnd-kit Multiple Containers example](https://github.com/clauderic/dnd-kit/blob/master/stories/2%20-%20Presets/Sortable/MultipleContainers.tsx)
- [dnd-kit Issue #389 - re-renders](https://github.com/clauderic/dnd-kit/issues/389)
- [dnd-kit Issue #1379 - useSortable re-renders](https://github.com/clauderic/dnd-kit/issues/1379)
