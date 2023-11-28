import './Slider.css';

const Slider = ({
    sliderValue,
    setSliderValue,
    pot,
    setPot,
    playerChips,
    setPlayerChips,
    setPlayerBetPlaced,
    computerChips,
    setComputerChips,
    setComputerStatus,
    computerShouldCall
}) => {
    function bet() {
        setPlayerBetPlaced(true);
        setPlayerChips(playerChips - sliderValue);
        setPot(pot + sliderValue);
        if (pot === 3 && sliderValue === 1) {
            setComputerStatus("Check");
        } else if (computerShouldCall()) {
            setComputerStatus("Call");
            setComputerChips(computerChips => computerChips - sliderValue + 1);
            setPot(pot => pot + sliderValue - 1);
        } else {
            setComputerStatus("Fold")
        }
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