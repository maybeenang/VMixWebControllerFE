import { Label } from "../ui/label";
import { TabsContent } from "../ui/tabs";
import Select from "react-select";
import { SelectedValue, Team } from "@/types/interfaces";
import data from "../../../teams.json";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { socketClient } from "@/lib/utils";
import { useSocketStatus } from "@/hooks/useSocketStatus";

const GeneralTab = () => {
  const [selectedTeamBlue, setSelectedTeamBlue] = useState<SelectedValue | null>(null);
  const [blueTeam, setBlueTeam] = useState<Team | null>(null);

  const [selectedTeamRed, setSelectedTeamRed] = useState<SelectedValue | null>(null);
  const [redTeam, setRedTeam] = useState<Team | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [xml, setXml] = useState<string | null>(null);

  const [judulMatch, setJudulMatch] = useState<string>("");

  const socketStatus = useSocketStatus();

  const teams = data.map((team) => ({
    value: team.name,
    label: team.name,
    isDisabled: selectedTeamBlue?.value === team.name || selectedTeamRed?.value === team.name,
  })) as SelectedValue[];

  // handle switch team
  const handleSwitchTeam = () => {
    if (selectedTeamBlue && selectedTeamRed) {
      setSelectedTeamBlue(selectedTeamRed);
      setSelectedTeamRed(selectedTeamBlue);
    }
  };

  useEffect(() => {
    if (selectedTeamBlue) {
      const team = data.find((team) => team.name === selectedTeamBlue.value);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setBlueTeam(team);
    }
  }, [selectedTeamBlue]);

  useEffect(() => {
    if (selectedTeamRed) {
      const team = data.find((team) => team.name === selectedTeamRed.value);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setRedTeam(team);
    }
  }, [selectedTeamRed]);

  useEffect(() => {
    socketClient.on("xml", (data) => {
      setXml(data);
      const xmlDoc = new DOMParser().parseFromString(data, "text/xml");

      setJudulMatch(xmlDoc.querySelector("text[name='JUDUL MATCH.Text']")?.textContent ?? "");
    });

    return () => {
      socketClient.off("xml");
    };
  }, []);

  return (
    <TabsContent value="general">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center">General</h1>
        <section className="max-w-max mx-auto space-x-3">
          <span>{blueTeam?.name || "Team Blue"}</span>
          <span>VS</span>
          <span>{redTeam?.name || "Red Team"}</span>
        </section>

        <form
          className="max-w-max mx-auto mt-2"
          onSubmit={(e) => {
            e.preventDefault();

            if (socketStatus) {
              socketClient.emit("command", {
                Function: "SetText",
                Input: "draft1.gtzip",
                Value: judulMatch,
                SelectedName: "JUDUL MATCH.Text",
              });
            }
          }}
        >
          <p className="text-center font-semibold">Judul Match</p>
          <Input
            type="text"
            className="w-full p-2 border rounded"
            value={judulMatch}
            onChange={(e) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setJudulMatch(e.target.value);
            }}
          />
        </form>

        <section className="max-w-max mx-auto mt-2">
          <Button className="mt-4" disabled={!selectedTeamBlue || !selectedTeamRed} onClick={handleSwitchTeam}>
            Tukar
          </Button>
        </section>

        <div className="flex justify-between divide-x-2 max-w-screen-md  mx-auto">
          {/* Select Team */}
          <section className="flex-1 p-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="timBlue">Nama Tim Blue</Label>
              <Select
                placeholder="Nama Tim Blue"
                options={teams}
                onChange={setSelectedTeamBlue}
                value={selectedTeamBlue}
              />
            </div>

            {/* Input Players */}
            <div className="mt-4">
              <h2 className="mt-10 border-b pb-2 text-xl font-semibold">Players</h2>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index}>
                      <Label htmlFor={`player${index}`}>Player {index + 1}</Label>
                      <Input
                        type="text"
                        id={`player${index}`}
                        name={`player${index}`}
                        value={blueTeam?.players[index] ? blueTeam?.players[index] : ""}
                        onChange={(e) => {
                          const newPlayer = e.target.value;
                          setBlueTeam((prev) => {
                            if (prev) {
                              return {
                                ...prev,
                                players: prev.players.map((player, i) => (i === index ? newPlayer : player)),
                              };
                            }
                            return prev;
                          });
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
                placeholder="Nama Tim Red"
                options={teams}
                onChange={setSelectedTeamRed}
                value={selectedTeamRed}
              />
            </div>

            {/* Input Players */}
            <div className="mt-4">
              <h2 className="mt-10 border-b pb-2 text-xl font-semibold">Players</h2>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index}>
                      <Label htmlFor={`player${index}`}>Player {index + 1}</Label>
                      <Input
                        type="text"
                        id={`player${index}`}
                        name={`player${index}`}
                        value={redTeam?.players[index] ? redTeam?.players[index] : ""}
                        onChange={(e) => {
                          const newPlayer = e.target.value;
                          setRedTeam((prev) => {
                            if (prev) {
                              return {
                                ...prev,
                                players: prev.players.map((player, i) => (i === index ? newPlayer : player)),
                              };
                            }
                            return prev;
                          });
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
