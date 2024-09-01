import { Label } from "../ui/label";
import { TabsContent } from "../ui/tabs";
import Select from "react-select";
import { Team } from "@/types/interfaces";

import { useMemo } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLocalStorage, useToggle } from "usehooks-ts";
import { useJudulMatch } from "@/hooks/useJudulMatch";
import useBlueTeam from "@/hooks/useBlueTeam";
import useRedTeam from "@/hooks/useRedTeam";

const GeneralTab = () => {
  const {
    blueTeam,
    setBlueTeam,
    selectedBlueTeam,
    setSelectedBlueTeam,
    clearBlueTeam,
    clearSelectedBlueTeam,
  } = useBlueTeam();
  const {
    redTeam,
    setRedTeam,
    selectedRedTeam,
    setSelectedRedTeam,
    clearRedTeam,
    clearSelectedRedTeam,
  } = useRedTeam();

  const [teams] = useLocalStorage<Team[] | []>("teams", []);

  const [judulMatch, setJudulMatch, sendChangeJudulMatch] = useJudulMatch();

  const [lock, toggleLock] = useToggle();

  const options = useMemo(() => {
    return teams.map((team) => ({
      value: team.id,
      label: team.name,
      isDisabled: selectedBlueTeam?.value == team.id || selectedRedTeam?.value == team.id,
    }));
  }, [selectedBlueTeam?.value, selectedRedTeam?.value, teams]);

  const handleSwitchTeam = () => {
    if (selectedBlueTeam && selectedRedTeam) {
      setSelectedBlueTeam(selectedRedTeam);
      setSelectedRedTeam(selectedBlueTeam);
    }
  };

  return (
    <TabsContent value="general">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center">General</h1>
        <section className="max-w-max mx-auto space-x-3">
          <span>{blueTeam?.name || "Team Blue"}</span>
          <span>VS</span>
          <span>{redTeam?.name || "Red Team"}</span>
        </section>

        <form className="max-w-max mx-auto mt-2" onSubmit={sendChangeJudulMatch}>
          <p className="text-center font-semibold">Judul Match</p>
          <Input
            type="text"
            className="w-full p-2 border rounded"
            value={judulMatch ?? ""}
            onChange={(e) => {
              setJudulMatch(e.target.value);
            }}
          />
        </form>
        <form className="max-w-max mx-auto mt-2 flex gap-2" onSubmit={sendChangeJudulMatch}>
          <div>
            <Label htmlFor="scoreBlue">Score Blue Team</Label>
            <Input type="number" className="w-full p-2 border rounded" />
          </div>
          <div>
            <Label htmlFor="scoreRed">Score Red Team</Label>
            <Input type="number" className="w-full p-2 border rounded" />
          </div>
        </form>

        <section className="max-w-max mx-auto mt-2 space-x-2">
          <Button
            className="mt-4"
            disabled={!selectedBlueTeam || !selectedRedTeam}
            onClick={handleSwitchTeam}
            variant="outline"
          >
            Tukar
          </Button>
          <Button className="mt-4" onClick={toggleLock} variant="outline">
            {lock ? "Unlock" : "Lock"} Tim
          </Button>
          <Button
            className="mt-4"
            disabled={!selectedBlueTeam || !selectedRedTeam}
            onClick={(e) => {
              e.preventDefault();
              clearBlueTeam();
              clearRedTeam();
              clearSelectedBlueTeam();
              clearSelectedRedTeam();
            }}
            variant="destructive"
          >
            Reset
          </Button>
          <Button
            className="mt-4"
            disabled={!lock || !selectedBlueTeam || !selectedRedTeam}
            variant="default"
          >
            Sync
          </Button>
        </section>

        <div className="flex justify-between divide-x-2 max-w-screen-md  mx-auto">
          <section className="flex-1 p-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="timBlue">Nama Tim Blue</Label>
              <Select
                placeholder="Nama Tim Blue"
                options={options}
                onChange={setSelectedBlueTeam}
                isDisabled={lock}
                value={selectedBlueTeam}
              />
            </div>

            {/* Input Players */}
            <div className="mt-4">
              <h2 className="mt-10 border-b pb-2 text-xl font-semibold">Players</h2>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index}>
                      <Label htmlFor={`player${index}`}>Player {index + 1}</Label>
                      <Input
                        disabled={lock || !selectedBlueTeam}
                        type="text"
                        id={`player${index}`}
                        name={`player${index}`}
                        value={blueTeam ? blueTeam?.players[index] : ""}
                        onChange={(e) => {
                          const newPlayer = e.target.value;
                          setBlueTeam(newPlayer, index);
                        }}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </section>

          <section className="flex-1 text-right p-2">
            {/* Select Team */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="timRed">Nama Tim Red</Label>
              <Select
                isDisabled={lock}
                placeholder="Nama Tim Red"
                options={options}
                onChange={setSelectedRedTeam}
                value={selectedRedTeam}
              />
            </div>

            {/* Input Players */}
            <div className="mt-4">
              <h2 className="mt-10 border-b pb-2 text-xl font-semibold">Players</h2>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index}>
                      <Label htmlFor={`player${index}`}>Player {index + 1}</Label>
                      <Input
                        disabled={lock || !selectedRedTeam}
                        type="text"
                        id={`player${index}`}
                        name={`player${index}`}
                        value={redTeam ? redTeam?.players[index] : ""}
                        onChange={(e) => {
                          const newPlayer = e.target.value;
                          setRedTeam(newPlayer, index);
                        }}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </TabsContent>
  );
};

export default GeneralTab;
