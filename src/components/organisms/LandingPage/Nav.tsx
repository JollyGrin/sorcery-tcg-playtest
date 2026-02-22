import { Button } from "@/components/ui/button";
import { IconLogo } from "@/components/atoms/Icons";
import Link from "next/link";

export const Nav = () => {
  return (
    <div className="flex items-center text-text-secondary justify-between gap-2">
      <Link href="/">
        <div className="flex items-center gap-[0.5rem] cursor-pointer">
          <IconLogo size="1.25rem" color="#D4A853" />
          <span className="font-title text-[1.1rem] text-accent-gold">
            Spells.Bar
          </span>
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <Link href="https://github.com/JollyGrin/sorcery-tcg-playtest">
          <Button>Github</Button>
        </Link>
        <Link href="https://github.com/JollyGrin/sorcery-tcg-playtest/issues/new">
          <Button>Report a Bug</Button>
        </Link>
      </div>
    </div>
  );
};
