import { SelectedValue, Team } from "@/types/interfaces";
import { useLocalStorage } from "usehooks-ts";
import useTeams from "./useTeams";

const useRedTeam = () => {
  const { teams, setTeams } = useTeams();

  const [redTeam, setRedTeamT, clearRedTeam] = useLocalStorage<Team | null>("redTeam", null);

  const [selectedRedTeam, setSelectedRedTeamT, clearSelectedRedTeam] =
    useLocalStorage<SelectedValue | null>("selectedTeamRed", null);

  const setSelectedRedTeam = (value) => {
    setSelectedRedTeamT(value);
    setRedTeamT(teams.find((team) => team.id.toString() == value.value) || null);
  };

  const setRedTeam = (newPlayer, newPlayerIndex) => {
    if (redTeam) {
      const newTeam = {
        ...redTeam,
        players: [
          ...redTeam.players.slice(0, newPlayerIndex),
          newPlayer,
          ...redTeam.players.slice(newPlayerIndex + 1),
        ],
      };

      setRedTeamT(newTeam);

      const newTeams = teams.map((team) => {
        if (team.id === redTeam.id) {
          return newTeam;
        }

        return team;
      });

      setTeams(newTeams);
    }
  };

  return {
    redTeam,
    setRedTeam,
    clearRedTeam,
    setRedTeamT,
    selectedRedTeam,
    setSelectedRedTeam,
    clearSelectedRedTeam,
  };
};

export default useRedTeam;
