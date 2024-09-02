import { TabsContent } from "@/components/ui/tabs";
import DraftCountDown from "../ui/draftcountdown";
import { cn } from "@/lib/utils";
import VersusText from "../VersusText";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const blueTeam = (index: number): boolean => index === 0;

export const InGameTab = () => {
  return (
    <TabsContent value="in-game">
      <div className="p-4 max-w-screen-md mx-auto text-center">
        <h1 className="text-2xl font-bold">In Game</h1>
        <VersusText />
        <DraftCountDown />
      </div>

      <div className="flex flex-col sm:flex-row justify-between sm:divide-x-2 max-w-screen-md  mx-auto">
        {Array.from({ length: 2 }).map((_, i) => (
          <section
            className={cn("flex-1 p-2", blueTeam(i) ? "" : "text-right")}
            key={`sectionTeam-${i}`}
          >
            <h2 className="text-lg font-semibold">{blueTeam(i) ? "Blue Team" : "Red Team"}</h2>

            <div className="mt-5">
              <Label htmlFor="scoreBlue">Point Kill</Label>
              <Input type="number" className="w-full p-2 border rounded" />
            </div>
            <div className="mt-5">
              <Label htmlFor="scoreBlue">Gold</Label>
              <Input type="number" className="w-full p-2 border rounded" />
            </div>
            <div className="mt-5">
              <Label htmlFor="scoreBlue">Turret</Label>
              <Input type="number" className="w-full p-2 border rounded" />
            </div>
            <div className="mt-5">
              <Label htmlFor="scoreBlue">Lord</Label>
              <Input type="number" className="w-full p-2 border rounded" />
            </div>
            <div className="mt-5">
              <Label htmlFor="scoreBlue">Turtle</Label>
              <Input type="number" className="w-full p-2 border rounded" />
            </div>
          </section>
        ))}
      </div>
    </TabsContent>
  );
};
