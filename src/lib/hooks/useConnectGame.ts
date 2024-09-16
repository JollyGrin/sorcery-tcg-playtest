import axios from "axios";
import { useLocalServerStorage } from "./";
import { useQuery } from "@tanstack/react-query";
import { RefObject, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

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

  const [modal, setModal] = useState(false);
  const disclosure = {
    onOpen: () => setModal(true),
    isOpen: modal === true,
    onClose: () => setModal(false),
  };

  async function createLobby() {
    if (!gidRef?.current?.value) return;
    const createLobbyURL = new URL(`/lobby/${gidRef.current.value}`, serverURL);
    try {
      const result = await axios.get(createLobbyURL.toString());
      return result.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  function onSuccess() {
    // If the lobby was created, we can move to the game state and
    // connect to the websocket.
    if (!nameRef?.current || !gidRef?.current) return;
    router.push(
      "/game?name=" + nameRef.current.value + "&gid=" + gidRef.current.value,
    );

    // HACK: the loading props are borked, so manually setting and resetting state
    setTimeout(() => {
      setLoading(false);
      toast.success(`Successfully connected to GameServer: \n ${activeServer}`);
    }, 10000);
  }

  const { refetch } = useQuery({
    queryKey: ["create-lobby"],
    queryFn: createLobby,
    enabled: false,
    refetchOnWindowFocus: false,
  });

  return {
    refetch,
    loading,
    setLoading,
    disclosure,
    onSuccess,
  };
}
