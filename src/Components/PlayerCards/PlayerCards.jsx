import React from 'react';
import './PlayerCards.css';

const PlayerCards = ({
    playerCards, 
    /*playerChips*/
}) => {
    return(
        <div className="player-cards">
            <p>Player Chips: {/*playerChips*/}</p>
            <div className="player-cards-img">
                {playerCards.map(card => 
                    <div key={card.code}>
                        <img src={card.image} alt={card.code}/>
                    </div>
                )}
            </div>
        </div>
    )
};

export default PlayerCards;