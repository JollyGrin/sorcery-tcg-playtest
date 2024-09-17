import { useCreateLobby } from "@/lib/hooks";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Box, Grid } from "styled-system/jsx";
import { button, input } from "styled-system/recipes";

export const CreateLobby = () => {
  const { push, query } = useRouter();
  const queryGid = query?.gid as string | undefined;

  const [fields, setFields] = useState({ name: "", gid: "" });
  const gidRef = useRef(null);
  const nameRef = useRef(null);
  const { refetch, loading, setLoading, disclosure } = useCreateLobby({
    gidRef,
    nameRef,
  });

  // after creating lobby, short wait until push
  const [isLoading, setIsLoading] = useState(false);
  function onSubmit() {
    refetch(queryGid);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log({ fields });
      push({ query: { ...fields } });
    }, 1000);
  }

  if (isLoading) return "Creating Lobby...";

  return (
    <Grid w="100vw" h="100vh" placeItems="center">
      <Box bg="teal" p="1rem" maxW="600px" m="0 auto">
        <input
          ref={nameRef}
          placeholder="name"
          onChange={(e) =>
            setFields((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          className={input()}
        />

        <input
          ref={gidRef}
          placeholder="gid"
          onChange={(e) =>
            setFields((prev) => ({
              ...prev,
              gid: e.target.value,
            }))
          }
          className={input()}
        />
        <button className={button()} onClick={onSubmit}>
          submit
        </button>
      </Box>
    </Grid>
  );
};
