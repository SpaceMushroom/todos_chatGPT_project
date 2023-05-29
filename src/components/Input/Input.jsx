import React, { useState } from "react";
import "./Input.css";

const Input = ({ addNewTodo, inputRef }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    const newTodo = {
      checked: false,
      todo: inputValue,
    };

    addNewTodo?.(newTodo);

    setInputValue("");
  };

  const handleCancel = () => {
    setInputValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSave();
    } else if (event.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div className="inputDiv">
      <input
        className="input"
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Input;
