import React from "react";
import { useState, useEffect } from "react/cjs/react.development";

// Component for sortable table for the raw dataset
const UserTable = ({ userData }) => {
  // Keep track of which column we're sorting by
  const [sortedColumn, setSortedColumn] = useState("id");
  const [sortedUsers, setSortedUsers] = useState([]);
  // Bool to store whether we're sorting in ascending order or not
  const [ascending, setAscending] = useState(true);

  // Method to sort the array of user data by column
  const sortUsers = () => {
    var sortedArr = [...userData];
    if (sortedColumn === "id") {
      sortedArr.sort((x, y) => compareBy(x.id, y.id));
    } else if (sortedColumn === "birthday") {
      sortedArr.sort((x, y) => compareBy(x.birthday, y.birthday));
    } else if (sortedColumn === "spend") {
      sortedArr.sort((x, y) => compareBy(x.spend, y.spend));
    } else if (sortedColumn === "region") {
      sortedArr.sort((x, y) => compareBy(x.region, y.region));
    } else if (sortedColumn === "gender") {
      sortedArr.sort((x, y) => compareBy(x.gender, y.gender));
    }
    if (!ascending) {
      sortedArr.reverse();
    }
    setSortedUsers([...sortedArr]);
  };

  // Comparison method for our sort
  const compareBy = (x, y) => {
    let comparison = 0;
    if (x > y) {
      comparison = 1;
    } else if (x < y) {
      comparison = -1;
    }
    return comparison;
  };

  // Called when a column button is clicked
  const handleSortClick = (column) => {
    if (column === sortedColumn) {
      setAscending(!ascending);
    } else {
      setSortedColumn(column);
    }
  };

  // Sort users when state changes
  useEffect(sortUsers, [sortedColumn, ascending, userData]);

  return (
    <table className="table">
      <tr>
        <th className="th">
          <button type="button" onClick={() => handleSortClick("id")}>
            ID
          </button>
        </th>
        <th className="th">
          <button type="button" onClick={() => handleSortClick("birthday")}>
            Birth Month
          </button>
        </th>
        <th className="th">
          <button type="button" onClick={() => handleSortClick("spend")}>
            Amount Spent
          </button>
        </th>
        <th className="th">
          <button type="button" onClick={() => handleSortClick("region")}>
            Region
          </button>
        </th>
        <th className="th">
          <button type="button" onClick={() => handleSortClick("gender")}>
            Gender
          </button>
        </th>
      </tr>
      {sortedUsers.map((user) => (
        <tr>
          <td className="td">{user.id}</td>
          <td className="td">{user.birthday}</td>
          <td className="td">{user.spend}</td>
          <td className="td">{user.region}</td>
          <td className="td">{user.gender}</td>
        </tr>
      ))}
    </table>
  );
};

export default UserTable;
