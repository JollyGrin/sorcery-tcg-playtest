import Link from "next/link";
import { HStack } from "styled-system/jsx";

export const Nav = () => {
  return (
    <HStack color="white" justifyContent="end" minH="3rem" gap={8}>
      <Link href={"https://github.com/JollyGrin/sorcery-tcg-playtest"}>
        <p>Github</p>
      </Link>

      <Link
        href={"https://github.com/JollyGrin/sorcery-tcg-playtest/issues/new"}
      >
        <p>Report a Bug/Request Feature</p>
      </Link>
    </HStack>
  );
};
