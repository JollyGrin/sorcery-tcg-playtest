import { Button } from "@/components/ui/button";
import { PlayerData } from "@/types/card";

export const DefaultDecks = (props: { setDeckId(id: string): void }) => {
  return (
    <>
      <hr className="border-border mt-[0.5rem] mb-[0.25rem] opacity-10" />
      <p>Load a precon deck</p>
      <div className="grid grid-cols-[repeat(4,1fr)] mt-[1rem]">
        {precons.map((precon) => (
          <PreconButton
            key={precon.deckId}
            setDeckId={() => props.setDeckId(precon.deckId)}
            {...precon}
          />
        ))}
      </div>
    </>
  );
};

type Precon = {
  resource: keyof Pick<PlayerData, "wind" | "earth" | "fire" | "water">;
  name: string;
  deckId: string;
};
const precons: Precon[] = [
  {
    deckId: "clso3lngx007lhb600v843gd7",
    resource: "earth",
    name: "alpha",
  },
  {
    deckId: "clso3l8ph005ihb60cxkus6mh",
    resource: "fire",
    name: "alpha",
  },
  {
    deckId: "clso3lffd006jhb60hiwpltyc",
    resource: "water",
    name: "alpha",
  },
  {
    deckId: "clso3l1mg001q2w08qv1nexky",
    resource: "wind",
    name: "alpha",
  },
  {
    deckId: "clczbmbxb008hv5uggpws66fe",
    resource: "earth",
    name: "beta",
  },
  {
    deckId: "clczbmbxb0085v5ug7eyxn2dk",
    resource: "fire",
    name: "beta",
  },
  {
    deckId: "clczbmbxb008ev5ugiovmxcw1",
    resource: "water",
    name: "beta",
  },
  {
    deckId: "clczbmbxb008av5ugml35rdwt",
    resource: "wind",
    name: "beta",
  },
];

const PreconButton = (props: { setDeckId(): void } & Precon) => {
  return (
    <Button onClick={props.setDeckId}>
      <img
        src={`/icon/${props.resource}.webp`}
        alt="resource icon"
        style={{ height: "1rem", width: "1rem" }}
      />
      {props.name}
    </Button>
  );
};
