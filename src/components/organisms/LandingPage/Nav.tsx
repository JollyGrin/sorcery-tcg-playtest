import { Button } from "@/components/ui/button";
import { IconLogo } from "@/components/atoms/Icons";
import Link from "next/link";
import { HStack } from "styled-system/jsx";
import { css } from "styled-system/css";

export const Nav = () => {
  return (
    <HStack color="text.secondary" justifyContent="space-between" gap={2}>
      <Link href="/">
        <HStack gap="0.5rem" cursor="pointer">
          <IconLogo size="1.25rem" color="#D4A853" />
          <span
            className={css({
              fontFamily: "title",
              fontSize: "1.1rem",
              color: "accent.gold",
            })}
          >
            Spells.Bar
          </span>
        </HStack>
      </Link>
      <HStack gap={2}>
        <Link href="https://github.com/JollyGrin/sorcery-tcg-playtest">
          <Button>Github</Button>
        </Link>
        <Link href="https://github.com/JollyGrin/sorcery-tcg-playtest/issues/new">
          <Button>Report a Bug</Button>
        </Link>
      </HStack>
    </HStack>
  );
};
