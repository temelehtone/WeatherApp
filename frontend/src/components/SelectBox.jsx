import React from "react";

const SelectBox = ({cities, setSelectedCity}) => {
  const changeCity = (e) => {
    e.preventDefault();
    setSelectedCity(e.target.value);
  };
  return (
    <select
      name="cities"
      id="cities"
      onChange={changeCity}
      className="p-4 rounded border-2"
    >
      <option value="all">All cities</option>
      {cities && cities.map((c) => (
        <option key={c.city} value={c.city}>
          {c.city}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
