import { useState, useEffect } from "react";
import reactLogo from "../assets/react.svg";
import "../css/Game.css";
import Keyboard from "./Keyboard";
import { randomNumberInRange } from "../utils/helpers";

interface GameState {
  promptNumberArrayState: Array<String>;
  keyboardIsNumber: boolean;
  keyboardIsdisabled: boolean;
  calculResultState: number;
}

interface NumRange {
  min: number;
  max: number;
}

const numRange: NumRange = {
  min: -100,
  max: 100,
};
const numberToFound = randomNumberInRange(numRange.min, numRange.max);
let turnNbr = 0;

function Game() {
  const [promptNumberArrayState, setPromptNumberArrayState] = useState<
    string[]
  >([]);
  const [keyboardIsNumberState, setKeyboardIsNumberState] = useState(true);
  const [keyboardIsDisabledState, setKeyboardIsDisabledState] = useState(false);
  const [calculResultState, setCalculResultState] = useState(0);

  function handleClick(symbole: string) {
    let promptNumberArrayStateCopy = promptNumberArrayState;
    if (symbole == "delete") {
      promptNumberArrayStateCopy.pop();
      setPromptNumberArrayState(promptNumberArrayStateCopy);
      setKeyboardIsNumberState(!keyboardIsNumberState);
    } else if (symbole == "apply") {
      let result = Math.ceil(eval(promptNumberArrayStateCopy.join("")));
      setCalculResultState(result);
      setPromptNumberArrayState([result.toString()]);
      turnNbr++;
    } else {
      promptNumberArrayStateCopy.push(symbole);
      setPromptNumberArrayState(promptNumberArrayStateCopy);
      setKeyboardIsNumberState(!keyboardIsNumberState);
    }
  }

  useEffect(() => {
    setKeyboardIsDisabledState(promptNumberArrayState.length >= 3);
    if (calculResultState == numberToFound) {
      setKeyboardIsDisabledState(true);
    }
  });

  function gameStatus(): string {
    if (turnNbr == 0) {
      return "";
    } else if (calculResultState < numberToFound) {
      return "Is too low";
    } else if (calculResultState > numberToFound) {
      return " Is Too high";
    } else {
      return (
        "Congratulations ! You WIN !!!! You found the number in " +
        turnNbr +
        " Turn !"
      );
    }
  }

  return (
    <div className="Game">
      <h1>Find The Number !</h1>
      <h4>
        (The number is between {numRange.min} and {numRange.max})
      </h4>
      <div className="result">
        <h3>
          {calculResultState}
          <br />
          <div>{gameStatus()}</div>
        </h3>
      </div>
      <Keyboard
        onClickProps={(s: string) => handleClick(s)}
        promptNumberArrayStateProps={promptNumberArrayState}
        keyboardIsNumberProps={keyboardIsNumberState}
        keyboardIsDisabledStateProps={keyboardIsDisabledState}
        calculResultStateProps={calculResultState}
      />
    </div>
  );
}

export default Game;
