import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const API_KEY = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
  const DRAW_CARDS = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

  const shuffleCards = () => {
    fetch(API_KEY)
      .then(res => res.json())
      .then(datas => setDeckId(datas.deck_id))
      .catch(error => console.log(error))
  };

  useEffect(() => {
    shuffleCards()
  }, []);

  const drawCards = () => {
    if (deckId === null) return;
    fetch(DRAW_CARDS)
      .then(res => res.json())
      .then(datas => setCards(datas.cards))
      .catch(error => console.log(error))
  };

  return (
    <div className="App">
      <button className="newgame-btn" onClick={() => drawCards()}>New Game</button>
      <div className="cards-div">
        {cards.map(card => 
          <div key={card.code}>
            <img src={card.image} alt={card.code}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
