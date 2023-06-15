import "./CommunityCards.css";

const CommunityCards = ({ 
    communityCards, 
    playerBetPlaced, 
    computerShouldCall, 
    winners, 
    displayWinners,
    win
}) => {
    if (playerBetPlaced && computerShouldCall() && typeof winners !== "undefined") {
        displayWinners();
    };

    return (
        <div className={playerBetPlaced && computerShouldCall() ? 
            "community-cards-container" : "not-visible"}>
            <p>The winner is: {win}</p>
            <div className="community-cards">
                {communityCards.map(card => 
                    <div key={card.code}>
                        <img src={card.image} alt={card.code}/>
                    </div>
                )}
            </div>
        </div>
    )
};

export default CommunityCards;