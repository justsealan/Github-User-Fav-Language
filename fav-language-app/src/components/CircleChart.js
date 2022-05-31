import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

function CircleChart(props) {
  const colours = ["#0088FE", "#ff6c5c", "#FFBB28", "#FF8042"];

  // Count how many times the same elements occur in the array
  let countObj = {};
  props.languages.forEach((item) => {
    countObj[item] = (countObj[item] || 0) + 1;
  });

  // Display the percentage of the all the used languages
  let total = 0;
  for (let key in countObj) {
    total += countObj[key];
  }

  // Convert the obj to array of objects
  const langData = Object.keys(countObj).map((key) => {
    return { name: key, value: countObj[key] };
  });

  // create labels for the pie chart
  const renderCustomLabel = (entry) => {
    return `${entry.name} ${((entry.value / total) * 100).toFixed(2)}%`;
  };

  return (
    <div>
      <div> </div>
      <ResponsiveContainer width={400} height={300}>
        <PieChart>
          <Pie
            data={langData}
            dataKey="value"
            fill="#8884d8"
            label={renderCustomLabel}
          >
            {langData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colours[index % colours.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CircleChart;
