import React, { useState } from "react"

function SearchBox(props) {
  const [searchValue, setSearchValue] = useState("");

  const searchValueOnChange = (e) => {
    setSearchValue(e.target.value);
  }

  return (
    <input className="search-box" type="text" value={searchValue} onChange={searchValueOnChange} />
  )
}

export default SearchBox;