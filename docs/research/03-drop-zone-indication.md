# Drop Zone Indication Patterns

## Drop Zone Visual States

Drop zones should have multiple distinct visual states:

| State | When | Visual |
|-------|------|--------|
| **Empty/Default** | No drag active, zone has no content | Dotted/dashed border, subtle background |
| **Hidden** | Zone not visible until drag starts | Invisible |
| **Revealed** | Drag starts anywhere | All valid targets become visible/highlighted |
| **Active/Hover** | Dragged item is over this zone | Intensified highlight (color, border, glow) |
| **Disabled** | This zone is not a valid target | Greyed out, faded |
| **Contentful** | Zone already contains items | Standard appearance with content |

## Highlighting Techniques

### 1. Background Color Change
Most common pattern. Zone background shifts color when item hovers.
- **Green** for valid (universal convention)
- **Red** for invalid
- **Blue** for neutral "active"
- Should fade in (~100ms transition), not appear instantly

### 2. Border Change
Border becomes solid, changes color, or increases width.
- Current implementation: `border-2 border-green-400` on hover (good basic approach)
- Could add transition for smoother appearance

### 3. Glow/Shadow Effect
Subtle glow around target area. More premium feel.
- `box-shadow: 0 0 8px rgba(34, 197, 94, 0.5)` style approach

### 4. Expansion
Drop zone slightly expands when active.
- Creates a "magnetic" pull effect
- Per Fitts's Law: larger targets are easier to hit

### 5. Preview Animation
Shows where the item will snap into place.
- Ghost/outline of card appears in the target position
- Most sophisticated but most helpful

### 6. Drop Indicator Lines (for lists)
Thin line between items showing insertion point.
- Atlassian recommends line terminal "bleeds 4px outward" on left side
- Use 2-4px line thickness
- Color contrast against background

## The "Reveal on Drag Start" Pattern

**Critical pattern our implementation is missing:**

When ANY drag begins, ALL valid drop zones should become visually apparent - not just the one being hovered. This gives users immediate understanding of where they can drop.

### How to implement
- On `handleDragStart`: Add a CSS class to all valid drop targets
- Show subtle dashed borders or slight background tint on ALL valid zones
- On `handleDragOver` of specific zone: Intensify to full highlight
- On `handleDragEnd` / `handleDragCancel`: Remove all highlights

### Industry examples
- **Trello**: Column backgrounds subtly shift when dragging a card
- **Figma**: Alignment guides appear as you move objects
- **Hearthstone**: Board area glows when dragging a minion from hand
- **MTG Arena**: Battlefield highlights when dragging a card to play

## Magnetic Snapping / Fitts's Law

- Extend active drop zones **slightly beyond visible borders** to create magnetic effect
- Use dotted/dashed borders to signify safe drop areas
- The **center** of the dragged item should overlap the **edge** of another item before triggering reshuffle (stronger intent signal than edge-to-edge)

## Invalid Zone Feedback

Don't just ignore invalid zones - actively communicate invalidity:
- Grey out or fade invalid targets
- Change cursor to `not-allowed`
- Optional: subtle shake or red flash if user tries to drop on invalid zone
- Snap-back animation to original position

## Current Implementation Assessment

### What we have
- Green border overlay on `isOver` (DroppableGridItem)
- Background shifts from gray-200 to green-200 on hover
- Grid numbers visible in cells (opacity-25)

### What's missing
1. **No "reveal all zones" on drag start** - zones only highlight individually on hover
2. **No transition/animation** on highlight appearance - it's instant on/off
3. **No invalid zone indication** - no visual difference between "not hovering" and "can't drop here"
4. **No preview of landing position** - just a color change
5. **No zone-type differentiation** - all zones look the same during drag regardless of what makes sense (e.g., aura slot vs main grid vs hand)

## Improvement Opportunities

### Quick wins
1. Add CSS transition on border and background color changes (100ms ease)
2. Differentiate zone types visually (aura slots vs grid cells vs hand)

### Medium effort
3. Show all valid drop zones when drag starts (not just on individual hover)
4. Add card silhouette/outline preview in target zone
5. Grey out invalid zones during drag

### Larger
6. Animate items shifting to make room at drop target
7. Zone-aware drag constraints (e.g., auras can only go to aura slots)

## References

- [Zendesk Garden - DnD Pattern](https://garden.zendesk.com/patterns/drag-and-drop/)
- [Cloudscape Design System - DnD](https://cloudscape.design/patterns/general/drag-and-drop/)
- [Atlassian Design - Pragmatic DnD Guidelines](https://atlassian.design/components/pragmatic-drag-and-drop/design-guidelines/)
- [Darin Senneff - Designing a Reorderable List](https://www.darins.page/articles/designing-a-reorderable-list-component)
