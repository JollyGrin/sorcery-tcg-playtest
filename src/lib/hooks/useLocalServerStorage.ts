export const useLocalServerStorage = () => {
  const defaultServer = "https://unbrewed-v2.fly.dev";
  return { activeServer: defaultServer };
};
