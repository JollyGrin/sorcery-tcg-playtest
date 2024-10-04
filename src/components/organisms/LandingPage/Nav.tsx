import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HStack } from "styled-system/jsx";

export const Nav = () => {
  return (
    <HStack color="white" justifyContent="end" gap={2}>
      <Link href={"https://github.com/JollyGrin/sorcery-tcg-playtest"}>
        <Button>Github</Button>
      </Link>

      <Link
        href={"https://github.com/JollyGrin/sorcery-tcg-playtest/issues/new"}
      >
        <Button>Report a Bug/Request Feature</Button>
      </Link>
    </HStack>
  );
};
