import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

const useBanHeroes = () => {
  const [blueBanHeroes, setBlueBanHeroes, clearBlueBanHeroes] = useLocalStorage<string[]>(
    "blueBanHeroes",
    [],
  );

  const [redBanHeroes, setRedBanHeroes, clearRedBanHeroes] = useLocalStorage<string[]>(
    "redBanHeroes",
    [],
  );

  const clearBanHeroes = useCallback(() => {
    clearBlueBanHeroes();
    clearRedBanHeroes();
  }, [clearBlueBanHeroes, clearRedBanHeroes]);

  return {
    blueBanHeroes,
    setBlueBanHeroes,
    redBanHeroes,
    setRedBanHeroes,
    clearBanHeroes,
  };
};

export default useBanHeroes;
