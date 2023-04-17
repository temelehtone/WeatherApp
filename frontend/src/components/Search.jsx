import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const Search = ({ items, setSearchText }) => {

  const handleOnSelect = (item) => {
    // the item selected
    setSearchText(item.city)
  };


  const formatResult = (item) => {
    return (
      <span style={{ display: "block", textAlign: "left" }}>
        {item.name}
      </span>
    );
  };
  return (
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={items}
            onSelect={handleOnSelect}
            formatResult={formatResult}
            autoFocus
          />
        </div>
  );
};

export default Search;
