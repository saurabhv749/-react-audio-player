import React from "react";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";

const Search = () => {
  const clearIcon = React.useRef(null);
  const searchBar = React.useRef(null);
  const [query, setQuery] = React.useState("");

  const updateQuery = (e) => setQuery(e.target.value);
  const clearQuery = (e) => {
    //   reset array
    setQuery("");
    clearIcon.current.style.visibility = "hidden";
  };

  const handleKeyUp = (e) => {
    //   filter list on every word type
    if (
      searchBar.current.value &&
      clearIcon.current.style.visibility != "visible"
    ) {
      clearIcon.current.style.visibility = "visible";
    } else if (!searchBar.current.value) {
      clearIcon.current.style.visibility = "hidden";
    }
  };

  return (
    <div className="search">
      <AiOutlineSearch size={20} className="search-icon" />
      <input
        ref={searchBar}
        onKeyUp={handleKeyUp}
        value={query}
        onChange={updateQuery}
        placeholder="Search"
        type="text"
        className="search-input"
      />
      <p onClick={clearQuery} className="search-clear" ref={clearIcon}>
        <AiOutlineCloseCircle size={20} />
      </p>
    </div>
  );
};

export default Search;
