import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "rgb(255, 24, 134)" : "white"
    }
    const dots = [];
    function renderDice(){
        let cls = "odd-"

        if(props.value%2==0){
            cls="even-"
        }

        for(let i=1;i<=props.value;i++){
            dots.push(<div className={`die-num ${cls}${i}`}></div>)
        }
        return dots
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            {renderDice()}
        </div>
    )
}