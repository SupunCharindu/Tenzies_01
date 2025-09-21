import { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

export default function App() {
  // State: array of dice values
  const [dice, setDice] = useState(GenerateAllNewDice);

  function hold(id) {
     console.log(id)
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
    setDice(GenerateAllNewDice());
  }

  // Map each die value to a Die component
  const diceElement = dice.map(dieObj => 
    <Die 
    key={dieObj.id} 
    isHeld={dieObj.isHeld} 
    value={dieObj.value} 
    hold={() => hold(dieObj.id)}
   />
  );
  // console.log(dice.map(die => die.id));

  return (
    <main>
      <div className="die-container">{diceElement}</div>
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
