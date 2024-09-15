import Link from "next/link";
import { Box, HStack } from "styled-system/jsx";

export const Nav = () => {
  return (
    <HStack color="white" justifyContent="end">
      <Link href={"https://github.com/JollyGrin/sorcery-tcg-playtest"}>
        <p>Github</p>
      </Link>
    </HStack>
  );
};
