import React from 'react'
import './Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Nav = ({ searchValue, onSearchChange, onSearch, sortBy, onSortChange }) => {
  return (
    <div className="nav-container">
     <div className="title">
       <h1>Movie Index</h1>
     </div>
     <form className="search-container" onSubmit={(event) => {
       event.preventDefault()
       onSearch()
     }}>
       <input
         className="search-input"
         type="search"
         placeholder="Search movies..."
         value={searchValue}
         onChange={(event) => onSearchChange(event.target.value)}
       />
      <button className="search-icon" type="submit" aria-label="Search movies">
       <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon-glass" />
       </button>
     </form>
        <div className="sort-container">
        <select
          className="sort-select"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          aria-label="Sort movies"
        >
          <option value="title-asc">A to Z</option>
          <option value="title-desc">Z to A</option>
          <option value="year-desc">Newest to Oldest</option>
          <option value="year-asc">Oldest to Newest</option>
        </select>
       </div>
    </div>
  )
}

export default Nav
