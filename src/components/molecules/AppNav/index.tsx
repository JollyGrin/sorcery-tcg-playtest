import Link from "next/link";
import { IconLogo } from "@/components/atoms/Icons";

const navLink = "text-text-secondary font-body text-[0.9rem] transition-colors duration-200 hover:text-accent-gold";

export const AppNav = () => (
  <div className="flex items-center h-[48px] px-[1rem] bg-surface-page border-b border-[rgba(255,255,255,0.08)] justify-between shrink-0">
    <Link href="/">
      <div className="flex items-center gap-[0.5rem] cursor-pointer">
        <IconLogo size="1.25rem" color="#D4A853" />
        <span className="font-title text-[1.1rem] text-accent-gold">
          Spells.Bar
        </span>
      </div>
    </Link>
    <div className="flex items-center gap-[1.25rem]">
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
    </div>
  </div>
);
