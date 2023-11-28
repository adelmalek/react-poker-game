import './ComputerCards.css';
import CardBack from '../../Image/back.jpg';

const ComputerCards = ({
    computerCards,
    computerChips,
    computerStatus
}) => {
    return (
        <div className="computer-cards">
            <p>Computer Chips: {computerChips}</p>
            <p>Computer Action: {computerStatus}</p>
            <div className="computer-cards-img">
                {computerCards.map(card => 
                    <div key={card.code}>
                        <img 
                            src={computerStatus === "Call" || computerStatus === "Check" ? card.image : CardBack} 
                            alt={card.code}/> 
                    </div>
                )}
            </div>
        </div>
    )
};

export default ComputerCards;