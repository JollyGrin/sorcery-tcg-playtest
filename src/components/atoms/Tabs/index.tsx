import {
  Tabs as TabsWrapper,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ReactNode } from "react";

type Props = {
  tabs: ReactNode[];
  content: ReactNode[];
};

export const Tabs = ({ tabs, content }: Props) => {
  return (
    <TabsWrapper defaultValue="1">
      <TabsList>
        {tabs.map((tab, index) => (
          <TabsTrigger key={index + "trigger"} value={index.toString()}>
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      {content.map((content, index) => (
        <TabsContent key={"content" + index} value={index.toString()}>
          {content}
        </TabsContent>
      ))}
    </TabsWrapper>
  );
};
