import React, { useState, useEffect } from "react";
import Input from "../Input/Input";
import Todos from "../Todos/Todos";
import { useCookies } from "react-cookie";
import "./Main.css";

const Main = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [cookies, setCookie] = useCookies(["todos"]);

  useEffect(() => {
    // Load todos from cookies on component mount
    const savedTodos = cookies.todos;
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    // Save todos to cookies whenever todos array changes
    setCookie("todos", todos, { path: "/" });
  }, [todos, setCookie]);

  const handleAddNewTodo = (todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  return (
    <div className="main">
      <div>
        <h1>THINGS TO DO</h1>
        <div>
          <Input addNewTodo={handleAddNewTodo} />

          <Todos />
        </div>
      </div>
    </div>
  );
};

export default Main;
