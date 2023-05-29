import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BsSearch } from "react-icons/bs";

const Todos = () => {
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [cookies, setCookies] = useCookies(["todos"]);
  const todos = cookies.todos || [];
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("all"); // Initial filter state
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    filterTodos();
  }, [todos, filter, searchValue]);

  const filterTodos = () => {
    let filteredList = todos;

    // Apply filter based on the selected filter option
    switch (filter) {
      case "all":
        break;
      case "active":
        filteredList = filteredList.filter((todo) => !todo.checked);
        break;
      case "completed":
        filteredList = filteredList.filter((todo) => todo.checked);
        break;
      default:
        break;
    }

    // Apply search filter based on the search input value
    if (searchValue) {
      filteredList = filteredList.filter((todo) =>
        todo.todo.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setFilteredTodos(filteredList);
  };

  const handleCheckboxChange = (index) => {
    const updatedFilteredTodos = [...filteredTodos];
    updatedFilteredTodos[index].checked = !updatedFilteredTodos[index].checked;

    // Update filteredTodos state and save to cookies
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

  return (
    <div>
      <div>
        <ul>
          {filteredTodos.map((todo, index) => (
            <li key={index}>
              {filter !== "completed" && filter !== "active" && !showInput && (
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => handleCheckboxChange(index)}
                />
              )}
              <span>{todo.todo}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="search-container">
          <BsSearch onClick={handleSearchIconClick} className="search-icon" />

          {showInput && (
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchInputChange}
              placeholder="Search..."
            />
          )}
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
