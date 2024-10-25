

const Controls = ({ isPlaying, play, pause, next, previous }) => {
    return (
        <div className="controls">
            <button onClick={previous}>Previous</button>
            {isPlaying ? (
                <button onClick={pause}>Pause</button>
            ) : (
                <button onClick={play}>Play</button>
            )}
            <button onClick={next}>Next</button>
        </div>
    );
};

export default Controls;
