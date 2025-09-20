import { useState } from "react";
import Die from "./Die";

export default function App() {
  // State: array of dice values
  const [dice, setDice] = useState(GenerateAllNewDice);

  // Generates an array of 10 random numbers between 1 and 6
  function GenerateAllNewDice() {
    return new Array(10).fill(0).map(() => Math.ceil(Math.random() * 6));
  }

  //roll dice button function
  function rollDice(){
    setDice(GenerateAllNewDice())
  }


  // Map each die value to a Die component
  const diceElement = dice.map((num) => <Die value={num} />);

  return (
    <main>
      <div className="die-container">{diceElement}</div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  );
}
