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
    computerShouldCall,
    setDisplayCommunityCards,
    getWinner
}) => {
    function bet() {
        setPlayerBetPlaced(true);
        setPlayerChips(playerChips - sliderValue);
        setPot(pot + sliderValue);

        if (pot === 3 && sliderValue === 1) {
            computerCheck();
            getWinner();
        } else if (computerShouldCall()) {
            computerCall();
            getWinner();
        } else {
            computerFold();
        }
    };

    function computerCheck() {
        setTimeout(() => {
            setComputerStatus("Check");
        }, 1000)

        setTimeout(() => {
            setDisplayCommunityCards(true);
        }, 300)
    };

    function computerCall() {
        setTimeout(() => {
            setComputerChips(computerChips - sliderValue + 1);
            setPot(pot => pot + sliderValue - 1);
        }, 1000);

        setTimeout(() => {
            setComputerStatus("Call");
        }, 2000)

        setTimeout(() => {
            setDisplayCommunityCards(true);
        }, 3000)
    };

    function computerFold() {
        setComputerStatus("Fold");
        setPlayerChips(playerChips + pot);
        setPot(0);
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