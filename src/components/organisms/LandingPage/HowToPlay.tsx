import Link from "next/link";
import { ReactNode } from "react";

export const HowToPlay = () => {
  return (
    <div
      className="wood flex flex-col gap-[2rem] bg-[rgba(200,100,0,0.5)] text-white backdrop-blur-[5px] backdrop-brightness-[90%] shadow-[0_3px_6px_rgba(0,0,0,0.5)] p-4 rounded-[0.5rem]"
    >
      <p className="font-bold text-[2rem] [text-shadow:0_2px_2px_rgba(0,0,0,0.5)]">
        How to play
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <Step
          img="shop"
          title="1) Buy Sorcery Cards"
          desc={
            <p>
              Buy some Sorcery TCG cards from your{" "}
              <strong>
                <Link href="https://sorcerytcg.com/locator">
                  favorite cardboard dealer
                </Link>
              </strong>
            </p>
          }
        />

        <Step
          img="deckbuilding"
          title="2) Build your deck"
          desc={
            <p>
              Build your deck on <br />
              <strong>
                <Link href="https://curiosa.io/">Curiosa</Link>
              </strong>{" "}
              or{" "}
              <strong>
                <Link href="https://www.realmsapp.com/sorcery_tcg/cards">
                  Realms
                </Link>
              </strong>
            </p>
          }
        />

        <Step
          img="duel"
          title="3) Test your deck"
          desc={
            <p>
              Load a TTS (Table Top Simulator) deck export link and playtest!
            </p>
          }
        />
      </div>
    </div>
  );
};

const Step = (props: { img: string; title: string; desc: ReactNode }) => {
  return (
    <div>
      <p className="font-semibold text-[1.25rem] [text-shadow:0_2px_2px_rgba(0,0,0,0.5)]">
        {props.title}
      </p>
      <img
        alt="step background"
        src={`/bg/${props.img}.png`}
        style={{
          maxWidth: "250px",
          borderRadius: "1rem",
          height: "250px",
          objectFit: "cover",
        }}
      />
      {typeof props.desc === "string" ? <p>{props.desc}</p> : props.desc}
    </div>
  );
};
