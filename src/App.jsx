import { useState, useRef, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

// Sound effect hooks
function useSound(url, volume = 0.5) {
  const audio = useRef(null);
  useEffect(() => {
    audio.current = new window.Audio(url);
    audio.current.volume = volume;
  }, [url, volume]);
  return () => {
    if (audio.current) {
      audio.current.currentTime = 0;
      audio.current.play();
    }
  };
}

export default function App() {
  // State: array of dice values
  const [dice, setDice] = useState(GenerateAllNewDice);
  const [timer, setTimer] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [bestTime, setBestTime] = useState(
    () => Number(localStorage.getItem("bestTime")) || null
  );
  const [lowestRolls, setLowestRolls] = useState(
    () => Number(localStorage.getItem("lowestRolls")) || null
  );
  const [showModal, setShowModal] = useState(false);
  const [muted, setMuted] = useState(true);
  const buttonRef = useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTiming && !gameWon) {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    } else if (gameWon) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTiming, gameWon]);

  // Handle best time and lowest rolls
  useEffect(() => {
    if (gameWon) {
      setIsTiming(false);
      if (!bestTime || timer < bestTime) {
        setBestTime(timer);
        localStorage.setItem("bestTime", timer);
      }
      if (!lowestRolls || rollCount < lowestRolls) {
        setLowestRolls(rollCount);
        localStorage.setItem("lowestRolls", rollCount);
      }
      buttonRef.current.focus();
    }
  }, [gameWon]);

  // Sound hooks
  // const playClick = useSound(process.env.PUBLIC_URL + "/sounds/click.mp3");
  // const playRoll = useSound(process.env.PUBLIC_URL + "/sounds/roll.mp3");
  // const playWin = useSound(process.env.PUBLIC_URL + "/sounds/win.mp3");

  function hold(id) {
    // Start timer if not already started
    if (!isTiming && timer === 0) setIsTiming(true);
    if (!muted) playClick();
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  // Generates an array of 10 random numbers between 1 and 6
  function GenerateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
      rolling: false,
    }));
  }

  //roll dice button function
  function rollDice() {
    if (!gameWon) {
      if (!muted) playRoll();
      // Set rolling to true for unheld dice
      setDice((prevDice) =>
        prevDice.map((die) => (die.isHeld ? die : { ...die, rolling: true }))
      );
      setTimeout(() => {
        setDice((prevDice) =>
          prevDice.map((die) =>
            die.isHeld
              ? die
              : {
                  ...die,
                  value: Math.ceil(Math.random() * 6),
                  rolling: false,
                }
          )
        );
      }, 500); // Animation duration
      setRollCount((c) => c + 1);
    } else {
      setDice(GenerateAllNewDice);
      setTimer(0);
      setRollCount(0);
      setIsTiming(false);
    }
  }

  // Map each die value to a Die component
  const diceElement = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      isHeld={dieObj.isHeld}
      value={dieObj.value}
      hold={() => hold(dieObj.id)}
      rolling={dieObj.rolling}
    />
  ));

  // Helper to format time as mm:ss
  function formatTime(sec) {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  return (
    <main>
      {gameWon && <ReactConfetti />}
      {gameWon && (
        <div className="retro-banner">
          <span>🎉 YOU WIN! 🎉</span>
        </div>
      )}
      <button
        className="mute-btn"
        aria-label={muted ? "Unmute sounds" : "Mute sounds"}
        onClick={() => setMuted((m) => !m)}
      >
        {muted ? "🔇" : "🔊"}
      </button>
      <button
        className="help-btn"
        aria-label="Show instructions"
        onClick={() => setShowModal(true)}
      >
        ?
      </button>
      {showModal && (
        <div className="modal-bg" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>How to Play</h2>
            <p>
              Roll until all dice are the same. Click each die to freeze it at
              its current value between rolls.
              <br />
              <br />
              Try to win in the fewest rolls and shortest time!
            </p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="stats">
        <div>
          <strong>Time:</strong> {formatTime(timer)}
        </div>
        <div>
          <strong>Rolls:</strong> {rollCount}
        </div>
      </div>
      <div
        className="best-stats"
        style={{
          margin: "10px 0",
          padding: "8px",
          border: "1px solid #eee",
          borderRadius: "8px",
          background: "#f9f9f9",
        }}
      >
        <div>
          <strong>Best Time:</strong>{" "}
          {bestTime !== null ? formatTime(bestTime) : "--:--"}
        </div>
        <div>
          <strong>Lowest Rolls:</strong>{" "}
          {lowestRolls !== null ? lowestRolls : "--"}
        </div>
      </div>
      <div className="die-container">{diceElement}</div>
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
