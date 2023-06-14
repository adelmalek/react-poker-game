import "./CommunityCards.css";
import { useState } from "react";

const CommunityCards = ({ 
    communityCards, 
    playerBetPlaced, 
    computerShouldCall, 
    winners, 
    displayWinners,
    win
}) => {
    if (playerBetPlaced && computerShouldCall() && winners) {
        displayWinners();
    };

    return (
        <div className={playerBetPlaced && computerShouldCall() ? 
            "community-cards-container" : "not-visible"}>
            <h3>The winner is: {win}</h3>
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