import {
  Tabs as TabsWrapper,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ReactNode } from "react";

type Props = {
  tabs: ReactNode[];
  content?: ReactNode[];
  selectedIndex?: number;
  onSelect?(index: number): void;
};

export const Tabs = ({
  tabs,
  content,
  selectedIndex = 0,
  onSelect = (_: number) => {},
}: Props) => {
  return (
    <TabsWrapper defaultValue="0" value={selectedIndex.toString()}>
      <TabsList>
        {tabs.map((tab, index) => (
          <TabsTrigger
            key={index + "trigger"}
            value={index.toString()}
            onClick={() => onSelect(index)}
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      {content?.map((content, index) => (
        <TabsContent key={"content" + index} value={index.toString()}>
          {content}
        </TabsContent>
      ))}
    </TabsWrapper>
  );
};
