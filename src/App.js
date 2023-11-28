import './App.css';
import { useState, useEffect } from 'react';

import Slider from "./Components/Slider/Slider";
import PlayerCards from "./Components/PlayerCards/PlayerCards";
import ComputerCards from "./Components/ComputerCards/ComputerCards";

function App() {
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [playerChips, setPlayerChips] = useState(100);
  const [playerStatus, setPlayerStatus] = useState("Call");
  const [computerCards, setComputerCards] = useState([]);
  const [computerChips, setComputerChips] = useState(100);
  const [computerStatus, setComputerStatus] = useState("Call");
  const [pot, setPot] = useState(0);
  const [sliderValue, setSliderValue] = useState(1);

  const API_KEY = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
  const CARDS = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

  function initialState() {
    setPlayerCards([]);
    setPlayerChips(100);
    setPlayerStatus("Call");
    setComputerCards([]);
    setComputerChips(100);
    setComputerStatus("Call");
    setPot(0);
    setSliderValue(1);
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
    return pot === 3 && playerChips === 99;
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

        <section className="section-1">
          <div className="pot-container">
            <div className="pot">Pot: {pot}</div>
          </div>
          <div className={displaySlider()? "slider-container" : "not-visible"}>
            <Slider 
              sliderValue={sliderValue} 
              setSliderValue={setSliderValue}
              playerChips={playerChips}
              setPlayerChips={setPlayerChips}
              pot={pot}
              setPot={setPot}
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
        </section>

      </section>
    </div>
  );
}

export default App;
