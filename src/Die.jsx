import React from "react";

const pipCoords = {
  1: [[1, 1]],
  2: [
    [0, 0],
    [2, 2],
  ],
  3: [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  4: [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2],
  ],
  5: [
    [0, 0],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, 2],
  ],
  6: [
    [0, 0],
    [0, 2],
    [1, 0],
    [1, 2],
    [2, 0],
    [2, 2],
  ],
};

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#e0c97f" : "#fffbe7",
    animation: props.rolling ? "roll 0.5s" : "none",
    boxShadow: props.isHeld ? "inset 2px 2px 8px #c2a14a" : undefined,
    position: "relative",
  };

  // Create a 3x3 grid, fill with pips where needed
  const grid = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const filled = pipCoords[props.value].some(
        ([r, c]) => r === row && c === col
      );
      grid.push(
        <span
          key={`${row}-${col}`}
          className={`pip${filled ? " filled" : ""}`}
        />
      );
    }
  }

  return (
    <button
      style={styles}
      className="die-face"
      onClick={props.hold}
      aria-pressed={props.isHeld}
      aria-label={`Die showing ${props.value}${props.isHeld ? ", held" : ""}`}
      tabIndex={0}
    >
      {props.isHeld && (
        <span className="pin-icon" aria-hidden="true" title="Held">
          📌
        </span>
      )}
      <div className="pip-grid">{grid}</div>
    </button>
  );
}
