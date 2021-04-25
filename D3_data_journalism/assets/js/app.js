// @TODO: YOUR CODE HERE!


// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the donuts.csv file
// =================================
d3.csv("assets/data/data.csv").then(data => {
    // console.log(data)

    console.log(data.map(d => parseFloat(d.poverty)))
    console.log(d3.extent(data.map(d => parseFloat(d.poverty))))
    console.log(data.map(d => parseFloat(d.obesity)))
    console.log(d3.extent(data.map(d => parseFloat(d.obesity))))

    var xScale = d3.scaleLinear()
      .domain(d3.extent(data.map(d => parseFloat(d.poverty))))
      .range([0, width])

    var yScale = d3.scaleLinear()
      .domain(d3.extent(data.map(d => parseFloat(d.obesity))))
      .range([height, 0])

    var bottomAxis = d3.axisBottom(xScale)
    var leftAxis = d3.axisLeft(yScale)

    // Add x-axis
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.poverty))
      .attr("cy", d => yScale(d.obesity))
      .attr("stroke", "black")
      .attr("stroke-width", "2")
      .attr("fill", "white")
      .attr("r", 10)

    chartGroup.selectAll("text")
      .remove()

    chartGroup.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", d => xScale(d.poverty))
      .attr("y", d => {return (yScale(d.obesity) + 3.75)})
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .text(d => d.abbr)



    // var toolTip = d3.tip()
    //   .attr("class", "tooltip")
    //   .offset([80, -60])
    //   .html(function(d) {
    //     return (`<strong>${d.state}<strong><hr>${d.poverty}% poverty</hr><hr>${d.obesity}% obesity</hr>`);
    //   });

    //   chartGroup.call(toolTip);

    //   circlesGroup.on("mouseover", function(d) {
    //     toolTip.show(d, this);
    //   })
    //   // Step 4: Create "mouseout" event listener to hide tooltip
    //     .on("mouseout", function(d) {
    //       toolTip.hide(d);
    //     });
    // }).catch(function(error) {
    //   console.log(error);


    


})