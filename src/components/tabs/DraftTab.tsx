import { TabsContent } from "../ui/tabs";

const DraftTab = () => {
  return (
    <TabsContent value="draft">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Draft</h1>
        <p className="text-gray-500">This is the draft tab</p>
      </div>
    </TabsContent>
  );
};

export default DraftTab;
