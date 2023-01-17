import { useEffect, useState } from "react";
import {
  INIT_HISTORY,
  PLAYER_ONE_ICON,
  PLAYER_TWO_ICON,
} from "../../constant/game";
import { calculateWinner } from "../../helper";

const useWinner = ({ currentSquares }) => {
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    setWinner(calculateWinner(currentSquares));
  }, [currentSquares]);

  return winner;
};

const useLocalData = () => {
  const [localData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("HISTORY")) || INIT_HISTORY;
    } catch {
      return INIT_HISTORY;
    }
  });

  return localData;
};

const useGame = () => {
  const [history, setHistory] = useState(useLocalData());
  const [step, setStep] = useState(history.length);

  const currentSquares = history[step - 1].squares;
  const winner = useWinner({ currentSquares });
  const next = step % 2 ? PLAYER_ONE_ICON : PLAYER_TWO_ICON;

  const jumpTo = (currentStep) => {
    setStep(currentStep + 1);
  };

  const handlePlay = (i) => {
    if (winner) return;

    const currentHistory = history.slice(0, step);
    const newSquares = currentSquares.slice();
    newSquares[i] = next;
    currentHistory.push({
      squares: newSquares,
    });
    setHistory(currentHistory);
    setStep(currentHistory.length);
  };

  useEffect(() => {
    localStorage.setItem("HISTORY", JSON.stringify(history));
  }, [history]);

  return { history, step, jumpTo, handlePlay, next, winner, currentSquares };
};

export default useGame;
