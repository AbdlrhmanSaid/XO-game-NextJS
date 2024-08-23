"use client";
import Cell from "./component/Cell";
import { useState, useEffect } from "react";

const winnigCompos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Home() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [go, setGo] = useState("circle");
  const [winner, setWinner] = useState("");
  let isWinner = false;

  useEffect(() => {
    winnigCompos.forEach((combo) => {
      const circleWin = combo.every((cell) => cells[cell] === "circle");
      const crosseWin = combo.every((cell) => cells[cell] === "cross");

      if (circleWin) {
        setWinner("circle Winner ");
        isWinner = true;
      } else if (crosseWin) {
        setWinner("cross Winner");
        isWinner = true;
      }
    });
  }, [cells]);

  useEffect(() => {
    if (cells.every((cell) => cell !== "") && !isWinner) {
      setWinner("Drow");
    }
  }, [cells, isWinner]);

  return (
    <div className="main">
      <div className="gameBoard">
        {cells.map((cell, index) => (
          <Cell
            id={index}
            go={go}
            setGo={setGo}
            key={index}
            cells={cells}
            setCells={setCells}
            cell={cell}
            winner={winner}
          />
        ))}
        {!winner ? (
          <div
            style={{ marginTop: "10px", fontSize: "20px" }}
          >{`Its Now ${go} Turn`}</div>
        ) : (
          <>
            <div
              style={{
                marginTop: "10px",
                fontSize: "20px",
                width: "100%",
                textAlign: "center",
              }}
            >
              {winner ? winner : ""}
            </div>
            <div>
              <button
                className={winner ? "d-block againBtn" : "d-none againBtn"}
                onClick={() => window.location.reload()}
              >
                Again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
