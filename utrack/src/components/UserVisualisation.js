import React, { useEffect, useState } from "react";
import UserLineChart from "./UserLineChart";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserTable from "./UserTable";

const SliderWithTooltip = createSliderWithTooltip(Slider);

const UserVisualisation = ({ userData }) => {
  const [users, setUsers] = useState([]);
  // State variables for the different filters
  const [genderFilter, setGenderFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");
  const [minSpendFilter, setMinSpendFilter] = useState(0);

  // Filter funcs
  const genderFunc = (user) => {
    if (genderFilter === "All") {
      return true;
    } else {
      return user.gender === genderFilter;
    }
  };

  const regionFunc = (user) => {
    if (regionFilter === "All") {
      return true;
    } else {
      return user.region === regionFilter;
    }
  };

  const minSpendFunc = (user) => {
    return user.spend >= minSpendFilter;
  };

  // Apply all filter funcs
  const allFilterFunc = (user) => {
    return genderFunc(user) && regionFunc(user) && minSpendFunc(user);
  };

  // Filter users
  const filterUsers = () => {
    setUsers([...userData.filter(allFilterFunc)]);
  };

  // Methods to call when input fields change
  const handleMinSpendChange = (val) => {
    setMinSpendFilter(val);
  };

  const handleRegionChange = (e) => {
    setRegionFilter(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGenderFilter(e.target.value);
  };

  // Filter users when state changes
  useEffect(
    filterUsers,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [genderFilter, regionFilter, minSpendFilter]
  );

  return (
    // Using Router to display the chart on one page and the table on another, with the filter options always shown at the top
    <Router>
      <nav>
        <Link to="/" className="button" role="button">
          Chart
        </Link>
        <Link to="/table" className="button" role="button">
          Table
        </Link>
      </nav>
      <div>
        <div className="flexbox-container">
          <div className="slider">
            <label>Minimum spend</label>
            <SliderWithTooltip
              min={0}
              max={5000}
              style={{
                width: 700,
                margin: 40,
              }}
              marks={{
                0: "0",
                5000: "5000",
              }}
              onChange={handleMinSpendChange}
              defaultValue={minSpendFilter}
              tipProps={{ visible: true }}
            />
          </div>

          {/* Drop down enum for region filter */}
          <div>
            <div>
              <label for="region">Select Region:</label>
            </div>

            <select onChange={handleRegionChange} name="region" id="region">
              <option value="All">All</option>
              <option value="United States">United States</option>
              <option value="Europe">Europe</option>
              <option value="APAC">APAC</option>
              <option value="Latin America">Latin America</option>
            </select>
          </div>

          {/* Radio button for gender filter */}
          <div onChange={handleGenderChange.bind(this)}>
            <div>
              <label>Select Gender</label>
            </div>
            <input
              type="radio"
              id="all"
              name="gender"
              value="All"
              defaultChecked="true"
            />
            <label for="all">All</label>
            <br />
            <input type="radio" id="male" name="gender" value="Male" />
            <label for="male">Male</label>
            <br />
            <input type="radio" id="female" name="gender" value="Female" />
            <label for="female">Female</label>
          </div>
        </div>
      </div>
      {/* Two routes, one for the chart, one for the table */}
      <Routes>
        <Route
          path="/"
          element={<UserLineChart userData={users}></UserLineChart>}
        />
        <Route
          path="/table"
          element={<UserTable userData={users}></UserTable>}
        />
      </Routes>
    </Router>
  );
};

export default UserVisualisation;
