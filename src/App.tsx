import { useEffect, useState } from "react";

type Combination = {
  indexes: number[];
  orientation: string;
};

function App() {
  const [cells, setCells] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [turn, setTurn] = useState<number>(1);
  const [winningCombo, setWinningCombo] = useState<Combination | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

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
    if (winningCombo) {
      return;
    }
    setCells((prev) => {
      const updated = [...prev];
      updated[index] = turn;
      return updated;
    });
    setTurn(turn === 1 ? 2 : 1);
  };

  const checkWinner = () => {
    let winner: string | null = null;
    for (let combination of winningCombinations) {
      const { indexes } = combination;
      if (
        cells[indexes[0]] === 1 &&
        cells[indexes[1]] === 1 &&
        cells[indexes[2]] === 1
      ) {
        winner = "player 1";
        setWinner(winner.toUpperCase());
      }
      if (
        cells[indexes[0]] === 2 &&
        cells[indexes[1]] === 2 &&
        cells[indexes[2]] === 2
      ) {
        winner = "player 2";
        setWinner(winner.toUpperCase());
      }
      if (winner) {
        setWinningCombo(combination);
        break;
      }
    }
  };

  const checkDraw = () => {
    if (cells.every((c) => c !== 0)) {
      alert("draw");
    }
  };

  const reset = () => {
    setCells([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setTurn(1);
    setWinningCombo(null);
  };

  useEffect(() => {
    checkWinner();
    checkDraw();
  }, [cells]);

  useEffect(() => {
    if (winningCombo) {
      alert(`${winner} venceu`);
    }
  }, [winningCombo]);

  return (
    <div className="game h-screen bg-slate-800 flex flex-col gap-10 justify-center items-center">
      <div className="board grid grid-cols-3">
        {cells.map((cell, index) => (
          <span
            key={index}
            className={`relative border border-cyan-900 text-5xl w-20 h-20 ${cellBorderConditions(
              index
            )} ${
              winningCombo?.indexes.includes(index)
                ? winningCombo.orientation
                : undefined
            } flex items-center justify-center after:bg-slate-700 after:rounded-md`}
            onClick={() => handleClick(index)}
          >
            {cell === 1 && "🥓"}
            {cell === 2 && "🥚"}
          </span>
        ))}
      </div>
      <button
        className="bg-slate-900 px-4 py-2 rounded text-cyan-900 font-bold relative active:top-[1px]"
        onClick={reset}
      >
        RESET
      </button>
    </div>
  );
}

export default App;
