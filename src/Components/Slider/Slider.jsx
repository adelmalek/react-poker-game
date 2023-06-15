import "./Slider.css";
import { useState } from "react";

const Slider = ({ 
    playerChips, 
    setPlayerChips, 
    pot, 
    setPot,
    setPlayerBetPlaced,
    computerShouldCall,
    computerChipsAfterCall,
    computerChipsAfterFold,
    getWinner
}) => {
    const [sliderValue, setSliderValue] = useState(50);
    const [max, setMax] = useState(99);

    function handleBetClick() {
        getWinner();
        setPlayerChips(playerChips - sliderValue);
        setPot(pot + sliderValue);
        setMax(max - sliderValue);
        setPlayerBetPlaced(true);
        alert(computerShouldCall() ? "Call": "Fold");
        if (computerShouldCall()) {
            computerChipsAfterCall(sliderValue);
        } else {
            computerChipsAfterFold(sliderValue);
        }
    };

    return (
        <div className="slide-container">
            <p>Value: {sliderValue}</p>
            <input 
                type="range" 
                min="1" 
                max={max}
                className="slider"
                onChange={(e) => setSliderValue(e.target.valueAsNumber)} 
            />
            <button className="bet-btn" onClick={handleBetClick}>Bet</button>
        </div>
    )
};

export default Slider;