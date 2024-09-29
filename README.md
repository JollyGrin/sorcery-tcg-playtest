# Playtest Sorcery TCG in the browser
https://spells.bar

spells.bar an open-source project and is not affiliated with Sorcery: Contested Realm or Erik's Curiosa Limited.
All rights to Sorcery and its content are owned by Erik's Curiosa Limited.

# Server
Spells.bar uses the websocket go server from https://github.com/JollyGrin/unbrewed-p2p
Find instructions if you wish to setup your own game server.


## Todo 
- [x] view enemy graveyard
- [x] add four cores deck import https://fourcores.xyz/api/tts/T33jdoAJy8PGY9Agq1fo
- [ ] add hand drawing mode (for mobile, just deck and hand)
- [x] add setting to flip enemy card upside down

## Feature ideas
- [ ] support 4players
- [ ] support battlebox (shared deck)

## Bugs
- [x] updating mana or rolling dice causes board state to clear
- [ ] graveyard sorting. Ensure that in the handle drag it ignores ordering conditions
- [ ] firefox maybe shows context menu on right click
- [x] right click modal, taps card



## Feedback
- [ ] 



## Recently finished
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
