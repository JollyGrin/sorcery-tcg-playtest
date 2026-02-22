import { IconLogo } from "@/components/atoms/Icons";
import { Disclaimer } from "@/components/organisms/LandingPage/Disclaimer";
import { Nav } from "@/components/organisms/LandingPage/Nav";
import { Tabs } from "@/components/atoms/Tabs";
import { Solo } from "@/components/organisms/LandingPage/SoloLoader";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button/variants";
import { badgeVariants } from "@/components/ui/badge/variants";
import {
  GiSwordClash,
  GiEarthAmerica,
  GiLightningStorm,
  GiAnvil,
  GiCardPick,
  GiOpenBook,
} from "react-icons/gi";

export default function Home() {
  return (
    <div
      className="grid min-h-screen bg-[linear-gradient(135deg,#292524_0%,#3D2B1F_50%,#1C1917_100%)] p-8 relative overflow-hidden"
    >
      {/* Tilted Card Marquee Background */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 z-0 overflow-hidden origin-center"
        style={{ transform: "rotate(-8deg) scale(1.2)" }}
      >
        {/* Row 1 */}
        <div
          className="flex items-center gap-8 mb-12 opacity-10 w-max animate-[marquee1_25s_linear_infinite]"
        >
          {[...Array(12)].map((_, i) => (
            <div key={i} className="shrink-0">
              <img
                src={`/mock-cards/${
                  [
                    "sorcerer.webp",
                    "death_dealer.webp",
                    "infernal_legion.webp",
                    "wayfaring_pilgrim.webp",
                    "headless_haunt.webp",
                    "arid_desert.webp",
                  ][i % 6]
                }`}
                alt="card"
                style={{ height: "160px", width: "auto" }}
              />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div
          className="flex items-center gap-8 mb-12 opacity-[0.08] w-max animate-[marquee2_30s_linear_infinite_reverse]"
        >
          {[...Array(12)].map((_, i) => (
            <div key={i} className="shrink-0">
              <img
                src={`/mock-cards/${
                  [
                    "atlas_cloud_city.webp",
                    "atlas_rift_valley.webp",
                    "jihad.webp",
                    "sorcerer.webp",
                    "death_dealer.webp",
                    "infernal_legion.webp",
                  ][i % 6]
                }`}
                alt="card"
                style={{ height: "160px", width: "auto" }}
              />
            </div>
          ))}
        </div>

        {/* Row 3 */}
        <div
          className="flex items-center gap-8 opacity-[0.06] w-max animate-[marquee3_20s_linear_infinite]"
        >
          {[...Array(12)].map((_, i) => (
            <div key={i} className="shrink-0">
              <img
                src={`/mock-cards/${
                  [
                    "wayfaring_pilgrim.webp",
                    "headless_haunt.webp",
                    "arid_desert.webp",
                    "atlas_cloud_city.webp",
                    "atlas_rift_valley.webp",
                    "jihad.webp",
                  ][i % 6]
                }`}
                alt="card"
                style={{ height: "160px", width: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes marquee1 {
          0% {
            transform: translateX(100vw);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee2 {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100vw);
          }
        }
        @keyframes marquee3 {
          0% {
            transform: translateX(100vw);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>

      <div
        className="flex flex-col max-w-[900px] w-full mx-auto gap-3 relative z-[1]"
      >
        <Nav />
        <div
          className="grid min-h-[400px] grid-cols-1 md:grid-cols-2 bg-[linear-gradient(135deg,#292524_0%,#44403C_100%)] border-b-[5px] border-b-accent-gold p-8 rounded-xl gap-8 justify-between drop-shadow-[0_0.5rem_1rem_rgba(0,0,0,0.4)] relative overflow-hidden"
        >
          <div className="text-text-primary">
            <div className="flex items-center">
              <IconLogo size="2.5rem" color="#D4A853" />
              <p
                className="font-bold text-[3rem] font-title text-accent-gold"
              >
                Spells.Bar
              </p>
            </div>
            <p
              className="text-[1.5rem] mb-4 text-text-primary"
            >
              Play Sorcery TCG online in your browser
            </p>
            <ul
              className="text-[1.1rem] leading-8 mt-6 list-none"
            >
              <FeatureItem icon={<GiSwordClash />} text="Play online multiplayer matches" />
              <FeatureItem icon={<GiEarthAmerica />} text="No downloads or accounts required" />
              <FeatureItem icon={<GiLightningStorm />} text="Instant browser-based gameplay" />
              <FeatureItem icon={<GiAnvil />} text="Build custom decks" />
              <FeatureItem icon={<GiCardPick />} text="Draft and crack packs" />
              <FeatureItem icon={<GiOpenBook />} text="Open source project" />
            </ul>
          </div>

          <Selector />
        </div>
        <Disclaimer />
        <div
          className="py-8 text-center bg-[rgba(0,0,0,0.3)] rounded-lg backdrop-blur-[5px] relative overflow-hidden"
        >
          <h2
            className="text-[2rem] font-bold mb-4 text-accent-gold font-header"
          >
            Ready to Play?
          </h2>
          <p
            className="text-[1.2rem] mb-6 text-text-secondary"
          >
            Jump into a game right now - no setup required!
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/online">
              <button
                className="bg-accent-gold text-surface-page py-3 px-6 rounded-lg text-[1.1rem] font-semibold border-none cursor-pointer transition-all duration-200 hover:bg-accent-goldHover hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2">
                  <GiSwordClash />
                  <span>Play Online</span>
                </div>
              </button>
            </Link>
            <Link href="/deckbuilder">
              <button
                className="bg-accent-gold text-surface-page py-3 px-6 rounded-lg text-[1.1rem] font-semibold border-none cursor-pointer transition-all duration-200 hover:bg-accent-goldHover hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2">
                  <GiAnvil />
                  <span>Build Deck</span>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const FeatureItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <li>
    <div className="flex items-center gap-3">
      <span className="text-accent-gold text-[1.2rem]">{icon}</span>
      <span className="text-text-primary">{text}</span>
    </div>
  </li>
);

const Selector = () => (
  <div
    className="h-full bg-[rgba(0,0,0,0.35)] rounded-lg p-2"
  >
    <Tabs
      tabs={["Solo", "Online", "Deck Builder", "Crack Packs", "Online Draft"]}
      content={[
        <Solo key="solo" />,
        <Multiplayer key="multiplayer" />,
        <DeckBuilder key="deckbuilder" />,
        <Crack key="crack" />,
        <Draft key="draft" />,
      ]}
    />
  </div>
);

const Multiplayer = () => {
  return (
    <div className="text-text-primary">
      <p>Play Sorcery online in the browser.</p>
      <p>Two players join a lobby, choose their decks, and duel</p>
      <div className="flex items-center my-2 gap-2">
        <p>Version:</p>
        <span className={badgeVariants({ variant: "beta" })}>BETA</span>
        <p className="text-text-secondary">Share feedback/bugs!</p>
      </div>
      <ol className="list-inside mb-2 pl-2">
        <li>start a lobby</li>
        <li>choose a name</li>
        <li>share lobbyname with friend</li>
      </ol>
      <Link href="/online">
        <button className={buttonVariants()} style={{ width: "100%" }}>
          Create a lobby
        </button>
      </Link>
    </div>
  );
};

const Draft = () => {
  return (
    <div className="text-text-primary">
      <p>Run a (mock) Sorcery Draft online in the browser.</p>
      <p>Players join a lobby, select & pass, and can export decklist</p>
      <div className="flex items-center">
        <p className="text-text-secondary">Draft rates are NOT accurate.</p>
        <Link href="https://github.com/JollyGrin/sorcery-tcg-playtest/blob/fa6510ea46ee0c5845aba1654944799a2eff2d1b/src/components/organisms/Draft/helpers.ts#L14">
          <p className="text-accent-teal underline">
            Link to Code
          </p>
        </Link>
      </div>
      <div className="flex items-center my-2 gap-2">
        <p>Version:</p>
        <span className={badgeVariants({ variant: "alpha" })}>ALPHA</span>
        <p className="text-text-secondary">Expect bugs!</p>
      </div>
      <ol className="list-inside mb-2 pl-2">
        <li>start a lobby</li>
        <li>choose a name</li>
        <li>share lobbyname with friend</li>
      </ol>
      <Link href="/draft/online">
        <button className={buttonVariants()} style={{ width: "100%" }}>
          Create a lobby
        </button>
      </Link>
    </div>
  );
};

const DeckBuilder = () => {
  return (
    <div className="text-text-primary">
      <p>Build Custom Decks</p>
      <p>Create and save your own Sorcery TCG decks locally</p>
      <div className="flex items-center my-2 gap-2">
        <p>Version:</p>
        <span className={badgeVariants({ variant: "new" })}>NEW</span>
        <p className="text-text-secondary">Build decks without external sites!</p>
      </div>
      <ul className="list-inside mb-2 pl-2">
        <li>Browse all available cards</li>
        <li>Save decks to your browser</li>
        <li>Export and share deck lists</li>
      </ul>
      <Link href="/deckbuilder">
        <button className={buttonVariants()} style={{ width: "100%" }}>
          Build a Deck
        </button>
      </Link>
    </div>
  );
};

const Crack = () => {
  return (
    <div className="text-text-primary">
      <p>Crack Booster Packs</p>
      <p>Open (mock) booster packs by yourself.</p>
      <div className="flex items-center">
        <p className="text-text-secondary">Draft rates are NOT accurate.</p>
        <Link href="https://github.com/JollyGrin/sorcery-tcg-playtest/blob/fa6510ea46ee0c5845aba1654944799a2eff2d1b/src/components/organisms/Draft/helpers.ts#L14">
          <p className="text-accent-teal underline">
            Link to Code
          </p>
        </Link>
      </div>
      <div className="flex items-center my-2 gap-2">
        <p>Version:</p>
        <span className={badgeVariants({ variant: "beta" })}>BETA</span>
        <p className="text-text-secondary">Report bugs/feedback!</p>
      </div>
      <ol className="list-inside mb-2 pl-2">
        <li>Choose pack type to open</li>
        <li>Reveal your cards one by one</li>
        <li>Build collection for deckbuilding</li>
      </ol>
      <Link href="/crack">
        <button className={buttonVariants()} style={{ width: "100%" }}>
          Crack Packs
        </button>
      </Link>
    </div>
  );
};
