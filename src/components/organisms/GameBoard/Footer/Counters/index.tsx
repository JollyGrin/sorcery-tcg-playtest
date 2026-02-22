import { PlayerData, PlayerDataProps } from "@/types/card";
import { useRouter } from "next/router";
import { Resource } from "./Resource";
import { ManaNumber } from "./Mana";
import { GiBoltSpellCast as IconMana } from "react-icons/gi";

export const CountersTray = (props: PlayerDataProps) => {
  const { query } = useRouter();
  const name = query?.name ?? "p1";
  const me = props?.players?.[name as string].data;

  function setField(field: keyof PlayerData) {
    return (value: number) => {
      const newData = { ...me, [field]: value };
      props.setMyData(newData as PlayerData);
    };
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto p-[0_0.5rem] justify-between items-center gap-[0.5rem]">
      <div className="flex items-center relative w-full">
        <IconMana
          size={12}
          style={{
            position: "absolute",
            left: "-0.25rem",
            userSelect: "none",
            zIndex: -1,
          }}
        />
        <ManaNumber
          type="manaRemaining"
          setValue={setField("manaRemaining")}
          value={me?.manaRemaining ?? 0}
        />
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            setField("manaRemaining")(me?.mana ?? 0);
          }}
        >
          /
        </p>
        <ManaNumber
          type="mana"
          setValue={setField("mana")}
          value={me?.mana ?? 0}
        />
      </div>
      {(["life", "earth", "fire", "water", "wind"] as const).map((type) => (
        <Resource
          key={type}
          type={type}
          setValue={setField(type)}
          value={me?.[type] ?? 0}
        />
      ))}
    </div>
  );
};
