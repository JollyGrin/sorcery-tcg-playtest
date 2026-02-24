# Digital Card Game UI Examples

## Hearthstone - The Gold Standard

### Drag Mechanics
- Cards played by **click/tap and drag** from hand to board
- Cards exhibit **"air resistance"** during drag - subtle physics-based lag creates weight
- Playing a minion feels like **"flicking a card at a wall"** (Gambit-style)
- Choose insertion position between existing minions
- Once placed, minions cannot be repositioned (strategic design choice)

### Visual Feedback
- Minion summoning: card "breaks off" into oval creature token on board
- Larger creatures create **shockwaves and crater** on impact
- Cards cast shadows when leaping to attack
- **Tradeable cards**: deck flashes **green** when valid target
- **Opponent awareness**: what you hover gets orange outline on opponent's screen
- **Targeting**: huge arrow from cursor to target

### Hand Display
- Hovering card in hand shows **zoomed-in version** in screen center
- Long-press on mobile for same zoom

### Sound Design
- Every card has unique sound effect + voice clips
- Audio feedback reinforces drag-and-drop at every step

### Key Design Philosophy
> "The interface is not invisible; it is as tangible as any other element of the game."

The UI creates simultaneous "visceral and whimsical" sensations. Everything feels **solid and real** - every element feels like a physical object.

## MTG Arena

### Drag Mechanics
- Cards played by **tap-and-hold to select**, then **drag to battlefield**
- Double-click also supported as alternative
- During drag, game shows which lands auto-tapper will use by **highlighting lands**
- **Blue outline** on playable cards indicates castability

### Zone Layout
- **Hand**: center bottom, cards partially off-screen
- **Library**: left of hand, hovering shows count
- **Graveyard/Exile**: lower left, clickable to browse
- **Battlefield**: center, auto-arranged (lands near hand, creatures center, enchantments right, planeswalkers far right)
- Players CANNOT rearrange permanents on battlefield (auto-arranged)

### Board Design
- Camera perspective: player's side **60%** of board, opponent **40%** (empowerment)
- Left-to-right progression: "past" (decks) → "present" (board) → "future" (mana)
- Cards condense to minimal form on board; identical cards stack

### Phase UI
- Phase symbols illuminate **orange** during active phase
- "Burning fuse" timer when decision time runs long

### Mobile
- Long-press for card detail
- Tap to assign attackers/blockers
- Scroll left/right for selection (accidental selections = known friction)

## Legends of Runeterra

### Drag Mechanics
- Attack: drag units from **bench (back line)** to **battlefield row** (up to 6)
- **Fast method**: click-hold on unit and drag onto others in sequence
- Blocking: drag defenders **opposite specific attackers**
- Commit by pressing button (consumes Attack Token)

### Known UX Pain Points
- **Rearranging attack order was historically difficult** - units in attack row couldn't be reordered without removing all and re-dragging
- Documented complaint acknowledged by Riot devs
- **Lesson**: Make reordering frictionless from day one

### Board Layout
- Maximum 6 units per row (bench + battlefield)
- Minimalist design maximizes board presence
- Other elements (decks, mana) minimized
- Camera: player ~60%, opponent ~40%

### Hand Display
- Cards barely peek from screen edges
- Hovering fans them up to full visibility
- Clear spell/unit visual separation

### Tech Stack
- Unity with C# (client + server)
- Unity Timeline for simple animations
- PlayMaker (visual state machine) for complex state-driven animations

## Marvel Snap

### Design Philosophy
- Simple, clean menus for casual accessibility
- Cards take visual hierarchy precedence
- Interactive elements toward **bottom half** for thumb reach (mobile-first)

### Drag Mechanics
- Players drag cards out to play - the core accessibility hook
- Clean, simple interaction model

### Visual Theme
- Dark "piano glass" with holographic UI elements
- Half-tone dots as comic book homage
- Design process used "color boxing" (high-fidelity wireframes) + Adobe XD for animated prototypes

## Slay the Spire

### Input Methods (Three!)
1. **Drag card to target** (standard)
2. **Click card then click target** (faster for experienced players)
3. **Keyboard shortcuts** (1-0 keys to select, click to play)

### Speed Philosophy
- "Cast zone" perfectly aligned to make **flicking out spells** fast
- Players can **cast cards before finishing hand draw** (no waiting for animations)
- Cards can be played as fast as desired; animations proceed independently
- **UI never blocks the player** - they should always be able to act immediately

### Visual Feedback
- Card streaks/trails on draw/discard
- Weapon icons change at damage thresholds
- Exaggerated spell effects and sounds
- **Oversized hitboxes** prevent misdirects
- Enemies spaced widely to reduce targeting errors

## Cockatrice / Untap.in (Web TCG Platforms)

### Cockatrice (Desktop)
- Open-source C++/Qt multiplatform
- Shift+Click+Drag: select multiple cards
- Right-click drag on card: draw targeting arrows
- Shift+Drag: place cards face-down

### Untap.in (Browser)
- No rules enforcement - purely manual manipulation sandbox
- Left mouse hold: drag and drop to any battlefield location
- Double-click: tap/untap cards, or draw from deck
- Discard/Exile zones: lower left, hover opens preview
- Multiple named zones, sort by color, manage sideboards

### DragNCards (Open Source)
- Multiplayer online card game platform
- Built in Elixir, Phoenix, React
- Used react-beautiful-dnd (now deprecated)

## Cross-Cutting Patterns from Card Games

### 1. Cards Should Feel Physical
Weight, shadows, sound effects, and subtle physics create tangible feel. This is the #1 differentiator between good and great card game UI.

### 2. Condense Cards on Board
Full-size in hand, condensed/minimal on board to save space. Identical cards should stack.

### 3. Clear Play Zones
Use negative space and Gestalt principles to distinguish zones (hand, board, deck, graveyard). Zones should be self-evident without labels.

### 4. Snap-to-Zone
Cards should snap cleanly into target zones with satisfying animation.

### 5. Hover to Preview
Hovering/long-pressing should show enlarged card with full details.

### 6. Sound Feedback
Audio cues on pick-up, hover-over-zone, and drop reinforce every interaction.

### 7. Information Density
Show key stats prominently (attack/defense/cost); tooltips for details.

### 8. Never Block the Player
UI should never make the player wait. Actions should be possible even during animations (Slay the Spire philosophy).

### 9. Multiple Input Methods
Support drag AND click-to-play AND keyboard shortcuts. Never gate actions behind a single input method.

## References

- [Final Boss Blues - On Hearthstone's UI](https://finalbossblues.com/on-hearthstones-ui/)
- [Hearthstone's UI (In An Age)](https://inanage.com/2013/08/29/hearthstones-ui/)
- [Marvel Snap UI/UX Case Study](https://bootcamp.uxdesign.cc/marvels-snap-ui-ux-case-study-9f727d8f3875)
- [Cloudfall Studios - Slay the Spire UI](https://www.cloudfallstudios.com/blog/2018/2/20/flash-thoughts-slay-the-spires-ui)
- [GDKeys - Card Game UI Design of Fairtravel Battle](https://gdkeys.com/the-card-games-ui-design-of-fairtravel-battle/)
- [LoR Feature Development (Riot Tech)](https://technology.riotgames.com/news/bringing-features-life-legends-runeterra)
- [Game UI Database - Hearthstone](https://www.gameuidatabase.com/gameData.php?id=628)
