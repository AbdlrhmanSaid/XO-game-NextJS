"use client";
import Cell from "./component/Cell";
import { useState, useEffect } from "react";

const winningCombos = [
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
  const [winningCells, setWinningCells] = useState<number[]>([]);
  const [gameHistory, setGameHistory] = useState<string[][]>([]);

  useEffect(() => {
    let foundWinner = false;

    winningCombos.forEach((combo) => {
      const circleWin = combo.every((cell) => cells[cell] === "circle");
      const crossWin = combo.every((cell) => cells[cell] === "cross");

      if (circleWin || crossWin) {
        setWinningCells(combo);
        setWinner(circleWin ? "O فاز! 🎉" : "X فاز! 🎊");
        foundWinner = true;
      }
    });

    if (!foundWinner && cells.every((cell) => cell !== "")) {
      setWinner("تعادل! 🤝");
    }
  }, [cells]);

  const resetGame = () => {
    setGameHistory([...gameHistory, cells]);
    setCells(["", "", "", "", "", "", "", "", ""]);
    setGo("circle");
    setWinner("");
    setWinningCells([]);
  };

  const undoMove = () => {
    if (gameHistory.length > 0) {
      const prevState = gameHistory[gameHistory.length - 1];
      setCells(prevState);
      setGameHistory(gameHistory.slice(0, -1));
      setGo(
        prevState.filter((cell) => cell !== "").length % 2 === 0
          ? "circle"
          : "cross"
      );
      setWinner("");
      setWinningCells([]);
    }
  };

  return (
    <div className="game-container">
      <h1 className="game-title">لعبة XO</h1>

      <div className={`game-board ${winner ? "game-ended" : ""}`}>
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
            isWinningCell={winningCells.includes(index)}
          />
        ))}
      </div>

      <div className="game-status">
        {!winner ? (
          <div className="turn-indicator">
            <span className={`turn ${go === "circle" ? "active" : ""}`}>O</span>
            <span>VS</span>
            <span className={`turn ${go === "cross" ? "active" : ""}`}>X</span>
            <p>دور {go === "circle" ? "O" : "X"}</p>
          </div>
        ) : (
          <div className="winner-message">
            <h2>{winner}</h2>
            <div className="game-buttons">
              <button className="btn play-again" onClick={resetGame}>
                لعب مرة أخرى
              </button>
              {gameHistory.length > 0 && (
                <button className="btn undo" onClick={undoMove}>
                  تراجع
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
