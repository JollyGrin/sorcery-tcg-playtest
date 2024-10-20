# Playtest Sorcery TCG in the browser
https://spells.bar

spells.bar an open-source project and is not affiliated with Sorcery: Contested Realm or Erik's Curiosa Limited.
All rights to Sorcery and its content are owned by Erik's Curiosa Limited.

# Development Notes
Track updates to the project via the developer ad-hoc notes: https://github.com/JollyGrin/sorcery-tcg-playtest/tree/main/notes

# Server
Spells.bar uses the websocket go server from https://github.com/JollyGrin/unbrewed-p2p
Find instructions if you wish to setup your own game server.


## Todo 
- [ ] keypress listener for mana/life increase
- [ ] add hand drawing mode (for mobile, just deck and hand)
- [x] command: scry -> add bottom deck in addition to top deck


## Feature ideas
- [x] full preview of cards in grid cell
- [ ] support 4players
- [ ] support battlebox (shared deck)
- [ ] draft mode
    - include websocket support
    - statistics on openings https://www.reddit.com/r/SorceryTCG/comments/18y5bs4/personal_beta_opening_stats_100_boxes/

## Bugs
- [x] updating mana or rolling dice causes board state to clear
- [x] graveyard sorting. Ensure that in the handle drag it ignores ordering conditions
- [ ] firefox maybe shows context menu on right click
- [x] right click modal, taps card


## Missing Cards
- [ ] [Winter river](https://curiosa.io/cards/winter_river)



## Feedback
- [ ] 



## Recently finished
- [x] view enemy graveyard
- [x] add four cores deck import https://fourcores.xyz/api/tts/T33jdoAJy8PGY9Agq1fo
- [x] add setting to flip enemy card upside down
- [x] add precon decks to default load
- [x] banish cards from cemetary
- [x] roll dice (d6/d20)
- [x] spawn card/token modal
    - cache the sorcery api data on cards.army
    - make a modal that spawns a card to your hand
    - will cover rubble and many other mechanics
    - some cards have effects that require counter on the card
- [x] manipulation action window:
    - move card from top of deck to bottom
    - draw from bottom
- [x] add numbers to grid: numbers 1-20
- [x] add counters on cards
- [x] add remaining / total mana
- [x] add websocket for multiplayer
- [x] landing page
- [x] setup pages for solo play (1p, 2p rotate self)
- [x] add url loading for decks
- [x] add realms app deck loader
- [x] add solo turn rotator (play against yourself)
- [x] add health counter
- [x] use top header for info
