import './CommunityCards.css';

const CommunityCards = ({communityCards}) => {
    return (
        <div className="community-cards-container">
            {communityCards.map(card => 
                <div key={card.code}>
                    <img src={card.image} alt={card.code}/>
                </div>
            )}
        </div>
    )
};

export default CommunityCards;