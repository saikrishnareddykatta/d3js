const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

// create margin and dimensions
const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0, ${graphHeight})`);

const yAxisGroup = graph.append("g");

d3.json("menu.json")
  .then((data) => {
    const max = d3.max(data, (d) => d.orders);
    const y = d3.scaleLinear().domain([0, max]).range([0, graphHeight]);
    const x = d3
      .scaleBand()
      .domain(data.map((item) => item.name))
      .range([0, 500])
      .paddingInner(0.2)
      .paddingOuter(0.2);

    // join the data to rect
    const rect = graph.selectAll("rect").data(data);

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

    // create and call the axis
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
  })
  .catch(() => {
    graph
      .append("text")
      .attr("x", 150)
      .attr("y", 300)
      .attr("fill", "black")
      .text("Unable to load menu.json file")
      .style("font-family", "arial");
  });
