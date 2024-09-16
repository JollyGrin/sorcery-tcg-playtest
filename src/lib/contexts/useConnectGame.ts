import axios from "axios";
import { useLocalServerStorage } from "@/lib/hooks";
import { useQuery } from "@tanstack/react-query";
import { RefObject, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useDisclosure } from "@chakra-ui/react";

interface Props {
  gidRef: RefObject<HTMLInputElement>;
  nameRef: RefObject<HTMLInputElement>;
}

export function useCreateLobby({ gidRef, nameRef }: Props) {
  const router = useRouter();
  const { activeServer } = useLocalServerStorage();
  const serverURL = new URL(activeServer);

  // the useQuery loading props not working on repeat visits
  const [loading, setLoading] = useState<boolean>(false);

  const disclosure = useDisclosure();

  const { refetch } = useQuery(
    ["create-lobby"],
    async () => {
      if (!gidRef?.current?.value) return;
      const createLobbyURL = new URL(
        `/lobby/${gidRef.current.value}`,
        serverURL,
      );
      try {
        const result = await axios.get(createLobbyURL.toString());
        return result.data;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    {
      // We manually call refetch.
      enabled: false,
      refetchOnWindowFocus: false,
      onSuccess: () => {
        // If the lobby was created, we can move to the game state and
        // connect to the websocket.
        if (!nameRef?.current || !gidRef?.current) return;
        router.push(
          "/game?name=" +
            nameRef.current.value +
            "&gid=" +
            gidRef.current.value,
        );

        // HACK: the loading props are borked, so manually setting and resetting state
        setTimeout(() => {
          setLoading(false);
          toast.success(
            `Successfully connected to GameServer: \n ${activeServer}`,
          );
        }, 10000);
      },
      onError: () => {
        // if there's an error connecting, prompt the Gameserver Settings modal so they can input a new server url
        setLoading(false);
        disclosure.onOpen();
        toast.error(`Failed to connect to GameServer: \n ${activeServer}`);
      },
    },
  );

  return {
    refetch,
    loading,
    setLoading,
    disclosure,
  };
}
