import React, { useState } from "react";
import Square from "./Square";
//import { getSymboleKeyboard } from "../utils/data";

interface KeyboardProps {
  onClickProps: (s: string) => void;
  promptNumberArrayStateProps: Array<String>;
  keyboardIsNumberProps: boolean;
  keyboardIsDisabledStateProps: boolean;
  calculResultStateProps: number;
}

function Keyboard(props: KeyboardProps) {
  function renderSquare(symbole: string) {
    return (
      <Square
        key={symbole}
        value={symbole}
        onClickProps={() => {
          return props.onClickProps(symbole);
        }}
        keyboardIsNumberProps={props.keyboardIsNumberProps}
        keyboardIsDisabledStateProps={props.keyboardIsDisabledStateProps}
      />
    );
  }

  function renderKeyboard(symbolesKeyboards: Array<string>) {
    return symbolesKeyboards.map((element) => {
      return renderSquare(element);
    });
  }

  const isDisabledDelete = () => {
    if (
      props.promptNumberArrayStateProps.length <= 0 &&
      props.calculResultStateProps == 0
    ) {
      return true;
    } else if (
      props.promptNumberArrayStateProps.length <= 1 &&
      props.calculResultStateProps != 0
    ) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div className="prompt">
        <p>&#123;{props.promptNumberArrayStateProps.join("")}&#125;</p>
      </div>
      <div className="keyboard">
        <div className="board-row">{renderKeyboard(["1", "2", "3", "+"])}</div>
        <div className="board-row">{renderKeyboard(["4", "5", "6", "-"])}</div>
        <div className="board-row">
          {renderKeyboard(["7", "8", "9", "*", "/"])}
        </div>
        <div className="board-row">
          <button
            className="buttonDelete"
            onClick={() => {
              return props.onClickProps("delete");
            }}
            disabled={isDisabledDelete()}
          >
            delete
          </button>
          <button
            className="buttonApply"
            onClick={() => {
              return props.onClickProps("apply");
            }}
            disabled={props.promptNumberArrayStateProps.length < 3}
          >
            apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default Keyboard;
