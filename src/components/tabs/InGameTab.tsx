import { TabsContent } from "@/components/ui/tabs";

export const InGameTab = () => {
  return (
    <TabsContent value="in-game">
      <div className="p-4">
        <h1 className="text-2xl font-bold">In Game</h1>
        <p className="text-gray-500">This is the in-game tab</p>
      </div>
    </TabsContent>
  );
};
