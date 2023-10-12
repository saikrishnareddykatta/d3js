const canvas = d3.select(".canvas");
const svg = canvas.append("svg").attr("height", 600).attr("width", 600); // append method returns svg image

const group = svg.append("g").attr("transform", "translate(50, 100)");

group
  .append("rect")
  .attr("width", 200)
  .attr("height", 100)
  .attr("fill", "blue")
  .attr("x", 20)
  .attr("y", 20);

group
  .append("circle")
  .attr("r", 50)
  .attr("cx", 300)
  .attr("cy", 70)
  .attr("fill", "pink");

group
  .append("line")
  .attr("x1", 370)
  .attr("y1", 20)
  .attr("x2", 400)
  .attr("y2", 120)
  .attr("stroke", "red")
  .attr("stroke-width", 4);

svg
  .append("text")
  .attr("x", 20)
  .attr("y", 200)
  .attr("fill", "grey")
  .text("hello, sai")
  .style("font-family", "arial");
// append shapes to svg container
// svg.append("rect");
// svg.append("circle");
// svg.append("line");
