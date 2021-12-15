const fs = require("fs");

// Set the possible values the data can take
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const regions = ["United States", "Europe", "APAC", "Latin America"];
const genders = ["Male", "Female"];
const spendRange = [0, 5000];

// Create an array where each user has uniformly distributed random values
var arr = new Array(1000).fill().map((i, idx) => {
  const randomMonth = Math.floor(Math.random() * months.length);
  const randomRegion = Math.floor(Math.random() * regions.length);
  const randomGender = Math.floor(Math.random() * genders.length);
  const randomSpend = Math.floor(
    Math.random() * (spendRange[1] - spendRange[0]) + spendRange[0]
  );

  return {
    id: idx,
    birthday: months[randomMonth],
    spend: randomSpend,
    region: regions[randomRegion],
    gender: genders[randomGender],
  };
});

// Output this data to users/json
var json = JSON.stringify({ users: arr }, null, 2);
console.log(json);
fs.writeFile("../utrack/src/users.json", json, (err) => {
  if (err) {
    throw err;
    console.log("Failed to write");
  }
  console.log("Written data");
});
