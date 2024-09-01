import { SelectedValue, Team } from "@/types/interfaces";
import { useLocalStorage } from "usehooks-ts";
import useTeams from "./useTeams";

const useBlueTeam = () => {
  const { teams, setTeams } = useTeams();

  const [blueTeam, setBlueTeamT, clearBlueTeam] = useLocalStorage<Team | null>("blueTeam", null);

  const [selectedBlueTeam, setSelectedBlueTeamT, clearSelectedBlueTeam] =
    useLocalStorage<SelectedValue | null>("selectedBlueTeam", null);

  const setSelectedBlueTeam = (value) => {
    setSelectedBlueTeamT(value);
    setBlueTeamT(teams.find((team) => team.id.toString() == value.value) || null);
  };

  const setBlueTeam = (newPlayer, newPlayerIndex) => {
    if (blueTeam) {
      const newTeam = {
        ...blueTeam,
        players: [
          ...blueTeam.players.slice(0, newPlayerIndex),
          newPlayer,
          ...blueTeam.players.slice(newPlayerIndex + 1),
        ],
      };

      setBlueTeamT(newTeam);

      const newTeams = teams.map((team) => {
        if (team.id === blueTeam.id) {
          return newTeam;
        }

        return team;
      });

      setTeams(newTeams);
    }
  };

  return {
    blueTeam,
    setBlueTeam,
    setBlueTeamT,
    clearBlueTeam,
    selectedBlueTeam,
    setSelectedBlueTeam,
    clearSelectedBlueTeam,
  };
};

export default useBlueTeam;
