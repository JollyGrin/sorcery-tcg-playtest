export type DraftPlayer = {
  joinedSessionTimestamp: number; // time of joining the session. Used for ordering
  actions: {};
  cards: {
    selected: any[];
    packs: any[][];
  };
};
