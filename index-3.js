// select svg container first
const svg = d3.select("svg");
d3.json("panets.json")
  .then((data) => {
    const circs = svg.selectAll("circle").data(data);

    // add attrs to circs already in DOM
    circs
      .attr("r", (d) => d.radius)
      .attr("cx", (d) => d.distance)
      .attr("cy", (d) => 200)
      .attr("fill", (d) => d.fill);

    // append the enter selection to the DOM
    circs
      .enter()
      .append("circle")
      .attr("r", (d) => d.radius)
      .attr("cx", (d) => d.distance)
      .attr("cy", (d) => 200)
      .attr("fill", (d) => d.fill);
  })
  .catch(() => {
    svg
      .append("text")
      .attr("x", 150)
      .attr("y", 300)
      .attr("fill", "black")
      .text("Unable to load planets.json file")
      .style("font-family", "arial")
      .style("font-size", 20);
  });
