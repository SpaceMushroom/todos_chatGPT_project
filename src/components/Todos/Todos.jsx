import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BsSearch } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import "./Todos.css";

const Todos = ({ handleFocusInput }) => {
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [cookies, setCookies] = useCookies(["todos"]);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [showInput, setShowInput] = useState(false);
  const todos = cookies.todos || [];

  useEffect(() => {
    let filteredList = todos;
    if (filter === "active") {
      filteredList = filteredList.filter((todo) => !todo.checked);
    } else if (filter === "completed") {
      filteredList = filteredList.filter((todo) => todo.checked);
    }

    if (searchValue) {
      filteredList = filteredList.filter((todo) =>
        todo.todo.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setFilteredTodos(filteredList);
  }, [todos, filter, searchValue]);

  const handleCheckboxChange = (index) => {
    const updatedFilteredTodos = [...filteredTodos];
    updatedFilteredTodos[index].checked = !updatedFilteredTodos[index].checked;
    setFilteredTodos(updatedFilteredTodos);
    setCookies("todos", updatedFilteredTodos, { path: "/" });
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFilterClick = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleSearchIconClick = () => {
    setShowInput(!showInput);
    setSearchValue("");
  };

  const activeTodosCount = filteredTodos.filter((todo) => !todo.checked).length;

  return (
    <div>
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index}>
            {filter !== "completed" && filter !== "active" && !showInput && (
              <input
                className="todoInput"
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleCheckboxChange(index)}
              />
            )}
            <span>{todo.todo}</span>
          </li>
        ))}
      </ul>
      <div className="bottomNav">
        <div className="searchContainer">
          <AiOutlinePlus className="plus-icon" onClick={handleFocusInput} />
          <BsSearch onClick={handleSearchIconClick} className="search-icon" />
          {showInput && (
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchInputChange}
              placeholder="Search..."
            />
          )}
          <p className="activeTodos">{activeTodosCount} items left</p>
        </div>
        <div className="filter-container">
          <button onClick={() => handleFilterClick("all")}>All</button>
          <button onClick={() => handleFilterClick("active")}>Active</button>
          <button onClick={() => handleFilterClick("completed")}>
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todos;
