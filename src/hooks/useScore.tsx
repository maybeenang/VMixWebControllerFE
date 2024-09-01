import { useLocalStorage } from "usehooks-ts";

const useScore = () => {
  const [scores, setScores] = useLocalStorage<object>("scores", {
    blue: 0,
    red: 0,
  });

  return {
    scores,
    setScores,
  };
};

export default useScore;
