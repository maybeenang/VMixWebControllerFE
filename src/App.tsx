import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SocketStatusCard from "./components/SocketStatusCard";
import { tabs } from "./lib/utils";

const App = () => {
  return (
    <div className="bg-zinc-100 min-h-screen p-2">
      <SocketStatusCard />
      <Tabs
        defaultValue="general"
        className="w-full bg-white p-4 mt-2 rounded-lg shadow"
      >
        <div className="mx-auto max-w-max">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {tabs.map((tab) => {
          const TabContent = tab.content ? tab.content : () => null;
          return <TabContent key={tab.value} />;
        })}
      </Tabs>
    </div>
  );
};

export default App;
