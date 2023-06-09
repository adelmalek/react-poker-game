import CardBackground from "../../Image/back.png";
import "./ComputerCards.css";

const ComputerCards = ({ computerCards, computerShouldCall }) => {
    return (
        <div className="computer-cards">
            {computerCards.map(card => 
            <div key={card.code}>
                <img src={computerShouldCall() ? card.image: CardBackground} alt={card.code}/>
            </div>
            )}
        </div>
    )
};

export default ComputerCards;