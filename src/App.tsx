import { useEffect, useState } from "react";

type Combination = {
  indexes: number[];
  orientation: string;
};

function App() {
  const [cells, setCells] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [turn, setTurn] = useState<number>(1);
  const [winningCombo, setWinningCombo] = useState<number[] | null>(null);

  const cellBorderConditions = (index: number) => {
    if (index === 0) {
      return "border border-t-0 border-l-0";
    }
    if (index === 1) {
      return "border border-t-0";
    }
    if (index === 2) {
      return "border border-t-0 border-r-0";
    }
    if (index === 3) {
      return "border border-l-0";
    }
    if (index === 5) {
      return "border border-r-0";
    }
    if (index === 6) {
      return "border border-b-0 border-l-0";
    }
    if (index === 7) {
      return "border border-b-0";
    }
    if (index === 8) {
      return "border border-b-0 border-r-0";
    }
  };

  const winningCombinations: Combination[] = [
    { indexes: [0, 1, 2], orientation: "horizontal" },
    { indexes: [3, 4, 5], orientation: "horizontal" },
    { indexes: [6, 7, 8], orientation: "horizontal" },

    // verticals
    { indexes: [0, 3, 6], orientation: "vertical" },
    { indexes: [1, 4, 7], orientation: "vertical" },
    { indexes: [0, 3, 6], orientation: "vertical" },

    // diagonals
    { indexes: [0, 4, 8], orientation: "diagonal-1" },
    { indexes: [2, 4, 6], orientation: "diagonal-2" },
  ];

  const handleClick = (index: number) => {
    if (cells[index] !== 0) {
      return;
    }
    console.log(index);
    setCells((prev) => {
      prev[index] = turn;
      console.log(prev);
      return prev;
    });
    setTurn(turn === 1 ? 2 : 1);
  };

  const checkWinner = () => {
    let winner: string;
    winningCombinations.map((wc) => {
      const { indexes } = wc;
      if (
        cells[indexes[0]] === 1 &&
        cells[indexes[1]] === 1 &&
        cells[indexes[2]] === 1
      ) {
        winner = "player 1";
      }
      if (
        cells[indexes[0]] === 2 &&
        cells[indexes[1]] === 2 &&
        cells[indexes[2]] === 2
      ) {
        winner = "player 2";
      }
      if (winner) {
        setWinningCombo(indexes);
      }
    });
  };

  useEffect(() => {
    checkWinner();
  }, [cells]);

  return (
    <div className="game h-screen bg-slate-800 flex justify-center items-center">
      <div className="board bg-gray-800 grid grid-cols-3 shadow-2xl rounded">
        {cells.map((cell, index) => (
          <span
            className={`cell border border-cyan-900 text-2xl sm:text-5xl w-20 h-20 ${cellBorderConditions(
              index
            )} flex items-center justify-center`}
            onClick={() => handleClick(index)}
          >
            {cell === 1 && "🤢"}
            {cell === 2 && "😡"}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
