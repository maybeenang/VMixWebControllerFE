import { Label } from "../ui/label";
import { TabsContent } from "../ui/tabs";
import Select from "react-select";

import { useMemo } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToggle } from "usehooks-ts";
import { useJudulMatch } from "@/hooks/useJudulMatch";

import VersusText from "../VersusText";
import { LockClosedIcon, LockOpen1Icon, SymbolIcon } from "@radix-ui/react-icons";
import { sendChangeJudulMatch, sendSyncCommandGeneral } from "@/lib/commands/commands";
import useTeams from "@/hooks/useTeams";
import { SelectedValue, Team } from "@/types/interfaces";
import { useBlueTeam } from "@/providers/BlueTeamProvider";
import { useRedTeam } from "@/providers/RedTeamProvider";

const GeneralTab = () => {
  const { blueTeam, setBlueTeam, selectedBlueTeam, setSelectedBlueTeam } = useBlueTeam();
  const { redTeam, setRedTeam, selectedRedTeam, setSelectedRedTeam } = useRedTeam();

  const { teams } = useTeams();

  const [judulMatch, setJudulMatch] = useJudulMatch();

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

      if (blueTeam && redTeam) {
        setBlueTeam(redTeam);
        setRedTeam(blueTeam);
      }
    }
  };

  // TODO: pisahin comand ke folder commands
  const handleSync = () => {
    sendSyncCommandGeneral(blueTeam, redTeam);
  };

  return (
    <TabsContent value="general">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center">General</h1>
        <VersusText />

        <form
          className="max-w-max mx-auto mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            sendChangeJudulMatch(judulMatch ?? "");
          }}
        >
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
        <form className="max-w-max mx-auto mt-2 flex gap-2">
          <div>
            <Label htmlFor="scoreBlue">Score Blue Team</Label>
            <Input type="number" className="w-full p-2 border rounded" />
          </div>
          <div>
            <Label htmlFor="scoreRed">Score Red Team</Label>
            <Input type="number" className="w-full p-2 border rounded" />
          </div>
        </form>

        <section className="max-w-max mx-auto mt-6 flex gap-2">
          <Button className="space-x-2" onClick={toggleLock} variant={lock ? "default" : "outline"}>
            {lock ? <LockOpen1Icon className="h-5 w-5" /> : <LockClosedIcon className="h-5 w-5" />}
            <span>{lock ? "Unlock" : "Lock"}</span>
          </Button>
          <Button
            className=""
            disabled={!selectedBlueTeam || !selectedRedTeam}
            onClick={handleSwitchTeam}
            variant="outline"
          >
            Tukar
          </Button>
          <Button
            className=""
            disabled={!selectedBlueTeam || !selectedRedTeam}
            onClick={(e) => {
              e.preventDefault();
            }}
            variant="destructive"
          >
            Reset
          </Button>
          <Button
            className="space-x-2"
            disabled={!lock || !selectedBlueTeam || !selectedRedTeam}
            variant="default"
            onClick={handleSync}
          >
            <SymbolIcon className="h-4 w-4" />
            <span>Sync</span>
          </Button>
        </section>

        <div className="flex justify-between divide-x-2 max-w-screen-md  mx-auto">
          <section className="flex-1 p-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="timBlue">Nama Tim Blue</Label>
              <Select
                placeholder="Nama Tim Blue"
                options={options}
                onChange={(e) => {
                  setSelectedBlueTeam(e as SelectedValue);
                }}
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
                        value={(blueTeam ? blueTeam?.players[index]?.name : "") || ""}
                        onChange={(e) => {
                          const newPlayer = e.target.value;

                          const newBlueTeam = {
                            ...blueTeam,
                            players: blueTeam?.players.map((player, i) =>
                              i === index ? { ...player, name: newPlayer } : player,
                            ),
                          };

                          setBlueTeam(newBlueTeam as Team);
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
                onChange={(e) => {
                  setSelectedRedTeam(e as SelectedValue);
                }}
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
                        value={(redTeam ? redTeam?.players[index]?.name : "") || ""}
                        onChange={(e) => {
                          const newPlayer = e.target.value;

                          const newRedTeam = {
                            ...redTeam,
                            players: redTeam?.players.map((player, i) =>
                              i === index ? { ...player, name: newPlayer } : player,
                            ),
                          };

                          setRedTeam(newRedTeam as Team);
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
