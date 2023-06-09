import './App.css';
import { useState, useEffect } from "react";

import Slider from "./Components/Slider/Slider";
import Cards from "./Components/Cards/Cards";

function App() {
  const [deckId, setDeckId] = useState(null);
  const [isGame, setIsGame] = useState(false);
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [playerChips, setPlayerChips] = useState(100);
  const [computerChips, setComputerChips] = useState(100);
  const [pot, setPot] = useState(0);
  const [playerBetPlaced, setPlayerBetPlaced] = useState(false);

  const API_KEY = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
  const DRAW_CARDS = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

  useEffect(() => {
    shuffleCards()
  }, []);

  function shuffleCards() {
    fetch(API_KEY)
      .then(res => res.json())
      .then(datas => setDeckId(datas.deck_id))
      .catch(error => console.log(error))
  };

  function postBlinds() {
    if (deckId === null) return;
    fetch(DRAW_CARDS)
      .then(res => res.json())
      .then(datas => setPlayerCards(datas.cards))
      .catch(error => console.log(error));
    setIsGame(true);
    setPlayerChips(99);
    setComputerChips(98);
    setPot(3);
    setPlayerBetPlaced(false);
    computerCardsAfterBet();
  };

  function computerCardsAfterBet() {
    if (deckId === null) return;
    fetch(DRAW_CARDS)
      .then(res => res.json())
      .then(datas => setComputerCards(datas.cards))
      .catch(error => console.log(error));
  };

  function computerShouldCall() {
    if (computerCards.length !== 2) return false;

    const card1Value = computerCards[0].code[0];
    const card2Value = computerCards[1].code[0];
    const card1Suit = computerCards[0].code[1];
    const card2Suit = computerCards[1].code[1]
    
    return card1Value === card2Value || 
           ["0", "J", "Q", "K", "A"].includes(card1Value) ||
           ["0", "J", "Q", "K", "A"].includes(card2Value) ||
           (
            card1Suit === card2Suit &&  
            Math.abs(Number(card1Value) - Number(card2Value)) <= 2
           );
  };

  function computerChipsAfterCall(value) {
    setComputerChips(computerChips - value);
    setPot(pot => pot + value);
  };

  return (
    <div className="App">
      <h1>P&#9824;ker</h1>
      <button className="newgame-btn" onClick={() => postBlinds()}>New Game</button>
      <div className="slider-container">
        {playerCards.length === 2 && playerChips > 0 && playerBetPlaced === false ? (
          <Slider
            playerChips={playerChips} 
            setPlayerChips={setPlayerChips}
            pot={pot}
            setPot={setPot}
            setPlayerBetPlaced={setPlayerBetPlaced}
            computerShouldCall={computerShouldCall}
            setComputerChips={setComputerChips}
            computerChipsAfterCall={computerChipsAfterCall}
          />
        ) : ""}
      </div>
      <Cards
        isGame={isGame}
        playerCards={playerCards}
        playerChips={playerChips} 
        computerChips={computerChips} 
        pot={pot}
        computerCards={computerCards}
        playerBetPlaced={playerBetPlaced}
        computerShouldCall={computerShouldCall}
      />
    </div>
  );
};

export default App;
