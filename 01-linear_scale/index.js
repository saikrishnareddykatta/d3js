const svg = d3.select("svg");

d3.json("menu.json")
  .then((data) => {
    const y = d3.scaleLinear().domain([0, 1000]).range([0, 500]);

    console.log(y(400));
    console.log(y(0));
    console.log(y(900));

    // join the data to rect
    const rect = svg.selectAll("rect").data(data);

    // add attrs to rects already in DOM
    rect
      .attr("width", 50)
      .attr("height", (d) => y(d.orders))
      .attr("fill", "orange")
      .attr("x", (d, i) => i * 70);

    // append the enter selection to the DOM
    rect
      .enter()
      .append("rect")
      .attr("width", 50)
      .attr("height", (d) => y(d.orders))
      .attr("fill", "orange")
      .attr("x", (d, i) => i * 70);
  })
  .catch(() => {
    svg
      .append("text")
      .attr("x", 150)
      .attr("y", 300)
      .attr("fill", "black")
      .text("Unable to load menu.json file")
      .style("font-family", "arial")
      .style("font-size", 20);
  });
