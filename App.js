import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);
    const [roll, setRoll] = React.useState(0);
    const [time,setTime] = React.useState(0);
    const[isTimerRunning,setIsTimerRunning] = React.useState(true)

    React.useEffect(() => {
        let timer;
        if (isTimerRunning) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        // Clear timer when the component unmounts or the game ends
        return () => clearInterval(timer);
    }, [isTimerRunning]);

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue);
        if (allHeld && allSameValue) {
            setTenzies(true);
            setIsTimerRunning(false); // Stop timer on win
        }
    }, [dice]);

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        };
    }
    let startTime
    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie());
        }
        return newDice;
    }
    
    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateNewDie();
            }));
            setRoll(prevRoll => prevRoll + 1); // increment Roll
        } else {
            setTenzies(false);
            setDice(allNewDice());
            setRoll(0); // Reset Roll for a new game
            setTime(0); // Reset time for a new game
            setIsTimerRunning(true); // Start the timer for the new game
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
        }));
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ));
    
    return (
        <main>
            {
                tenzies && 
                <Confetti 
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
            }
            <h1 className="title">Tenzies</h1>
            <div className="score-board">
                <p className="roll">Roll: {roll}</p> |
                <p className="time">Time: {time}s</p>
            </div>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    );
}
