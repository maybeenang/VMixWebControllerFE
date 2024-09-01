import useBlueTeam from "@/hooks/useBlueTeam";
import { Button } from "../ui/button";
import { TabsContent } from "../ui/tabs";
import useRedTeam from "@/hooks/useRedTeam";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

import DraftCountDown from "../ui/draftcountdown";
import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import Sortable from "../Sortable";
import { useEffect, useState } from "react";
import { useToggle } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import useHeroNames from "@/hooks/useHeroNames";
import SelectHero from "../SelectHero";
import useBanHeroes from "@/hooks/useBanHeroes";
import usePickHeroes from "@/hooks/usePickHeroes";

const handleDragEnd = (event, setter) => {
  const { active, over } = event;

  if (active.id !== over.id) {
    setter((players) => {
      const o = players.indexOf(active.id);
      const n = players.indexOf(over.id);

      return arrayMove(players, o, n);
    });
  }
};

const DraftTab = () => {
  const { blueTeam, setBlueTeamT } = useBlueTeam();
  const { redTeam, setRedTeamT } = useRedTeam();
  const [blueTeamPlayers, setBlueTeamPlayers] = useState<string[]>([]);
  const [redTeamPlayers, setRedTeamPlayers] = useState<string[]>([]);

  const { redBanHeroes, blueBanHeroes, setBlueBanHeroes, setRedBanHeroes, clearBanHeroes } =
    useBanHeroes();
  const { bluePickHeroes, redPickHeroes, setBluePickHeroes, setRedPickHeroes, clearPickHeroes } =
    usePickHeroes();

  const [lock, toggleLock] = useToggle();

  const heroNames = useHeroNames().map((hero) => {
    return {
      label: hero.label,
      value: hero.value,
    };
  });

  useEffect(() => {
    setBlueTeamPlayers(blueTeam?.players || []);
    setRedTeamPlayers(redTeam?.players || []);

    return () => {
      setBlueTeamPlayers([]);
      setRedTeamPlayers([]);
    };
  }, [blueTeam, redTeam]);

  return (
    <TabsContent value="draft">
      <div className="p-4 max-w-screen-md mx-auto text-center">
        <h1 className="text-2xl font-bold">Draft</h1>
        <DraftCountDown />
      </div>

      {/* Button Controls */}
      <section className="max-w-max mx-auto mt-2 space-x-2">
        <Button className="mt-4" variant="outline" onClick={() => toggleLock()}>
          {lock ? "Unlock" : "Lock"}
        </Button>
        <Button className="mt-4" variant="destructive" onClick={clearBanHeroes}>
          Reset Ban
        </Button>
        <Button className="mt-4" variant="destructive" onClick={clearPickHeroes}>
          Reset Pick
        </Button>
        <Button
          className="mt-4"
          variant="default"
          onClick={(e) => {
            e.preventDefault();
            setBlueTeamT(blueTeam ? { ...blueTeam, players: blueTeamPlayers } : null);
            setRedTeamT(redTeam ? { ...redTeam, players: redTeamPlayers } : null);
          }}
        >
          Sync
        </Button>
      </section>

      <div className="flex flex-col sm:flex-row justify-between sm:divide-x-2 max-w-screen-2xl  mx-auto">
        <section className="flex-1 p-2">
          <h2 className="text-lg font-semibold">Blue Team</h2>
          <p>{blueTeam?.name}</p>

          {/* Drag n Drop Blue Team Players */}
          <DndContext onDragEnd={(e) => handleDragEnd(e, setBlueTeamPlayers)}>
            <SortableContext items={blueTeamPlayers || []} disabled={lock}>
              <div
                className={cn(
                  "bg-zinc-200 rounded-lg p-2 grid grid-cols-5 gap-1 mt-10 min-h-36",
                  lock && "opacity-50 pointer-events-none",
                )}
              >
                {blueTeamPlayers.slice(0, 6).map((player) => (
                  <Sortable key={player} id={player}>
                    <Card className="rounded-md h-full">
                      <CardContent className="p-2">
                        <CardDescription>{player}</CardDescription>
                      </CardContent>
                    </Card>
                  </Sortable>
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {/* Blue Team Ban Heroes */}
          <div>
            <h2 className="mt-10 border-b pb-2 text-xl font-semibold">Ban Blue Team</h2>

            <div className="grid grid-cols-5 gap-1 mt-4">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="flex flex-col">
                    <Label htmlFor={`ban${index}`}>Ban {index + 1}</Label>
                    <SelectHero
                      options={heroNames}
                      value={blueBanHeroes[index]}
                      setValue={(value) => {
                        setBlueBanHeroes((heroes) => {
                          const newHeroes = [...heroes];
                          newHeroes[index] = value;
                          return newHeroes;
                        });
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Blur Team Pick Heroes */}
          <div>
            <h2 className="mt-10 border-b pb-2 text-xl font-semibold">Pick Blue Team</h2>

            <div className="grid grid-cols-5 gap-1 mt-4">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="flex flex-col">
                    <Label htmlFor={`ban${index}`}>Pick {index + 1}</Label>
                    <SelectHero
                      options={heroNames}
                      value={bluePickHeroes[index]}
                      setValue={(value) => {
                        setBluePickHeroes((heroes) => {
                          const newHeroes = [...heroes];
                          newHeroes[index] = value;
                          return newHeroes;
                        });
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </section>
        <section className="flex-1 text-right p-2">
          <h2 className="text-lg font-semibold">Red Team</h2>
          <p>{redTeam?.name}</p>

          {/* Drag n Drop Red Team Players */}
          <DndContext onDragEnd={(e) => handleDragEnd(e, setRedTeamPlayers)}>
            <SortableContext items={redTeamPlayers || []} disabled={lock}>
              <div
                className={cn(
                  "bg-zinc-200 rounded-lg p-2 grid grid-cols-5 gap-1 mt-10 min-h-36",
                  lock && "opacity-50 pointer-events-none",
                )}
              >
                {redTeamPlayers.slice(0, 6).map((player) => (
                  <Sortable key={player} id={player}>
                    <Card className="rounded-md h-full">
                      <CardContent className="p-2">
                        <CardDescription>{player}</CardDescription>
                      </CardContent>
                    </Card>
                  </Sortable>
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {/* Red Team Ban Heroes */}
          <div>
            <h2 className="mt-10 border-b pb-2 text-xl font-semibold">Ban Red Team</h2>

            <div className="grid grid-cols-5 gap-1 mt-4">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="flex flex-col">
                    <Label htmlFor={`ban${index}`}>Ban {5 - index}</Label>
                    <SelectHero
                      options={heroNames}
                      value={redBanHeroes[index]}
                      setValue={(value) => {
                        setRedBanHeroes((heroes) => {
                          const newHeroes = [...heroes];
                          newHeroes[index] = value;
                          return newHeroes;
                        });
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Red Team Pick Heroes */}
          <div>
            <h2 className="mt-10 border-b pb-2 text-xl font-semibold">Pick Red Team</h2>

            <div className="grid grid-cols-5 gap-1 mt-4">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="flex flex-col">
                    <Label htmlFor={`ban${index}`}>Pick {5 - index}</Label>
                    <SelectHero
                      options={heroNames}
                      value={redPickHeroes[index]}
                      setValue={(value) => {
                        setRedPickHeroes((heroes) => {
                          const newHeroes = [...heroes];
                          newHeroes[index] = value;
                          return newHeroes;
                        });
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </TabsContent>
  );
};

export default DraftTab;
