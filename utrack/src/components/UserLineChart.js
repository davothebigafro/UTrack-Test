import React from "react";
import { Line } from "react-chartjs-2";

// Array of month labels
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Component to render 2 line charts, one for the number of people at each birth month, and one for the cumulative cost
const UserLineChart = ({ userData }) => {
  // Convert array of user objects into an array counting the number of users for each birth month
  const dataByBirthday = userData.reduce((birthdayCount, currentUser) => {
    var currentUserBirthday = currentUser.birthday;
    if (typeof birthdayCount[currentUserBirthday] !== "undefined") {
      birthdayCount[currentUserBirthday]++;
      return birthdayCount;
    } else {
      birthdayCount[currentUserBirthday] = 1;
      return birthdayCount;
    }
  }, {});

  var userBirthdayDataArray = new Array(12).fill(0);

  for (var key in dataByBirthday) {
    userBirthdayDataArray[key - 1] = dataByBirthday[key];
  }

  // Produce array of cumulative cost of the users.
  var cumulativeCountArray = [];
  userBirthdayDataArray.reduce(
    (prev, curr, i) => (cumulativeCountArray[i] = prev + curr),
    0
  );

  var cumulativeCostArray = cumulativeCountArray.map((x) => {
    return x * 5;
  });

  return (
    <div>
      <Line
        data={{
          labels: months,
          datasets: [
            {
              label: "Monthly",
              data: userBirthdayDataArray,
              lineTension: 0,
              fill: false,
              borderColor: "rgba(200,100,0,0.5)",
              yAxisID: "Monthly",
            },
            {
              label: "Cumulative Cost",
              data: cumulativeCostArray,
              lineTension: 0,
              fill: false,
              borderColor: "rgba(20,80,200,0.5)",
              yAxisID: "Cumulative",
            },
          ],
        }}
        options={{
          // Have a different scale for each line as the cumulative cost gets quite a lot bigger than the monthly count
          scales: {
            yAxes: [
              {
                id: "Monthly",
                type: "linear",
                position: "left",
              },
              {
                id: "Cumulative",
                type: "linear",
                position: "right",
              },
            ],
          },
        }}
        height={100}
        width={300}
      ></Line>
    </div>
  );
};

export default UserLineChart;
