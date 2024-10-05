import { DraftPlayerData } from "../types";

export const DraftTray = (props: {
  players: Record<string, DraftPlayerData>;
}) => {
  const players = Object.entries(props.players);
  return (
    <div data-testid="stats">
      {players?.map(([key, value]) => {
        return (
          <p key={key}>
            {key}:{value.joinedSessionTimestamp}
          </p>
        );
      })}
    </div>
  );
};
