import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Space } from "antd";
import "./Search.css"; // Ensure this imports your search styles
import BlogContext from "../../context/BlogPost";
const { Search } = Input;
function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const { data } = useContext(BlogContext);

  // const onSearch = (value) => {
  //   setQuery(value);
  //   if (value.length > 0) {
  //     const re = new RegExp(value, "i");
  //     const filteredResults = data.filter((post) => re.test(post.title));
  //     setResults(filteredResults);
  //   } else {
  //     setResults([]);
  //   }
  // };

  const onSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      const re = new RegExp(value, "i");
      const filteredResults = data.filter((post) => re.test(post.title));
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="form_search" onSubmit={(e) => e.preventDefault()}>
      <Space direction="vertical" className="searchBar">
        <Search
          placeholder="Search by title..."
          allowClear
          onChange={onSearch}
          style={{
            width: 200,
          }}
          value={query}
        />
      </Space>
      {results.length > 0 && (
        <ul className="search_results">
          {results.map((result) => (
            <li key={result.id} onClick={() => handleResultClick(result.id)}>
              {result.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
