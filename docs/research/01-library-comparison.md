# Drag & Drop Library Comparison

## Current Choice: @dnd-kit

**Verdict: Correct choice for this project. No migration needed.**

dnd-kit remains the best fit because:
1. Supports both grid and list layouts (board + hand)
2. Collision detection composability is crucial for grid-to-footer interaction
3. Built-in sortable presets work for card reordering
4. Codebase is already deeply integrated
5. Active (though slow) maintenance with major refactor in progress

## Comparison Matrix

| Feature | dnd-kit | pragmatic-dnd (Atlassian) | hello-pangea/dnd | react-dnd | formkit/dnd |
|---------|---------|--------------------------|------------------|-----------|-------------|
| **Grid support** | Yes | Yes | No (lists only) | Yes | Limited |
| **Bundle size** | Moderate | ~4.7kB core | Heavy | Moderate | ~5kB |
| **Customization** | Excellent | Excellent | Limited | Excellent | Limited |
| **Accessibility** | Built-in | Manual | Built-in | Manual | Limited |
| **Touch support** | Built-in sensors | Native HTML5 | Built-in | Backend-dependent | Partial |
| **Animation** | Built-in + customizable | Manual | Built-in (polished) | Manual | Basic |
| **Multi-container** | First-class | Supported | Lists only | Supported | Basic |
| **Learning curve** | Moderate | Steep | Low | High | Low |
| **Cross-window drag** | No | Yes | No | Yes (HTML5 backend) | No |
| **Framework** | React only | Any | React only | React only | React/Vue |
| **License** | MIT | Apache 2.0 | MIT | MIT | MIT |
| **Status** | Active (slow releases) | Active | Maintained fork | Aging | Early (v0.3) |

## Library Details

### @dnd-kit (current)
- **Approach**: Lightweight modular toolkit with customizable building blocks
- **Strengths**: Composable collision detection, custom animations, accessibility, grid+list support
- **Weaknesses**: More boilerplate, re-render issues at scale (useSortable re-renders all items on click), no cross-window drag
- **Maintenance note**: Author (Clauderic Demers) working on major `experimental` branch refactor targeting framework agnosticism, performance, plugin system. But releases have slowed significantly.

### pragmatic-drag-and-drop (Atlassian)
- **Approach**: Headless, built on native HTML5 drag-and-drop API
- **Strengths**: Smallest bundle, framework-agnostic, high performance, cross-window support, file drops
- **Weaknesses**: Sparse docs, steeper learning curve, more code required, limited built-in visual feedback, Apache 2.0 license
- **Notable**: This is what powers Trello, Jira, Confluence

### hello-pangea/dnd (fork of react-beautiful-dnd)
- **Approach**: High-level abstraction for list-based DnD
- **Strengths**: Polished natural-feeling interactions, low barrier to entry, battle-tested
- **Weaknesses**: Lists only (NO grid support - disqualifying for us), heavy bundle, limited customization

### react-dnd
- **Approach**: Low-level building blocks using HTML5 DnD backend
- **Strengths**: Very flexible for complex custom interactions
- **Weaknesses**: Complex API, significant boilerplate, aging architecture, declining community

### formkit/drag-and-drop
- **Approach**: Lightweight state-driven (~5KB gzipped)
- **Strengths**: Minimal setup, simple hook API, plugin system
- **Weaknesses**: Early-stage (v0.3), limited docs, inconsistent mobile accessibility

### Gridstack.js
- **Approach**: Purpose-built for grid layouts with resizable items
- **Strengths**: Complete grid features, 11+ years stable, resizable items
- **Weaknesses**: Steep React learning curve, jQuery origins, limited to grid-only use cases

## Known dnd-kit Issues to Watch

1. **Re-renders**: `useSortable` re-renders ALL items even on simple click (#1379). `useDraggable` causes re-renders on all components when crossing droppables (#389).
2. **Variable-sized grids**: Built-in sorting strategies don't work well with different-sized items (#720, #1692).
3. **Drag handle toggling**: Handles stop working when visibility is conditionally toggled (#1417).
4. **Experimental branch**: Major rewrite in progress but timeline unknown. Targets framework agnosticism, performance, and plugin system.

## References

- [dnd-kit future discussion (Issue #1194)](https://github.com/clauderic/dnd-kit/issues/1194)
- [pragmatic-drag-and-drop](https://github.com/atlassian/pragmatic-drag-and-drop)
- [npm trends comparison](https://npmtrends.com/@dnd-kit/core-vs-react-beautiful-dnd-vs-react-dnd)
- [Top 5 DnD Libraries for React (2026)](https://puckeditor.com/blog/top-5-drag-and-drop-libraries-for-react)
