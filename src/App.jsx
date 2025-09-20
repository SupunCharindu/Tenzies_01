import Die from "./Die";

function GenerateAllNewDice() {
  return new Array(10).fill(0).map(() => Math.ceil(Math.random() * 6));
}

console.log(GenerateAllNewDice());

export default function App() {
  return (
    <main>
      <div className="die-container">
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
      </div>
    </main>
  );
}
