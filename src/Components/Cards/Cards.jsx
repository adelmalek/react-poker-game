import "./Cards.css";

import ComputerCards from "../ComputerCards/ComputerCards";

const Cards = ({
    isGame,
    playerCards,
    playerChips,
    computerChips,
    pot,
    computerCards,
    playerBetPlaced,
    computerShouldCall
}) => {
    return (
        <div className={isGame? "cards-component-container" : "not-visible"}>
            <div className="pot-container">{`Pot: ${pot}`}</div>
            <div className="cards">
                <div className="player-cards-container">
                    <div>{`Player Chips: ${playerChips}`}</div>
                    <div className="player-cards">
                        {playerCards.map(card => 
                        <div key={card.code}>
                            <img src={card.image} alt={card.code}/>
                        </div>
                        )}
                    </div>
                </div>
                <div className={playerBetPlaced? "computer-cards-container" : "not-visible"}>
                    <div>{`Computer Chips: ${computerChips}`}</div>
                    <div className="computer-cards">
                       <ComputerCards computerCards={computerCards} computerShouldCall={computerShouldCall}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Cards;