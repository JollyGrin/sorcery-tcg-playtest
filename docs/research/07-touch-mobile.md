# Touch & Mobile Drag and Drop

## Critical Considerations

### Touch Target Sizing
- **Minimum**: 44x44px (WCAG AAA) to 48x48px for drag handles/targets
- At least **1cm x 1cm** of unused space for touch interactions
- Fingers must **not obscure** important feedback during drag

### Distinguishing Scroll from Drag
The fundamental mobile DnD challenge. Two strategies:

1. **Delay-based**: Touch and hold in same position for ~250ms activates drag. Quick touch or immediate finger movement = scroll.
2. **Distance-based**: Small initial movement (5-10px) activates drag regardless of hold duration.
3. **These are mutually exclusive in dnd-kit's touch sensor**

Our current approach: 250ms delay + 5px tolerance (correct standard pattern).

### CSS Requirements
```css
/* On draggable elements */
touch-action: manipulation;
```
This prevents browser default behaviors (pinch-zoom, double-tap-zoom) from interfering with drag interactions.

### No Hover States
Touch devices have no hover. Implications:
- Can't rely on hover to reveal drag affordances
- Must use press-and-hold visual feedback instead
- Drag handles should be always-visible on touch devices
- Give clear grabbed-state feedback (elevation, scaling, opacity)

## Haptic Feedback

### When to use
- Short **haptic bump** when user grabs an object
- **Subtle pulse** when moving over valid drop zones
- **Confirmation bump** on successful drop

### Duration
- Keep haptic pulses **10-20 milliseconds** for best responsiveness
- Longer vibrations feel sluggish

### Implementation
```typescript
// Web Vibration API
navigator.vibrate(15); // 15ms buzz
```
Note: Web Vibration API support varies. Works on Android Chrome, not on iOS Safari.

## Always Provide Alternatives

**Drag-and-drop should NOT be the only method on mobile.**

### Fallback patterns
- **Swipe-to-move** gestures
- **Up/down arrow** buttons
- **"Move to"** action buttons / menus
- **Context menu** with zone options

### Industry examples
- **Gmail**: Removes drag-drop on mobile entirely, uses menus (lower error rates)
- **Apple iOS**: Long-press to enter "jiggle mode", then drag (clear mode switch)
- **Material Design**: Swipe + hold-and-drag for cards

## Mobile-Specific Layout Considerations

### From Marvel Snap
- Interactive elements toward **bottom half of screen** for thumb reach
- Cards take visual hierarchy precedence on small screens

### From MTG Arena Mobile
- Long-press for card detail
- Tap to assign (not just drag)
- Scroll left/right for selection
- Accidental selections = known friction point

### General
- Larger touch targets than desktop
- More spacing between interactive elements
- Consider portrait vs landscape orientation
- Test on actual devices (simulators miss touch nuances)

## Platform Guidelines

### Apple Human Interface Guidelines
- Drag initiated by **long-press** (with timing to distinguish from tap)
- Haptic feedback expected
- Minimum 1cm x 1cm touch targets
- Must provide alternative interaction methods
- Fingers should never obscure critical feedback

### Material Design
- Cards: swipe to dismiss, hold-and-drag to reorder
- `ItemTouchHelper` for RecyclerView interactions
- Configurable drag direction restrictions

## Current Implementation Assessment

### What we have
- Touch sensor: 250ms delay + 5px tolerance (correct)
- Pointer sensor: 5px distance constraint (correct)
- Keyboard sensor: configured (correct)

### What's missing
1. No haptic feedback
2. No explicit mobile fallback controls (buttons/menus)
3. No `touch-action: manipulation` CSS (need to verify)
4. No mobile-specific layout adaptations
5. No testing on actual mobile devices documented

## Improvement Opportunities

### Quick wins
1. Add `touch-action: manipulation` CSS to draggable elements
2. Verify touch targets are at least 44x44px

### Medium effort
3. Add haptic feedback via Vibration API (Android)
4. Test thoroughly on real mobile devices

### Larger
5. Add alternative controls for card movement (context menu "Move to...")
6. Mobile-specific layout adjustments (larger cards, bottom-oriented controls)
7. Consider separate mobile interaction mode

## References

- [Smart Interface Design Patterns - DnD UX](https://smart-interface-design-patterns.com/articles/drag-and-drop-ux/)
- [NNGroup - DnD Design for Ease of Use](https://www.nngroup.com/articles/drag-drop/)
- [dnd-kit Touch Sensor docs](https://docs.dndkit.com/api-documentation/sensors/touch)
- [Apple HIG - Drag and Drop](https://developer.apple.com/design/human-interface-guidelines/drag-and-drop)
- [Material Design - Gestures](https://m2.material.io/design/interaction/gestures.html)
- [BricxLabs - 15 DnD UI Design Tips](https://bricxlabs.com/blogs/drag-and-drop-ui)
