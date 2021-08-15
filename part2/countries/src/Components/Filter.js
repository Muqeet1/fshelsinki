import React from "react";

const Filter = ({ value, searchChange }) => {
  return (
    <div>
      <p>
        Filter shown with:
        <input value={value} onChange={searchChange} placeholder="Enter name" />
      </p>
    </div>
  );
};
export default Filter;
