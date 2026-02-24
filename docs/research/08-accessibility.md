# Accessibility in Drag and Drop

## WCAG Requirements

| Criterion | Level | Requirement |
|-----------|-------|-------------|
| 2.1.1 Keyboard | A | All DnD functionality operable via keyboard |
| 2.5.7 Dragging Movements | AA (WCAG 2.2) | Non-dragging alternative must exist |
| 2.4.7 Focus Visible | AA | Persistent visible keyboard focus indicators |
| 2.5.5 Target Size | AAA | 44-48px minimum click/touch targets |
| 1.4.11 Non-text Contrast | AA | Drag handles: 3:1 contrast ratio minimum (6.7:1 recommended) |
| 4.1.2 Name, Role, Value | A | ARIA attributes for assistive tech |

## Keyboard Interaction Pattern

The standard keyboard DnD flow:

1. **Tab** - Navigate to draggable items
2. **Enter/Space** - Pick up / grab an item (enter drag mode)
3. **Arrow keys** - Move the item to valid positions
4. **Tab** - Navigate between drop targets (skip invalid ones)
5. **Enter/Space** - Drop the item
6. **Escape** - Cancel the drag

## ARIA Attributes

### On Draggable Items
```html
<div
  role="button"
  aria-grabbed="true|false"
  aria-describedby="drag-instructions"
  tabindex="0"
>
```

### On Drop Zones
```html
<div
  aria-dropeffect="move|copy|link"
>
```

### Instructions
```html
<div id="drag-instructions" class="sr-only">
  Press Enter to pick up. Use arrow keys to move. Press Enter to drop. Press Escape to cancel.
</div>
```

### Live Region for Announcements
```html
<div aria-live="polite" role="status" class="sr-only">
  <!-- Dynamically updated with state changes -->
</div>
```

## Screen Reader Announcements

### What to announce (from Adobe React Aria)

| Event | Announcement |
|-------|-------------|
| Drag start | "Started dragging [card name]. Press arrow keys to move, Enter to drop, Escape to cancel." |
| Over drop zone | "[Card name] is over [zone name]." |
| Drop success | "[Card name] dropped on [zone name]." |
| Drop cancel | "Drag cancelled. [Card name] returned to [original zone]." |
| Invalid target | "Cannot drop [card name] here." |

### Best Practices
- Filter navigation during drag so only valid drop targets are reachable
- Announce successful drops AND cancellations
- Hide non-relevant elements from screen readers during drag mode
- Adapt for touch screen readers (swipe + double-tap patterns)

## The 10 Essentials

1. **Full keyboard navigation** with `tabindex`
2. **Semantic HTML and ARIA** attributes
3. **Clear visual AND audio feedback**
4. **Multiple input methods** (mouse, touch, keyboard)
5. **High contrast** (4.5:1 for text, 3:1 for graphics)
6. **Visible focus** (`aria-activedescendant`, `aria-selected`)
7. **Clear instructions and labels**
8. **Screen reader announcements** via ARIA live regions
9. **Cancellation** (Escape) and **undo** (Ctrl+Z)
10. **Test with assistive tech** (JAWS, NVDA, VoiceOver, Narrator)

## Non-Drag Alternatives (WCAG 2.5.7)

WCAG 2.2 criterion 2.5.7 requires that any action achievable by dragging can also be done without dragging. Options:

### For card games
- **Context menu**: Right-click / long-press → "Move to [zone]"
- **Keyboard shortcuts**: e.g., "1" to select card, "G" to move to grid, "H" to hand
- **Action buttons**: Small buttons on cards for common moves
- **Dialog picker**: "Move this card to:" with zone list

### Industry approach
- Atlassian recommends **action menus** rather than replicating full DnD via keyboard
- Zendesk provides **"Move to position"** menu option alongside drag

## Current Implementation Assessment

### What we have
- `announcements` object with `onDragStart`, `onDragOver`, `onDragEnd`, `onDragCancel`
- `KeyboardSensor` with `sortableKeyboardCoordinates`
- ARIA attributes spread from dnd-kit hooks (`...attributes`)
- `handleDragCancel` restores snapshot

### What's missing
1. **Announcements use UUIDs** - not meaningful to screen readers. Should use card names/titles
2. **No visible focus indicators** specific to DnD
3. **No non-drag alternative controls** (buttons/menus for moving cards) - WCAG 2.5.7 violation
4. **No `aria-describedby` instructions** explaining how to use DnD
5. **No contrast verification** on drag handles
6. **No `prefers-reduced-motion`** support
7. **No testing with assistive technologies** documented

## Improvement Opportunities

### Quick wins
1. Fix announcements to use card names instead of UUIDs
2. Add `aria-describedby` instructions for DnD
3. Add visible focus ring on keyboard-focused draggable items

### Medium effort
4. Add `prefers-reduced-motion` support
5. Improve focus management during drag (skip invalid targets)

### Larger (WCAG 2.5.7 compliance)
6. Add context menu "Move to [zone]" option on cards
7. Add keyboard shortcuts for common card movements
8. Test with JAWS, NVDA, VoiceOver

## References

- [Adobe React Aria - Accessible DnD](https://react-aria.adobe.com/blog/drag-and-drop)
- [10 Tips for Accessible DnD](https://www.fleexy.dev/blog/10-tips-for-accessible-drag-and-drop-interfaces/)
- [W3C - ARIA DnD Best Practices](https://www.w3.org/wiki/PF/ARIA/BestPractices/DragDrop)
- [TPGi - Road to Accessible DnD](https://www.tpgi.com/the-road-to-accessible-drag-and-drop-part-2/)
- [Atlassian - Pragmatic DnD Accessibility](https://atlassian.design/components/pragmatic-drag-and-drop/accessibility-guidelines/)
