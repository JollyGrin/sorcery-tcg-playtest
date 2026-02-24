# Reordering Cards in Slots

## Two Approaches

### 1. Static Position with Indicators
- Original item stays put but is highlighted
- A thin line/marker shows where the item will land
- Best for structured content (tables, grids) where 3D movement would be confusing

### 2. Immersive Movement (what we use)
- Item is removed from position and follows cursor
- Other items dynamically shift to make room
- More engaging; best for cards and interactive content
- **This is the correct approach for a card game**

## Grid-Specific Reordering

### dnd-kit Sorting Strategies

| Strategy | Use case | Our usage |
|----------|----------|-----------|
| `rectSortingStrategy` | Fixed-size grid cells | Main board (0-19) |
| `horizontalListSortingStrategy` | Horizontal lists | Hand/footer |
| `verticalListSortingStrategy` | Vertical lists | Not used |
| Custom (empty function) | Variable-size items | Not used |

### How Same-Container Reorder Works (current)
1. `handleDragOver` **skips** if same container (SortableContext handles visual reordering internally)
2. `handleDragEnd` detects same container
3. Uses `arrayMove(array, fromIndex, toIndex)` to reorder
4. State updates with reordered array

### The Intent Signal
When should items reshuffle?
- **Edge-to-edge contact**: Too sensitive, causes jitter
- **Center-to-edge**: Better - the dragged item's CENTER must cross the TARGET's EDGE before reshuffling triggers
- dnd-kit handles this via collision detection, but the specific algorithm matters

## Animation Best Practices

### Timing
- **Base duration**: 250ms for single-position moves (our current setting)
- **Distance scaling**: Add incremental duration for longer moves
- **Easing**: `cubic-bezier(0.25, 1, 0.5, 1)` for natural motion (current: `cubic-bezier(0.18, 0.67, 0.6, 1.22)` with bounce overshoot)

### Our `animateLayoutChanges` Function
```typescript
const animateLayoutChanges: AnimateLayoutChanges = (args) => {
  const { isSorting, wasDragging } = args;
  if (isSorting || wasDragging) {
    return defaultAnimateLayoutChanges(args);
  }
  return false;
};
```
This correctly limits animations to sorting/post-drag contexts only. Items won't animate on unrelated state changes.

## Card Game Reordering Patterns

### Hearthstone
- Choose insertion position when dragging minion to board (between existing minions)
- Once placed, minions **cannot be repositioned** (deliberate design choice)
- Board positioning is a strategic element

### Legends of Runeterra
- Rearranging attack order through drag was **historically difficult**
- Units in attack row couldn't be easily reordered without removing all and re-dragging
- A documented UX pain point - lesson: make reordering frictionless

### Slay the Spire
- Cards in hand can be played in any order
- No board reordering needed (cards are played and discarded)
- Focus on speed: players can act before animations complete

## The Legends of Runeterra Lesson

**Critical takeaway**: LoR's biggest UX complaint was that reordering units already on the board was painful. Users had to remove all units and re-drag them. This directly mirrors potential issues in our implementation where:
- Cards in grid slots may be hard to rearrange
- The interaction cost of "pick up → move to new slot → items shift" must be low
- Reordering should feel instantaneous and forgiving

## Alternatives to Pure Drag Reordering

User research shows button-based controls (up/down arrows) tested as the **fastest** and most universally accessible reordering method. Drag-and-drop should be an **enhancement on top of** always-available alternatives:

1. **Drag-and-drop**: Primary for sighted mouse/touch users
2. **Arrow buttons**: Fastest across all user groups
3. **Number input**: Good for keyboard users
4. **Context menu**: "Move to position X" option

For a card game, drag-and-drop is the expected primary interaction, but keyboard shortcuts should be considered for accessibility.

## Current Implementation Assessment

### What works
- `rectSortingStrategy` for 5x4 grid (correct)
- `horizontalListSortingStrategy` for hand (correct)
- `animateLayoutChanges` customization prevents spurious animations (good)
- `arrayMove` for same-container reordering (standard approach)

### Potential issues
- Cross-container vs same-container detection complexity (dual ID system)
- No visual feedback during same-container reorder beyond SortableContext's built-in shifting
- No explicit empty-slot indicators when card is lifted

## Improvement Opportunities

1. Ensure items shift smoothly with clear animation during reorder
2. Add visual indicator at insertion point (line or gap)
3. Consider making aura positions reorderable if they aren't already
4. Test that reordering multiple cards in sequence doesn't cause state issues

## References

- [dnd-kit Sortable docs](https://docs.dndkit.com/presets/sortable)
- [Darin Senneff - Designing a Reorderable List](https://www.darins.page/articles/designing-a-reorderable-list-component)
- [Julik Tarkhanov - UI algorithms: drag-reordering](https://blog.julik.nl/2022/10/drag-reordering)
- [LoR attack order UI complaint](https://devtrackers.gg/legends-of-runeterra/p/15a69342-attack-order-matters)
