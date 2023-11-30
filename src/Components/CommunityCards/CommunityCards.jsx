import './CommunityCards.css';

const CommunityCards = ({
    communityCards,
    displayCommunityCards
}) => {
    return (
        <div className={displayCommunityCards? "community-cards-container" : "community-cards-not-visible"}>
            {communityCards.map(card => 
                <div key={card.code}>
                    <img src={card.image} alt={card.code}/>
                </div>
            )}
        </div>
    )
};

export default CommunityCards;