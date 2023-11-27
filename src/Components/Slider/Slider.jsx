import './Slider.css';

const Slider = ({
    sliderValue,
    setSliderValue,
    playerChips,
    setPlayerChips,
    pot,
    setPot
}) => {
    function bet() {
        setPlayerChips(playerChips - sliderValue);
        setPot(pot + sliderValue);
    };

    return (
        <div className="container">
            <p>Value: {sliderValue}</p>
            <input 
                type="range" 
                min="1" 
                max={playerChips}
                className="range blue"
                value={sliderValue}
                onChange={(e) => setSliderValue(e.target.valueAsNumber)}
            />
            <button className="glow-on-hover"  onClick={bet}>Bet</button>
        </div>
    )
};

export default Slider;