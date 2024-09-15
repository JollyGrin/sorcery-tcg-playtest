import Link from "next/link";
import { HStack } from "styled-system/jsx";

export const Nav = () => {
  return (
    <HStack color="white" justifyContent="end" minH="3rem">
      <Link href={"https://github.com/JollyGrin/sorcery-tcg-playtest"}>
        <p>Github</p>
      </Link>
    </HStack>
  );
};
