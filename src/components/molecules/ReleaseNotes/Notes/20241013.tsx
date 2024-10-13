import { KeyboardKey } from "@/components/atoms/KeyboardKey";
import { CardAtlas } from "@/components/atoms/mock-cards/atlas";
import { CardImage } from "@/components/atoms/mock-cards/card";
import { LOCALSTORAGE_KEYS } from "@/components/organisms/GameBoard/constants";
import { AltGridDisplay } from "@/components/organisms/GameBoard/Grid/AltGridDisplay";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/utils/hooks";
import { mock_griditem_red } from "@/utils/mocks/mock_gamecards";
import { Box, Grid, HStack, VStack } from "styled-system/jsx";

export const Note20241013 = () => {
  const { key, ...options } = LOCALSTORAGE_KEYS.SETTINGS.DISPLAY.toggle;
  const [isDisplay, setIsDisplay] = useLocalStorage(key, false, options);

  return (
    <>
      <Grid gridTemplateColumns="repeat(2, 1fr)">
        <Box minW="300px">
          <p style={{ fontSize: "1.5rem", opacity: 0.5, marginBottom: "1rem" }}>
            October 13, 2024
          </p>
          <p>View the grid with full card previews!</p>
          <VStack alignItems="start" fontSize="0.825rem" gap={2}>
            <p>
              Have a more realistic view of the table to match your expectations
              from playing Sorcery in real life.
            </p>
            <p>
              Cards always switch to minimized view when hovering or dragging an
              item, to allow you to position the ordering of cards.
            </p>

            <HStack>
              <p>Try it out! Click the button</p>

              <Button onClick={() => setIsDisplay(!isDisplay)}>
                {isDisplay ? "Show min card view" : "Show full card"}
              </Button>
            </HStack>

            <p style={{ marginTop: "1rem" }}>
              Wish to change this setting in the future?
            </p>
            <p>
              While in game, press the keyboard key <KeyboardKey>?</KeyboardKey>{" "}
              to open up the commands menu.
            </p>
            <p>
              From there you can find these settings in the menu item:{" "}
              <span style={{ fontWeight: 700 }}>
                Display full/minimized cards view
              </span>
            </p>
          </VStack>
        </Box>
        <Grid gridTemplateRows="repeat(2, 210px)" w="200px" minH="200px">
          {isDisplay ? (
            <>
              <AltGridDisplay
                cards={mock_griditem_red.map((card) => ({
                  ...card,
                  playerName: "bar",
                }))}
                myName="foo"
              />
              <AltGridDisplay
                cards={mock_griditem_red.map((card) => ({
                  ...card,
                  playerName: "foo",
                }))}
                myName="foo"
              />
            </>
          ) : (
            <>
              <VStack>
                {mock_griditem_red?.map((card, index) => {
                  const CardType = card.type === "site" ? CardAtlas : CardImage;
                  return (
                    <CardType
                      key={card.img + index}
                      img={card.img}
                      isMine={false}
                    />
                  );
                })}
              </VStack>
              <VStack>
                {mock_griditem_red?.map((card, index) => {
                  const CardType = card.type === "site" ? CardAtlas : CardImage;
                  return (
                    <CardType
                      key={card.img + index}
                      img={card.img}
                      isMine={true}
                    />
                  );
                })}
              </VStack>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};
