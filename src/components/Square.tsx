import React from "react";

interface SquareProps {
  value: string;
  onClickProps: () => void;
  keyboardIsNumberProps: boolean;
  keyboardIsDisabledStateProps: boolean;
}

function Square(props: SquareProps) {
  const isDisabled = () => {
    if (props.keyboardIsNumberProps && !Number(props.value)) {
      return true;
    } else if (!props.keyboardIsNumberProps && Number(props.value)) {
      return true;
    } else if (props.keyboardIsDisabledStateProps) {
      return true;
    }
    return false;
  };

  return (
    <button
      className="square"
      onClick={props.onClickProps}
      disabled={isDisabled()}
    >
      {props.value}
    </button>
  );
}

export default Square;
