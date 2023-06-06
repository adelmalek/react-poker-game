import "./Cards.css";

const Cards = ({
    cards,
    isGame,
    playerChips,
    computerChips,
    pot
}) => {
    return (
        <div className="cards-component-container">
            <div className="chips-counter">
                <div>{isGame && `Player: ${playerChips}`}</div>
                <div>{isGame && `Computer: ${computerChips}`}</div>
                <div>{isGame && `Pot: ${pot}`}</div>
            </div>
            <div className="cards-container">
                {cards.map(card => 
                <div key={card.code}>
                    <img src={card.image} alt={card.code}/>
                </div>
                )}
            </div>
        </div>
    )
};

export default Cards;