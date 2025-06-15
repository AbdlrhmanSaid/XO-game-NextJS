import { Dispatch, SetStateAction } from "react";

type CellProps = {
  id: number;
  go: string;
  setGo: Dispatch<SetStateAction<string>>;
  cells: string[];
  setCells: Dispatch<SetStateAction<string[]>>;
  cell: string;
  winner: string;
  isWinningCell: boolean;
};

const Cell = ({
  go,
  setGo,
  id,
  cells,
  setCells,
  cell,
  winner,
  isWinningCell,
}: CellProps) => {
  const handleCellChange = (cellToChange: string) => {
    const copyCells = [...cells];
    copyCells[id] = cellToChange;
    setCells(copyCells);
  };

  const handleClick = () => {
    if (winner) return;

    const notTaken = !cells[id];
    if (notTaken) {
      if (go === "circle") {
        handleCellChange("circle");
        setGo("cross");
      } else if (go === "cross") {
        handleCellChange("cross");
        setGo("circle");
      }
    }
  };

  return (
    <div
      className={`cell ${isWinningCell ? "winning-cell" : ""}`}
      onClick={handleClick}
      data-cell={cell}
    >
      <div className={`symbol ${cell}`}>
        {cell === "circle" ? (
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" />
          </svg>
        ) : cell === "cross" ? (
          <svg viewBox="0 0 100 100">
            <line x1="20" y1="20" x2="80" y2="80" />
            <line x1="80" y1="20" x2="20" y2="80" />
          </svg>
        ) : null}
      </div>
    </div>
  );
};

export default Cell;
