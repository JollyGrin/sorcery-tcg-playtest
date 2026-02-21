import { Box, Flex } from "styled-system/jsx";
import { css } from "styled-system/css";

const spinnerStyle = css({
  width: "2.5rem",
  height: "2.5rem",
  border: "3px solid rgba(212,168,83,0.2)",
  borderTopColor: "accent.gold",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
});

export const LoadingSpinner = ({ message }: { message?: string }) => (
  <Flex align="center" gap="0.75rem" py="2rem" justify="center">
    <Box className={spinnerStyle} />
    {message && (
      <p className={css({ color: "text.secondary", fontFamily: "body" })}>
        {message}
      </p>
    )}
  </Flex>
);

export const FullPageLoader = ({ message }: { message?: string }) => (
  <Flex
    width="100vw"
    height="100vh"
    align="center"
    justify="center"
    direction="column"
    gap="1rem"
    bg="surface.page"
  >
    <Box
      className={css({
        width: "3.5rem",
        height: "3.5rem",
        border: "4px solid rgba(212,168,83,0.2)",
        borderTopColor: "accent.gold",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      })}
    />
    {message && (
      <p
        className={css({
          color: "text.secondary",
          fontFamily: "body",
          fontSize: "1.1rem",
        })}
      >
        {message}
      </p>
    )}
  </Flex>
);
