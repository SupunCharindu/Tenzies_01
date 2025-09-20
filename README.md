# Tenzies Game (React)

A simple implementation of the classic dice game **Tenzies** built with React.

## How to Play

- Roll 10 dice.
- Try to get all dice to show the same number.
- (Game logic for holding dice and winning is not yet implemented in this version.)

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the app:**
   ```sh
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/App.jsx` — Main game logic and state.
- `src/Die.jsx` — Single die component.
- `src/index.css` — Styling.
- `src/main.jsx` — React entry point.

## Features

- Generates 10 dice with random values (1–6).
- Each die is displayed as a button.

---

## To Do

- Add "Hold" functionality for dice.
- Add a "Roll" button to re-roll unheld dice.
- Detect win condition.

---

## Screenshots

![Tenzies Screenshot](screenshot.png)

---

## License

MIT
