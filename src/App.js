import './App.css';
import { useState, useEffect } from "react";

import Slider from "./Components/Slider/Slider";
import Cards from "./Components/Cards/Cards";

function App() {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [isGame, setIsGame] = useState(false);
  const [playerChips, setPlayerChips] = useState(100);
  const [computerChips, setComputerChips] = useState(100);
  const [pot, setPot] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);

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
    setIsGame(true);
    fetch(DRAW_CARDS)
      .then(res => res.json())
      .then(datas => setCards(datas.cards))
      .catch(error => console.log(error))
  };

  return (
    <div className="App">
      <h1>P&#9824;ker</h1>
      <button className="newgame-btn" onClick={() => drawCards()}>New Game</button>
      {cards.length === 2 && playerChips > 0 && pot === 0 ? (
        <Slider sliderValue={sliderValue} setSliderValue={setSliderValue}/>
      ) : ""}
      <Cards cards={cards} isGame={isGame} playerChips={playerChips} computerChips={computerChips} pot={pot}/>
    </div>
  );
};

export default App;
