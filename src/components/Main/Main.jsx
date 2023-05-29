import React, { useRef, useState, useEffect } from "react";
import Input from "../Input/Input";
import Todos from "../Todos/Todos";
import { useCookies } from "react-cookie";
import "./Main.css";

const Main = () => {
  const [todos, setTodos] = useState([]);
  const [cookies, setCookie] = useCookies(["todos"]);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedTodos = cookies.todos;
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    setCookie("todos", todos, { path: "/" });
  }, [todos, setCookie]);

  const handleAddNewTodo = (todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const handleFocusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div className="main">
      <h1>THINGS TO DO</h1>
      <div>
        <Input addNewTodo={handleAddNewTodo} inputRef={inputRef} />
        <Todos handleFocusInput={handleFocusInput} />
      </div>
    </div>
  );
};

export default Main;
