# Improvement Roadmap

Prioritized list of improvements based on all research. Organized by effort level and impact.

## Tier 1: Quick Wins (High Impact, Low Effort)

### Performance
- [ ] Wrap `SortItemWrapper` in `React.memo`
- [ ] Memoize DragOverlay content with `useMemo`
- [ ] Wrap event handlers in `useCallback`
- [ ] Memoize computed arrays (`gridItems.slice(0, 20).reverse()`, sorted item lists)

### Visual Feedback
- [ ] Add `box-shadow` to DragOverlay for floating/elevation effect
- [ ] Add `transform: scale(1.05)` on DragOverlay for lift sensation
- [ ] Add CSS transition (100ms) on drop zone highlight appearance (not instant on/off)
- [ ] Add `prefers-reduced-motion` media query support

### Code Quality
- [ ] Extract grid zone indices into named constants/enum (no more magic numbers)
- [ ] Verify `touch-action: manipulation` on all draggable elements

## Tier 2: Medium Effort (High Impact)

### Drop Zone Indication
- [ ] **Reveal all valid drop zones** when any drag starts (not just on hover)
- [ ] Show different visual states for valid vs invalid targets
- [ ] Add card silhouette/outline preview at target position
- [ ] Differentiate zone types visually (aura slots vs grid cells vs hand)

### Visual Polish
- [ ] Add dashed-border placeholder where card was lifted from
- [ ] Add slight rotation (2-3 degrees) on DragOverlay during motion
- [ ] Animate surrounding items shifting to make room at drop target

### Collision Detection
- [ ] Enhance with `pointerWithin` as primary strategy, current approach as fallback
- [ ] Make footer height detection dynamic (not hardcoded)

### Accessibility
- [ ] Fix announcements to use card names instead of UUIDs
- [ ] Add `aria-describedby` instructions for DnD
- [ ] Add visible focus ring on keyboard-focused draggable items
- [ ] Add `prefers-reduced-motion` support (substitute fades for motion)

### Architecture
- [ ] Unify dual ID system (aura `"{gridIndex}-{index}"` vs card UUID) with type discriminator

## Tier 3: Larger Improvements (High Impact, High Effort)

### Accessibility (WCAG 2.5.7 Compliance)
- [ ] Add context menu "Move to [zone]" option on cards (non-drag alternative)
- [ ] Add keyboard shortcuts for common card movements
- [ ] Test with JAWS, NVDA, VoiceOver

### Mobile
- [ ] Add haptic feedback via Vibration API
- [ ] Add fallback controls for card movement (context menu)
- [ ] Mobile-specific layout adjustments (larger targets, bottom-oriented)
- [ ] Test on real mobile devices

### Game Feel
- [ ] Sound effects on grab, hover-over-zone, drop
- [ ] Physics-based lag on drag overlay for "weight" feel (Hearthstone style)
- [ ] Snap-to-zone animation polish

### Alternative Input
- [ ] Click-to-select then click-to-place (Slay the Spire style)
- [ ] Keyboard shortcuts for card zones

## Architecture Decisions to Make

### 1. Should we unify the DragItem / SortableItem split?
The dual ID system (aura `"{gridIndex}-{index}"` vs card UUID) adds complexity to every handler. Options:
- **Unify**: All items use UUIDs, with zone info in data attributes
- **Keep separate**: Auras are fundamentally different from regular cards
- **Recommendation**: Unify with type discriminator in data attributes

### 2. Should we integrate Layout.tsx preview with DragOverlay?
Currently two separate preview systems. Options:
- **Integrate**: One system handles all previews
- **Keep separate**: Layout preview serves different purpose
- **Recommendation**: Investigate if they can share code

### 3. Should we add zone-aware drag constraints?
Currently any card can be dragged anywhere. Options:
- **Constrain**: Auras only to aura slots, creatures only to board
- **Free-form**: Keep current flexibility (sandbox approach)
- **Recommendation**: Depends on game rules - if invalid moves exist, constrain them

### 4. Should we add undo/redo?
Card games benefit from undo for accidental moves. Options:
- **Command pattern**: Track all moves, support undo/redo stack
- **Snapshot per move**: Keep last N snapshots
- **None**: Users manage their own board state
- **Recommendation**: At minimum, keep the current snapshot-on-cancel

## Key Lessons from Research

1. **Hearthstone principle**: The interface should feel tangible and physical, not invisible
2. **Slay the Spire principle**: Never block the player - UI should never make them wait
3. **LoR lesson**: Make reordering frictionless from day one (their biggest complaint)
4. **NNGroup**: Drag-and-drop should enhance, not replace, always-available controls
5. **Atlassian**: Use action menus for accessibility rather than replicating full DnD via keyboard
6. **Performance**: React.memo + useMemo + useCallback = 2x performance improvement
7. **Fitts's Law**: Larger targets are easier to hit - extend active zones beyond visible borders
