import { Team } from "@/types/interfaces";
import { useLocalStorage } from "usehooks-ts";

const useTeams = () => {
  const [teams, setTeams, clearTeams] = useLocalStorage<Team[] | []>("teams", []);

  return {
    teams,
    setTeams,
    clearTeams,
  };
};

export default useTeams;
