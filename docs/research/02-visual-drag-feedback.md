# Visual Drag Feedback Best Practices

## The Seven Visual States

Every drag interaction should have designed states for:

| State | What happens | Visual feedback |
|-------|-------------|-----------------|
| **Default** | Item at rest | Visible drag affordance (handle, cursor) |
| **Hover** | Cursor over draggable | Cursor: `grab`, subtle highlight |
| **Grabbed** | User clicks/holds | Cursor: `grabbing`, elevation + shadow, slight scale-up |
| **In Motion** | Dragging across screen | Ghost at origin, lifted item follows cursor |
| **Over Valid Target** | Item hovers drop zone | Drop zone highlights, nearby items shift |
| **Drop Success** | Item released on target | Snap animation (~100ms), confirmation |
| **Drop Cancel** | Item released off target | Snap-back to origin (~100ms) |

## Ghost / Drag Preview

### What industry leaders do
- **Leave a ghost/placeholder** at the original position so users track where things came from
- Ghost should be **semi-transparent** (40-50% opacity)
- Drag preview should be **anchored to cursor/finger**
- For large items: collapse into compact summary during transit
- For small items (cards): move directly at full size

### Current implementation
- DragItem: opacity 0.4 (good)
- SortableItem: opacity 0.5 (good)
- DragOverlay shows card image at cursor (good)

### What's missing
- No visible "empty slot" indicator where the card was (just faded card)
- Consider dashed border or explicit placeholder at origin

## Elevation & Lift Effect

When grabbed, objects should visually "lift" toward the user:

1. **Drop shadow** - suggests floating above surface (most important)
2. **Subtle scale-up** - 105-110% size increase creates "lift" sensation
3. **Slight rotation/tilt** - like Trello's famous jaunty card angle during drag
4. **Outline/border change** - reinforces "selected" state

### Card game examples
- **Hearthstone**: Cards exhibit "air resistance" during drag, creating weight
- **Slay the Spire**: Cards have streaks/trails when moved
- **Marvel Snap**: Cards visually lift and cast shadow

### Current implementation
- No drop shadow on DragOverlay
- No scale/tilt effect
- No elevation change
- The drop animation has a nice bounce easing (`cubic-bezier(0.18, 0.67, 0.6, 1.22)`) but the pick-up has no corresponding effect

## Cursor Changes

Standard pattern:
- **Hover over draggable**: `cursor: grab` (open hand)
- **During drag**: `cursor: grabbing` (closed fist)
- Platform-standard cursors preferred over custom

### Current implementation
- Correctly implements grab/grabbing cursor change (good)

## Motion & Animation

### Timing
- **100ms** transitions with easing for snapping into place
- Background objects should animate **before release** (anticipatory movement)
- Use `cubic-bezier(0.25, 1, 0.5, 1)` for natural feeling

### Performance
- Use CSS `transform` (not `top`/`left`) for 60fps
- Apply `will-change: 'transform'` for hardware acceleration
- Respect `prefers-reduced-motion` - substitute fades for motion-sensitive users

### Current implementation
- Uses CSS transforms correctly (good)
- 250ms transition duration
- No `prefers-reduced-motion` support
- No anticipatory movement of surrounding items

## The Drag Preview Should React

The ghost/overlay should change based on context:
- **Over valid drop zone**: Preview shows where item will land
- **Over invalid zone**: Preview changes to indicate rejection
- **Near items**: Nearby elements animate to make room
- Cards in digital card games should **snap to zones** with satisfying animation

## Card-Game-Specific Visual Patterns

### Hearthstone
- Cards have "air resistance" during drag (slight physics lag)
- Minions create **shockwaves and craters** on board impact
- Sound effects reinforce every interaction

### MTG Arena
- Playable cards show **blue outline** (castability indicator)
- Lands highlight to show auto-tap during drag
- Cards condense to minimal form on board

### Slay the Spire
- Oversized hitboxes prevent misdirects
- Exaggerated spell effects make cards feel weighty
- Players can act before animations complete (never waiting)

### Legends of Runeterra
- Cards barely peek from screen edge; hover fans them up
- Minimalist board maximizes card visibility

## Improvement Opportunities for Our Implementation

### Quick wins
1. Add `box-shadow` to DragOverlay for floating effect
2. Add `transform: scale(1.05)` on DragOverlay for lift sensation
3. Add transition fade on drop zone highlights (not instant appear)
4. Add `prefers-reduced-motion` media query support

### Medium effort
5. Show dashed-border placeholder where card was lifted from
6. Add slight rotation (2-3 degrees) to DragOverlay during motion
7. Animate surrounding items shifting to make room

### Larger
8. Sound effects on grab, hover-over-zone, drop
9. Physics-based lag on drag overlay for "weight" feel

## References

- [Smart Interface Design Patterns - DnD UX](https://smart-interface-design-patterns.com/articles/drag-and-drop-ux/)
- [Pencil & Paper - DnD UX Design](https://www.pencilandpaper.io/articles/ux-pattern-drag-and-drop)
- [NNGroup - DnD Design for Ease of Use](https://www.nngroup.com/articles/drag-drop/)
- [BricxLabs - 15 DnD UI Design Tips](https://bricxlabs.com/blogs/drag-and-drop-ui)
- [Final Boss Blues - On Hearthstone's UI](https://finalbossblues.com/on-hearthstones-ui/)
- [Cloudfall Studios - Slay the Spire UI](https://www.cloudfallstudios.com/blog/2018/2/20/flash-thoughts-slay-the-spires-ui)
