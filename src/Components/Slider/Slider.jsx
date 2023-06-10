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
    computerChipsAfterFold
}) => {
    const [sliderValue, setSliderValue] = useState(50);
    const [max, setMax] = useState(99);

    function handleBetClick() {
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
        <div className="bet-container">
            <div className="slide-container">
                <input 
                    type="range" 
                    min="1" 
                    max={max}
                    className="slider"
                    onChange={(e) => setSliderValue(e.target.valueAsNumber)} 
                />
                <p>Value: {sliderValue}</p>
                <button className="bet-btn" onClick={handleBetClick}>Bet</button>
            </div>
      </div>
    )
};

export default Slider;