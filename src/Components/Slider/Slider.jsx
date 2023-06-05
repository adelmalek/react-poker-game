import "./Slider.css";

const Slider = ({sliderValue, setSliderValue}) => {
    return (
        <div className="bet-container">
            <div className="slide-container">
                <input 
                    type="range" 
                    min="1" 
                    max="100"
                    className="slider"
                    onChange={(e) => setSliderValue(e.target.valueAsNumber)} 
                />
                <p>Value: <span id="demo">{sliderValue}</span></p>
            </div>
      </div>
    )
};

export default Slider;