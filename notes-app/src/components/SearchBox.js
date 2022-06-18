import React, { useState } from "react"

function SearchBox(props) {
  const [searchValue, setSearchValue] = useState("");


  const searchValueOnChange = (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);

    props.onChangeHandler(searchValue);
  }


  return (
    <input
      className="search-box"
      type="text"
      value={searchValue}
      onChange={searchValueOnChange} />
  )
}

export default SearchBox;