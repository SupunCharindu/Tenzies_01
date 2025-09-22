import { useState, useRef, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

export default function App() {
  // State: array of dice values
  const [dice, setDice] = useState(GenerateAllNewDice);
  const buttonRef = useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function hold(id) {
    //  console.log(id)
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );

    //2nd way to do this toggle
    // setDice((prevDice) =>
    //   prevDice.map((die) => {
    //     if (die.id === id) {
    //       return { ...die, isHeld: !die.isHeld };
    //     } else {
    //       return die;
    //     }
    //   })
    // );
  }

  // Generates an array of 10 random numbers between 1 and 6
  function GenerateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  //roll dice button function
  function rollDice() {
    if (!gameWon) {
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.isHeld
            ? die
            : {
                ...die,
                value: Math.ceil(Math.random() * 6),
              }
        )
      );
    } else {
      setDice(GenerateAllNewDice);
    }
  }

  // Map each die value to a Die component
  const diceElement = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      isHeld={dieObj.isHeld}
      value={dieObj.value}
      hold={() => hold(dieObj.id)}
    />
  ));
  // console.log(dice.map(die => die.id));

  return (
    <main>
      {gameWon && <ReactConfetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{diceElement}</div>
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
