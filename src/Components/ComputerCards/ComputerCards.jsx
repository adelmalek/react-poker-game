const ComputerCards = ({ computerCards }) => {
    return (
        <div className="computer-cards">
            {computerCards.map(card => 
            <div key={card.code}>
                <img src={card.image} alt={card.code}/>
            </div>
            )}
        </div>
    )
};

export default ComputerCards;