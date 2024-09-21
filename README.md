# Playtest Sorcery TCG in the browser
https://spells.bar

spells.bar an open-source project and is not affiliated with Sorcery: Contested Realm or Erik's Curiosa Limited.
All rights to Sorcery and its content are owned by Erik's Curiosa Limited.

# Server
Spells.bar uses the websocket go server from https://github.com/JollyGrin/unbrewed-p2p
Find instructions if you wish to setup your own game server.


## Todo 
- [ ] view enemy graveyard

## Feature ideas
- [ ] support 4players
- [ ] support battlebox (shared deck)

## Bugs
- [ ] graveyard sorting. Ensure that in the handle drag it ignores ordering conditions
- [ ] firefox maybe shows context menu on right click
- [ ] right click modal, taps card



## Feedback
- [x] spawn card/token modal
    - cache the sorcery api data on cards.army
    - make a modal that spawns a card to your hand
    - will cover rubble and many other mechanics
    - some cards have effects that require counter on the card
- [ ] manipulation action window:
    - move card from top of deck to bottom
    - draw from bottom
- [ ] roll dice (d6/d20)
- [x] grid numbers 1-20
- [x] add counters on cards
- [x] add remaining / total mana



## Recently finished
- [x] add websocket for multiplayer
- [x] landing page
- [x] setup pages for solo play (1p, 2p rotate self)
- [x] add url loading for decks
- [x] add realms app deck loader
- [x] add solo turn rotator (play against yourself)
- [x] add health counter
- [x] use top header for info
