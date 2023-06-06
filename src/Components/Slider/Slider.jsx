import "./Slider.css";
import { useState } from "react";

const Slider = ({playerChips, setPlayerChips, pot, setPot}) => {
    const [sliderValue, setSliderValue] = useState(50);
    const [max, setMax] = useState(100);

    const handleBetClick = () => {
        setPlayerChips(playerChips - sliderValue);
        setPot(pot + sliderValue);
        setMax(max - sliderValue);
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
                <p>Value: <span id="demo">{sliderValue}</span></p>
                <button className="bet-btn" onClick={handleBetClick}>Bet</button>
            </div>
      </div>
    )
};

export default Slider;