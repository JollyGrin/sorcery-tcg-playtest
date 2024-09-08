import { Box } from "styled-system/jsx";
import { AuraDrop } from "./AuraDrop";
import { GameStateActions } from "..";
import { DragItem } from "@/components/molecules/DragItem";

export const Auras = (props: GameStateActions) => {
  const auraCards = props.gridItems?.[21]?.[0];
  return (
    <Box position="absolute" w="100%" h="100%">
      <Box
        position="absolute"
        top="25%" /* Adjust relative to row height */
        left="20%" /* Adjust relative to column width */
        bg="blue"
        w="50px"
        h="50px"
        transform="translate(-50%, -50%)" /* Center the box */
      >
        {!auraCards?.id && (
          <AuraDrop gridIndex={21}>
            <Box
              w="100%"
              h="100%"
              backgroundSize="cover"
              transform="rotate(90deg)"
              borderRadius="0.5rem"
              // style={{
              //   backgroundImage: `url(/mock-cards/${props.gridItems?.[21]?.[0]?.img})`,
              // }}
            />
            {/* {props.gridItems[21][0].img} */}
          </AuraDrop>
        )}
        {auraCards?.id && (
          <DragItem
            gridIndex={21}
            index={0}
            style={{ width: "100%", height: "100%" }}
          >
            <Box
              w="100%"
              h="100%"
              backgroundSize="cover"
              transform="rotate(90deg)"
              borderRadius="0.5rem"
              style={{
                zIndex: 100000,
                backgroundImage: `url(/mock-cards/${props.gridItems?.[21]?.[0]?.img})`,
              }}
            />
          </DragItem>
        )}
      </Box>

      <Box
        position="absolute"
        top="25%" /* Adjust relative to row height */
        left="40%" /* Adjust relative to column width */
        bg="blue"
        w="25px"
        h="25px"
        transform="translate(-50%, -50%)" /* Center the box */
      />
    </Box>
  );
};
