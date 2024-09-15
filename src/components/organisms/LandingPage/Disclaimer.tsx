import Link from "next/link";
import { HStack } from "styled-system/jsx";

export const Disclaimer = () => {
  return (
    <HStack
      bg="rgba(255,255,255,0.5)"
      backdropFilter="blur(3px) brightness(90%)"
      justifyContent="center"
      textAlign="center"
      borderRadius="0.5rem"
      fontSize="0.75rem"
      p="0.5rem"
    >
      <p>
        <strong>spells.bar</strong> an open-source project and is not affiliated
        with{" "}
        <Link href="https://sorcerytcg.com/">
          <strong>Sorcery: Contested Realm</strong>
        </Link>{" "}
        or{" "}
        <Link href="https://sorcerytcg.com/about">
          <strong>Erik&apos;s Curiosa Limited</strong>
        </Link>
        .
        <br /> All rights to Sorcery and its content are owned by{" "}
        <strong>Erik&apos;s Curiosa Limited</strong>.
      </p>
    </HStack>
  );
};
