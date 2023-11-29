import './App.css';
import { useState, useEffect } from 'react';

import Slider from "./Components/Slider/Slider";
import PlayerCards from "./Components/PlayerCards/PlayerCards";
import ComputerCards from "./Components/ComputerCards/ComputerCards";
import CommunityCards from './Components/CommunityCards/CommunityCards';

function App() {
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [playerChips, setPlayerChips] = useState(100);
  const [playerStatus, setPlayerStatus] = useState("Call");
  const [playerBetPlaced, setPlayerBetPlaced] = useState(false);
  const [computerCards, setComputerCards] = useState([]);
  const [computerChips, setComputerChips] = useState(100);
  const [computerStatus, setComputerStatus] = useState(null);
  const [pot, setPot] = useState(0);
  const [sliderValue, setSliderValue] = useState(1);
  const [isGame, setIsGame] = useState(false);
  const [communityCards, setCommunityCards] = useState([]);

  const API_KEY = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
  const CARDS = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

  function initialState() {
    setPlayerCards([]);
    setPlayerChips(100);
    setPlayerStatus("Call");
    setPlayerBetPlaced(false);
    setComputerCards([]);
    setComputerChips(100);
    setComputerStatus(null);
    setPot(0);
    setSliderValue(1);
    setIsGame(true);
    setCommunityCards([]);
  }

  useEffect(() => {
    startGame();
  }, []);

  function startGame () {
    fetch(API_KEY)
      .then(res => res.json())
      .then(data => setDeckId(data.deck_id))
      .catch(error => console.log(error))
  };

  function newGame() {
    initialState();
    cardsOfPlayer();
    cardsOfComputer();
    postBlinds();
    showdown();
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

  function postBlinds() {
    setPlayerChips(playerChips => playerChips - 1);
    setComputerChips(computerChips => computerChips - 2);
    setPot(pot => pot + 3);
  };

  function displaySlider() {
    return (pot === 3 && playerChips === 99) || playerBetPlaced === false;
  };

  function computerShouldCall() {
    if (computerChips === 0) return true;
    
    const card1Value = computerCards[0].code[0];
    const card2Value = computerCards[1].code[0];
    const card1Suit = computerCards[0].code[1];
    const card2Suit = computerCards[1].code[1];

    return card1Value === card2Value || 
           ["0", "J", "Q", "K", "A"].includes(card1Value) ||
           ["0", "J", "Q", "K", "A"].includes(card2Value) ||
           (
              card1Suit === card2Suit && 
              Math.abs(Number(card1Value) - Number(card2Value)) <= 2
           );
  };

  function showdown() {
    if (deckId === null) return;

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`)
      .then(res => res.json())
      .then(datas => setCommunityCards(datas.cards))
      .catch(error => console.log(error));
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

      <section className={isGame? "sections" : "not-visible"}>

        <section className="section-1">

          <div className="pot-container">
            <div className="pot">Pot: {pot}</div>
          </div>
          <div className={displaySlider()? "slider-container" : "not-visible"}>
            <Slider 
              sliderValue={sliderValue} 
              setSliderValue={setSliderValue}
              pot={pot}
              setPot={setPot}
              playerChips={playerChips}
              setPlayerChips={setPlayerChips}
              setPlayerBetPlaced={setPlayerBetPlaced}
              computerChips={computerChips}
              setComputerChips={setComputerChips}
              setComputerStatus={setComputerStatus}
              computerShouldCall={computerShouldCall}
            />
          </div>

        </section>

        <section className="section-2">

          <div className="cards-container">
            <PlayerCards 
              playerCards={playerCards}
              playerChips={playerChips}
              playerStatus={playerStatus}
            />
            <ComputerCards 
              computerCards={computerCards}
              computerChips={computerChips}
              computerStatus={computerStatus}
            />
          </div>

          <div className="cards-container">
            <CommunityCards communityCards={communityCards} />
          </div>

        </section>

      </section>
    </div>
  );
}

export default App;
