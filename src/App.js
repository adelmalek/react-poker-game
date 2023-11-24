import './App.css';
import { useState, useEffect } from 'react';

import PlayerCards from "./Components/PlayerCards/PlayerCards";

function App() {
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);

  const API_KEY = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
  const CARDS = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

  useEffect(() => {
    startGame()
  }, []);

  function startGame () {
    fetch(API_KEY)
      .then(res => res.json())
      .then(data => setDeckId(data.deck_id))
      .catch(error => console.log(error))
  };

  function newGame() {
    cardsOfPlayer();
  };

  function cardsOfPlayer() {
    if (deckId === null) return;

    fetch(CARDS)
      .then(res => res.json())
      .then(data => setPlayerCards(data.cards))
      .catch(error => console.log(error))
  };

  function cardsOfComputer() {
    if (deckId === null) return;

    fetch(CARDS)
      .then(res => res.json())
      .then(data => setComputerCards(data.cards))
      .catch(error => console.log(error))
  };

  return (
    <div className="App">
      <header className="header">
        <h1>P&#9824;ker</h1>
        <div>
          <button className="glow-on-hover"  onClick={newGame}>New Game</button>
          <button className="glow-on-hover">New Hand</button>
        </div>
      </header>
      <section className="sections">
        <div className="section-player">
          <div className="cards-container">
            <PlayerCards 
              playerCards={playerCards}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
