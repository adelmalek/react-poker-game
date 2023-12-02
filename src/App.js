import './App.css';
import { useState, useEffect } from 'react';

import Slider from "./Components/Slider/Slider";
import PlayerCards from "./Components/PlayerCards/PlayerCards";
import ComputerCards from "./Components/ComputerCards/ComputerCards";
import CommunityCards from './Components/CommunityCards/CommunityCards';

function App() {
  const [deckId, setDeckId] = useState(null);
  const [isGame, setIsGame] = useState(false);
  const [playerCards, setPlayerCards] = useState([]);
  const [playerChips, setPlayerChips] = useState(100);
  const [playerStatus, setPlayerStatus] = useState("Call");
  const [playerBetPlaced, setPlayerBetPlaced] = useState(false);
  const [computerCards, setComputerCards] = useState([]);
  const [computerChips, setComputerChips] = useState(100);
  const [computerStatus, setComputerStatus] = useState(null);
  const [communityCards, setCommunityCards] = useState([]);
  const [displayCommunityCards, setDisplayCommunityCards] = useState(false);
  const [pot, setPot] = useState(0);
  const [sliderValue, setSliderValue] = useState(1);
  const [winner, setWinner] = useState(null);
  const [showWinner, setShowWinner] = useState(null);

  const API_KEY = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
  const CARDS = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

  function initialGame() {
    setPlayerChips(100);
    setComputerChips(100);

    initialState();
  };

  function initialState() {
    setIsGame(true);
    setPlayerCards([]);
    setPlayerStatus("Call");
    setPlayerBetPlaced(false);
    setComputerCards([]);   
    setComputerStatus(null);
    setCommunityCards([]);
    setDisplayCommunityCards(false);
    setPot(0);
    setSliderValue(1);
    setWinner(null);
    setShowWinner(null);
  };

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
    initialGame();
    cardsOfPlayer();
    cardsOfComputer();
    postBlinds();
    showdown();

    if (computerChips === 0 || computerChips === 1 || playerChips === 0 || playerChips === 1) {
      setTimeout(() => {
        getWinner();
      }, 1000)
    }
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

  function showdown() {
    if (deckId === null) return;

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`)
      .then(res => res.json())
      .then(datas => setCommunityCards(datas.cards))
      .catch(error => console.log(error));
  };

  function postBlinds() {
    setPlayerChips(playerChips => playerChips - 1);
    if (computerChips === 1 || 
        computerChips === 0 || 
        playerChips === 1 || 
        playerChips === 0) {
      setComputerChips(computerChips => computerChips - 1);
      setPot(pot => pot + 2)
      setComputerStatus("Check");
      setPlayerBetPlaced(true);
      setDisplayCommunityCards(true);
    } else {
      setComputerChips(computerChips => computerChips - 2);
      setPot(pot => pot + 3);
    }

    console.log(pot, playerChips)
  };

  function displaySlider() {
    if ((pot === 3 && playerChips === 99) || playerBetPlaced === false) {
      return true;
    }

    return false;
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

  function cardsCodeToString(cards) {
    return cards.map(card => card.code[0] === "0" ? "1" + card.code : card.code).toString();
  };

  function getWinner() {
    const community = cardsCodeToString(communityCards);
    const player = cardsCodeToString(playerCards);
    const computer = cardsCodeToString(computerCards);

    fetch(`https://api.pokerapi.dev/v1/winner/texas_holdem?cc=${community}&pc[]=${player}&pc[]=${computer}`)
      .then(res => res.json())
      .then(datas => setWinner(datas.winners))
      .catch(error => console.log(error))
  };

  function displayWinner() {
    if ((computerStatus === "Fold") || (playerBetPlaced === false)) return;

    if (pot === 0 || pot === 2) {
      getWinner();
    }

    const player = cardsCodeToString(playerCards);
    const computer = cardsCodeToString(computerCards);
    
    if (winner === undefined) {
      setShowWinner("DRAW");
      setPlayerChips(playerChips + (pot / 2));
      setComputerChips(computerChips + (pot / 2));
      setPot(0);
    } else if (winner[0].cards === player) {
      setShowWinner("PLAYER");
      setPlayerChips(playerChips + pot);
      setPot(0);
    } else if (winner[0].cards === computer) {
      setShowWinner("COMPUTER")
      setComputerChips(computerChips + pot);
      setPot(0);
    }
  };

  function newHand() {
    if ( (showWinner === "DRAW" ||
          showWinner === "PLAYER" ||
          showWinner === "COMPUTER" ||
          computerStatus === "Fold")  &&
         (computerChips > 0 && playerChips > 0)
    ) {
      initialState();
      cardsOfPlayer();
      cardsOfComputer();
      postBlinds();
      showdown();
    }

    if (computerChips === 0 || computerChips === 1) {
      setTimeout(() => {
        getWinner();
      }, 1000)
    }
  };

  return (
    <div className="App">

      <header className="header">
        <h1>P&#9824;ker</h1>
        <div>
          <button className="glow-on-hover"  onClick={newGame}>New Game</button>
          <button className="glow-on-hover"  onClick={newHand}>New Hand</button>
        </div>
      </header>

      <section className={isGame? "sections" : "not-visible"}>

        <section className="section-1">

          <div className="pot-container">
            <div className="pot">Pot: {pot}</div>
          </div>
          <div className={displaySlider()? "slider-container" : "slider-not-visible"}>
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
              setDisplayCommunityCards={setDisplayCommunityCards}
              getWinner={getWinner}
            />
          </div>
          <div className="win-container">
            <button className="glow-on-hover" onClick={displayWinner}>The Winner Is:</button>
            <p className="win">{showWinner}</p>
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
            <CommunityCards 
              communityCards={communityCards}
              displayCommunityCards={displayCommunityCards}
            />
          </div>

        </section>

      </section>
    </div>
  );
}

export default App;
