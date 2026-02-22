import { useCreateLobby } from "@/lib/hooks";
import { CARD_CDN } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { inputVariants } from "@/components/ui/input/variants";

import { FaDice as IconDice } from "react-icons/fa6";
import { FaRegCopy as IconCopy } from "react-icons/fa";
import { generateRandomName } from "./random-names";
import { useCopyToClipboard } from "@/utils/hooks/useCopy";
import toast from "react-hot-toast";
import { AppNav } from "@/components/molecules/AppNav";

export const CreateLobby = () => {
  const { push, query } = useRouter();
  const { gid } = query;

  const [, copy] = useCopyToClipboard();
  const [fields, setFields] = useState({ name: "", gid: "" });
  const gidRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const { refetch } = useCreateLobby({
    gidRef,
    nameRef,
  });
  function onSubmit() {
    push({ query: { ...fields } });
    refetch(undefined);
  }

  useEffect(() => {
    if (gid) {
      setFields((prev) => ({
        ...prev,
        gid: gid as string,
      }));
    }
  }, [gid, query]);

  return (
    <div className="grid w-screen min-h-screen place-items-center bg-surface-page relative">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(212,168,83,0.08)_0%,transparent_70%)] pointer-events-none" />
      <AppNav />
      <div className="w-full max-w-[500px] z-[1] px-4">
        <div className="flex flex-col mx-auto mt-8 gap-4 bg-surface-raised border border-[rgba(212,168,83,0.2)] p-8 rounded-[1rem]">
          <Link href="/">
            <img
              src="/logo.svg"
              alt="logo"
              style={{ width: "100px", margin: "0 auto" }}
            />
          </Link>
          <h2 className="font-header text-[1.5rem] font-semibold text-text-primary text-center">
            Create a Lobby
          </h2>
          <div>
            <label className="block text-[0.85rem] text-text-secondary mb-[0.25rem]">
              Your Name
            </label>
            <div className="flex items-center">
              <IconDice
                className={DiceStyle}
                onClick={() =>
                  setFields((prev) => ({
                    ...prev,
                    name: generateRandomName(),
                  }))
                }
              />
              <input
                ref={nameRef}
                placeholder="Your name"
                value={fields.name}
                onChange={(e) =>
                  setFields((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className={inputVariants()}
              />
            </div>
          </div>

          <div>
            <label className="block text-[0.85rem] text-text-secondary mb-[0.25rem]">
              Lobby Name
            </label>
            <div className="flex items-center">
              <IconDice
                className={DiceStyle}
                onClick={() =>
                  setFields((prev) => ({
                    ...prev,
                    gid: generateRandomName(),
                  }))
                }
              />
              <input
                ref={gidRef}
                placeholder="Lobby name"
                value={fields.gid}
                onChange={(e) =>
                  setFields((prev) => ({
                    ...prev,
                    gid: e.target.value,
                  }))
                }
                className={inputVariants()}
              />
            </div>
          </div>

          <div className="w-full">
            <button
              className="w-full bg-accent-gold text-surface-page py-[0.6rem] px-6 rounded-[0.5rem] text-base font-semibold border-none cursor-pointer transition-all duration-200 hover:bg-accent-goldHover"
              onClick={onSubmit}
            >
              Create/Join lobby
            </button>
            {fields.gid && (
              <div
                className="flex items-center justify-center mt-4 cursor-pointer text-text-secondary transition-all duration-[0.25s] ease-[ease] hover:scale-105 hover:text-accent-gold active:scale-[1.02]"
                onClick={() => {
                  const text = `https://spells.bar/online?gid=${fields.gid}`;
                  copy(text);
                  toast.success(`Copied to clipboard`);
                }}
              >
                <IconCopy />
                <p style={{ width: "fit-content" }}>
                  share this lobby with a friend
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mt-4 bg-surface-raised border border-[rgba(212,168,83,0.2)] max-w-[500px] w-full p-8 rounded-[1rem] gap-4 text-text-primary">
          <p className="font-medium text-[1.5rem] font-header">
            How to play
          </p>
          <p className="text-text-secondary">
            Play Sorcery TCG online with a friend! SpellsBar has no rules
            enforcement, no accounts{" "}
          </p>
          <ul style={{ listStyle: "inside" }}>
            <li>Enter a name for yourself and lobby</li>
            <li>Load a deck </li>
            <li>Share the lobby name for your opponent to connect to</li>
          </ul>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {cards.slice(0, 6).map((img, index, original) => (
          <img
            key={"image" + index}
            src={`${CARD_CDN}${img}.webp`}
            alt={"card" + index}
            className="absolute w-[150px] animate-[fall_10s_linear_infinite,sway_5s_ease-in-out_infinite_alternate] opacity-30 [&:nth-child(1)]:delay-[2s] [&:nth-child(2)]:delay-[0s] [&:nth-child(3)]:delay-[4s] [&:nth-child(4)]:delay-[6s] [&:nth-child(5)]:delay-[8s]"
            style={{ left: (index + 1) * (90 / original.length) + "%" }}
          />
        ))}
      </div>
    </div>
  );
};

const cards = [
  "arid_desert",
  "atlantean_fate-f",
  "avatar_of_fire",
  "bridge_troll",
  "buried_treasure",
  "cave_trolls",
  "chain_lightning",
  "chaos_twister",
  "cloud_city",
  "crusade",
  "fade",
  "flood",
  "grim_reaper",
  "hillock_basilisk",
  "lighthouse",
  "master_tracker",
  "midnight_rogue",
  "mudflow",
  "pirate_ship",
  "red_desert",
  "riptide",
  "royal_bodyguard",
  "sea_serpent",
  "sinkhole",
  "spear_of_destiny",
  "swiven_scout",
  "twist_of_fate",
];

const DiceStyle =
  "select-none scale-100 transition-all duration-[0.25s] ease-[ease] cursor-pointer text-text-secondary hover:scale-125 hover:rotate-[15deg] hover:text-accent-gold active:scale-110";
