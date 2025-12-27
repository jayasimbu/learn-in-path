import React, { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import '../../styles/Courses.css';
import '../../styles/SearchBar.css';

const SearchBar = ({ placeholder, onSearch, onApplyFilters, onCancelFilters, showFilters = true }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(new Set());

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const filterOptions = [
    'All Categories',
    'Design',
    'Development',
    'Data Science',
    'DevOps',
    'Beginner',
    'Intermediate',
    'Advanced'
  ];

  const categoryOptions = ['Design', 'Development', 'Data Science', 'DevOps'];

  const toggleFilter = (option) => {
    const next = new Set(selectedFilters);

    // Handle the special 'All Categories' behavior
    if (option === 'All Categories') {
      const allSelected = categoryOptions.every((c) => next.has(c));
      if (!allSelected) {
        categoryOptions.forEach((c) => next.add(c));
        next.add('All Categories');
      } else {
        categoryOptions.forEach((c) => next.delete(c));
        next.delete('All Categories');
      }
      setSelectedFilters(next);
      return;
    }

    // Toggle a category option and keep 'All Categories' in sync
    if (categoryOptions.includes(option)) {
      if (next.has(option)) next.delete(option);
      else next.add(option);

      const allNow = categoryOptions.every((c) => next.has(c));
      if (allNow) next.add('All Categories');
      else next.delete('All Categories');

      setSelectedFilters(next);
      return;
    }

    // Normal toggle for other options (levels)
    if (next.has(option)) next.delete(option);
    else next.add(option);
    setSelectedFilters(next);
  };

  const handleApply = () => {
    setShowFilterOptions(false);
    // Don't pass the 'All Categories' placeholder to consumers; only actual categories/levels
    const arr = Array.from(selectedFilters).filter((o) => o !== 'All Categories');
    if (onApplyFilters) onApplyFilters(arr);
    if (onSearch && searchTerm) onSearch(searchTerm);
  };

  const handleCancel = () => {
    setShowFilterOptions(false);
    setSelectedFilters(new Set());
    if (onCancelFilters) onCancelFilters();
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder={placeholder || "Search courses..."}
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        
        {showFilters && (
          <div className="filter-wrapper">
            <button 
              className="filter-btn"
              onClick={() => setShowFilterOptions(!showFilterOptions)}
            >
              <FaFilter />
              Filter
            </button>
            
            {showFilterOptions && (
              <div className="filter-dropdown">
                {filterOptions.map((option, index) => {
                  // compute checked for 'All Categories' by testing actual category selection
                  const checked = option === 'All Categories'
                    ? categoryOptions.every((c) => selectedFilters.has(c))
                    : selectedFilters.has(option);

                  return (
                    <label key={index} className="filter-option">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleFilter(option)}
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
                <div className="filter-actions">
                  <button type="button" className="btn btn-sm" onClick={handleApply}>Apply</button>
                  <button 
                    type="button"
                    className="btn btn-sm btn-outline cancel-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Show selected filters as chips */}
      {selectedFilters && selectedFilters.size > 0 && (
        <div className="selected-chips">
          {Array.from(selectedFilters)
            .filter((o) => o !== 'All Categories')
            .map((opt, i) => (
              <span key={i} className="selected-chip">{opt}</span>
            ))}
        </div>
      )}

      {/* Search suggestions */}
      {searchTerm && (
        <div className="search-suggestions">
          <div className="suggestion-item">
            <FaSearch className="suggestion-icon" />
            <span>Web Development Bootcamp</span>
          </div>
          <div className="suggestion-item">
            <FaSearch className="suggestion-icon" />
            <span>Computer Programming Basics</span>
          </div>
          <div className="suggestion-item">
            <FaSearch className="suggestion-icon" />
            <span>Computer Science Fundamentals</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;