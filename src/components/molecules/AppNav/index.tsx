import Link from "next/link";
import { HStack } from "styled-system/jsx";
import { css } from "styled-system/css";
import { IconLogo } from "@/components/atoms/Icons";

const navLink = css({
  color: "text.secondary",
  fontFamily: "body",
  fontSize: "0.9rem",
  transition: "color 0.2s",
  _hover: { color: "accent.gold" },
});

export const AppNav = () => (
  <HStack
    h="48px"
    px="1rem"
    bg="surface.page"
    borderBottom="1px solid rgba(255,255,255,0.08)"
    justify="space-between"
    flexShrink={0}
  >
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
    <HStack gap="1.25rem">
      <Link href="/online" className={navLink}>
        Play Online
      </Link>
      <Link href="/deckbuilder" className={navLink}>
        Deck Builder
      </Link>
      <a
        href="https://github.com/JollyGrin/sorcery-tcg-playtest"
        target="_blank"
        rel="noopener noreferrer"
        className={navLink}
      >
        GitHub
      </a>
    </HStack>
  </HStack>
);
