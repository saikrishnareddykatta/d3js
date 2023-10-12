const svg = d3.select("svg");

d3.json("menu.json")
  .then((data) => {
    const min = d3.min(data, (d) => d.orders);
    const max = d3.max(data, (d) => d.orders);
    const extent = d3.extent(data, (d) => d.orders);

    console.log(min);
    console.log(max);
    console.log(extent);

    const y = d3.scaleLinear().domain([0, max]).range([0, 500]);

    const x = d3
      .scaleBand()
      .domain(data.map((item) => item.name))
      .range([0, 500])
      .paddingInner(0.2)
      .paddingOuter(0.2);

    console.log(x.bandwidth());
    console.log(x("veg soup"));
    console.log(x("veg curry"));
    console.log(x("veg pasta"));
    console.log(x("veg surprise"));

    // join the data to rect
    const rect = svg.selectAll("rect").data(data);

    // add attrs to rects already in DOM
    rect
      .attr("width", x.bandwidth)
      .attr("height", (d) => y(d.orders))
      .attr("fill", "orange")
      .attr("x", (d) => x(d.name));

    // append the enter selection to the DOM
    rect
      .enter()
      .append("rect")
      .attr("width", x.bandwidth)
      .attr("height", (d) => y(d.orders))
      .attr("fill", "orange")
      .attr("x", (d) => x(d.name));
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
