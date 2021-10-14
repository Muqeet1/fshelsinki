import React from "react";

const PersonForm = (props) => (
  <form>
    <div>
      name: <input value={props.name} onChange={props.nameChange} />
    </div>
    <div>
      number: <input value={props.number} onChange={props.numberChange} />
    </div>
    <div>
      <button type="submit" onClick={props.handleAdd}>
        Add
      </button>
    </div>
  </form>
);

export default PersonForm;
