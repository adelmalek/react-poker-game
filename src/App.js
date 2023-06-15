import './App.css';
import { useState, useEffect } from "react";

import Slider from "./Components/Slider/Slider";
import Cards from "./Components/Cards/Cards";
import CommunityCards from "./Components/CommunityCards/CommunityCards";

function App() {
  const [deckId, setDeckId] = useState(null);
  const [isGame, setIsGame] = useState(false);
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [playerChips, setPlayerChips] = useState(100);
  const [computerChips, setComputerChips] = useState(100);
  const [pot, setPot] = useState(0);
  const [playerBetPlaced, setPlayerBetPlaced] = useState(false);
  const [communityCards, setCommunityCards] = useState([]);
  const [winners, setWinners] = useState([]);
  const [win, setWin] = useState("");
  
  const API_KEY = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
  const DRAW_CARDS = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

  useEffect(() => {
    getDeckId()
  }, []);

  function getDeckId() {
    fetch(API_KEY)
      .then(res => res.json())
      .then(datas => setDeckId(datas.deck_id))
      .catch(error => console.log(error))
  };

  function initial() {
    setIsGame(true);
    setPlayerCards([]);
    setComputerCards([]);
    setCommunityCards([]);
    setPlayerChips(99);
    setComputerChips(98);
    setPot(3);
    setPlayerBetPlaced(false);
    setWinners([]);
    setWin("");
  }

  function cardsOfPlayer() {
    if (deckId === null) return;
    fetch(DRAW_CARDS)
      .then(res => res.json())
      .then(datas => setPlayerCards(datas.cards))
      .catch(error => console.log(error));
  };

  function cardsOfComputer() {
    if (deckId === null) return;
    fetch(DRAW_CARDS)
      .then(res => res.json())
      .then(datas => setComputerCards(datas.cards))
      .catch(error => console.log(error));
  };

  function showdown() {
    if (deckId === null) return;
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`)
      .then(res => res.json())
      .then(datas => setCommunityCards(datas.cards))
      .catch(error => console.log(error));
  };

  function shuffleCards() {
    initial();
    cardsOfPlayer();
    cardsOfComputer();
    showdown();
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
    value === 99 ? setComputerChips(0) : setComputerChips(computerChips - value);
    setPot(pot => pot + value);
  }

  function computerChipsAfterFold() {
    setPlayerChips(playerChips + pot);
    setPot(0)
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
      .then(datas => setWinners(datas))
      .catch(error => console.log(error))
  };

  function displayWinners() {
    const player = cardsCodeToString(playerCards);
    const computer = cardsCodeToString(computerCards);

    console.log(player, computer, winners.winners)

    /*const winner =  winners.map(winner => 
      winner.winners.cards === player ? "PLAYER" : 
      winner.winners.cards === computer? "COMPUTER" : 
      "DRAWS")

    winner.map(win => 
        winnerIs(win),
        setChips(win)
    );*/
  };

  function winnerIs(winner) {
    setWin(winner);
  };

  function setChips(win) {
    if (win === "PLAYER") {
      setPlayerChips(playerChips + pot);
      setPot(0);
    }
    
    if (win === "COMPUTER") {
      setComputerChips(computerChips + pot)
      setPot(0)
    }

    if (win === "DRAWS") {
      setPlayerChips(100);
      setComputerChips(100);
      setPot(0);
    }
  };

  return (
    <div className="App">
      <h1>P&#9824;ker</h1>
      <button className="newgame-btn" onClick={() => shuffleCards()}>New Game</button>
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
            computerChipsAfterFold={computerChipsAfterFold}
            getWinner={getWinner}
          />
        ) : ""}
      </div>
      <Cards
        isGame={isGame}
        playerCards={playerCards}
        playerChips={playerChips} 
        computerCards={computerCards}
        computerChips={computerChips} 
        pot={pot}
        playerBetPlaced={playerBetPlaced}
        computerShouldCall={computerShouldCall}
        computerChipsAfterFold={computerChipsAfterFold}
      />
      <CommunityCards 
        communityCards={communityCards}
        playerBetPlaced={playerBetPlaced}
        computerShouldCall={computerShouldCall}
        winners={winners}
        displayWinners={displayWinners}
        win={win}
      />
    </div>
  );
};

export default App;
