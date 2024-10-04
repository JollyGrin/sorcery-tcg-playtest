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
  onSelect?(index: number): void;
};

export const Tabs = ({
  tabs,
  content,
  onSelect = (_: number) => {},
}: Props) => {
  return (
    <TabsWrapper defaultValue="0">
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
