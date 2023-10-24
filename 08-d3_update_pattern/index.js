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

// graph.append("rect");
// graph.append("rect");
// graph.append("rect");
// graph.append("rect");
// graph.append("rect");
// graph.append("rect");
// graph.append("rect");

const xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0, ${graphHeight})`);

const yAxisGroup = graph.append("g");

// scales
const y = d3.scaleLinear().range([graphHeight, 0]);
const x = d3.scaleBand().range([0, 500]).paddingInner(0.2).paddingOuter(0.2);

// create the axes
const xAxis = d3.axisBottom(x);
const yAxis = d3
  .axisLeft(y)
  .ticks(3)
  .tickFormat((d) => d + " orders");

// update function
const update = (data) => {
  // 1. Update scales (domains) if they rely on our data
  y.domain([0, d3.max(data, (d) => d.orders)]);
  x.domain(data.map((item) => item.name));

  // 2. join updated data to the elements
  const rects = graph.selectAll("rect").data(data);

  // 3. remove unwanted (if any) shapes using the exit selection
  rects.exit().remove();

  // 4. update the current shapes in the dom
  rects
    .attr("width", x.bandwidth)
    .attr("height", (d) => graphHeight - y(d.orders))
    .attr("fill", "orange")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.orders));

  // 5. update the append selection to the dom
  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", (d) => graphHeight - y(d.orders))
    .attr("fill", "orange")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.orders));

  // call x axis
  xAxisGroup.call(xAxis);

  // update x axis text
  xAxisGroup
    .selectAll("text")
    .attr("transform", "rotate(-40)")
    .attr("text-anchor", "end")
    .attr("fill", "orange");

  // call y axis
  yAxisGroup.call(yAxis);
};

db.collection("dishes")
  .get()
  .then((res) => {
    let data = [];
    res.docs.forEach((doc) => data.push(doc.data()));
    update(data);
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
