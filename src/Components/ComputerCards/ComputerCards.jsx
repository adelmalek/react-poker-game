import CardBackground from "../../Image/back.png";
import "./ComputerCards.css";

const ComputerCards = ({ computerCards, computerShouldCall }) => {
    return (
        <>
            {computerCards.map(card => 
            <div key={card.code}>
                <img src={computerShouldCall() ? card.image: CardBackground} alt={card.code}/>
            </div>
            )}
        </>
    )
};

export default ComputerCards;