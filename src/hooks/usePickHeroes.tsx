import { useLocalStorage } from "usehooks-ts";

const usePickHeroes = () => {
  const [bluePickHeroes, setBluePickHeroes, clearBluePickHeroes] = useLocalStorage<string[]>(
    "bluePickHeroes",
    [],
  );

  const [redPickHeroes, setRedPickHeroes, clearRedPickHeroes] = useLocalStorage<string[]>(
    "redPickHeroes",
    [],
  );

  const clearPickHeroes = () => {
    clearBluePickHeroes();
    clearRedPickHeroes();
  };

  return {
    bluePickHeroes,
    setBluePickHeroes,
    redPickHeroes,
    setRedPickHeroes,
    clearPickHeroes,
  };
};

export default usePickHeroes;
