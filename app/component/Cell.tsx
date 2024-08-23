import { Dispatch, SetStateAction } from "react";

type goTypes = {
  id: number;
  go: string;
  setGo: Dispatch<SetStateAction<string>>;
  cells: string[];
  setCells: Dispatch<SetStateAction<string[]>>;
  cell: string;
  winner: string;
};

const Cell = ({ go, setGo, id, cells, setCells, cell, winner }: goTypes) => {
  const handelCellChange = (cellToChange: string) => {
    let copyCell = [...cells];
    copyCell[id] = cellToChange;
    setCells(copyCell);
  };

  const handelClick = (e: any) => {
    const notTaken = !cells[id];
    if (notTaken) {
      if (go === "circle") {
        handelCellChange("circle");
        setGo("cross");
      } else if (go === "cross") {
        handelCellChange("cross");
        setGo("circle");
      }
    }
  };

  let stopFunction = false;

  if (winner !== "") {
    stopFunction = true;
  }

  return (
    <div className="square" onClick={!stopFunction ? handelClick : undefined}>
      <div className={`contain ${cell}`}>
        {cell ? (cell === "circle" ? "O" : "X") : ""}
      </div>
    </div>
  );
};

export default Cell;
