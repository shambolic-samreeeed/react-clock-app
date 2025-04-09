import React from "react";

const Button = ({ onClick, buttonType, buttonText }) => {
  return (
    <div>
      <button type="button" className={buttonType} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default Button;
