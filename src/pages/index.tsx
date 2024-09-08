import { CardAtlas } from "@/components/atoms/mock-cards/atlas";
import { DroppableGridItem } from "@/components/molecules/DropGridItem";
import { Grid } from "styled-system/jsx";
import { grid } from "styled-system/patterns";
import { DndContext, DragEndEvent, useDraggable } from "@dnd-kit/core";
import { ReactNode, useEffect } from "react";
import { LAYOUT_HEIGHTS } from "@/components/organisms/GameBoard/constants";
import { useRouter } from "next/router";

const { nav, body, footer } = LAYOUT_HEIGHTS;

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/game");
  }, []);
  return null;
}
