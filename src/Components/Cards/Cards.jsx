const Cards = ({
    cards,
    isGame,
    playerChips,
    computerChips,
    pot
}) => {
    return (
        <>
            <div className="cards-container">
                {cards.map(card => 
                <div key={card.code}>
                    <img src={card.image} alt={card.code}/>
                </div>
                )}
            </div>
            <div className="chips-counter">
                <div>{isGame && `Player: ${playerChips}`}</div>
                <div>{isGame && `Computer: ${computerChips}`}</div>
            </div>
            <div className="pot-container">
                <div>{isGame && `Pot: ${pot}`}</div>
            </div>
        </>
    )
};

export default Cards;