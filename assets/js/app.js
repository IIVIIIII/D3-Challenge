// make chart responsive
function windowRespond() {

  var svgArea = d3.select("body").selectAll("svg");

  if (!svgArea.empty()) {
    svgArea.remove();
  }

  // set up chart dimensions
  var container = window.innerWidth;
  var svgWidth = 0;

  if (container >= 1200) {
    svgWidth = 1140
  } else if (container >= 992) {
    svgWidth = 960
  } else if (container >= 768) {
    svgWidth = 720
  } else if (container >= 576) {
    svgWidth = 540
  } else {
    svgWidth = container
  }

  var svgHeight = window.innerHeight/1.75;

  var margin = {
    top: 20,
    right: 100,
    bottom: 60,
    left: 50
  };

  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // create an svg wrapper,
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  var dataGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


  // import data from csv file
  d3.csv("assets/data/data.csv").then(data => {

      // scale data to svg
      var xScale = d3.scaleLinear()
        .domain(d3.extent(data.map(d => parseFloat(d.poverty))))
        .range([0, width])

      var yScale = d3.scaleLinear()
        .domain(d3.extent(data.map(d => parseFloat(d.obesity))))
        .range([height, 0])


      // create and add axes
      var bottomAxis = d3.axisBottom(xScale)
      var leftAxis = d3.axisLeft(yScale)

      chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

      chartGroup.append("g")
        .call(leftAxis);


      // add titles
      chartGroup.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(${width/2}, ${margin.top - 20})`)
      .text("Obesity vs Poverty");

      chartGroup.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", `translate(${width/2}, ${height + margin.top + 20})`)
        .text("Poverty (%)");

      chartGroup.append("text")
          .attr("text-anchor", "middle")
          .attr("transform", `translate(${0 - (margin.left - 20)}, ${height/2})rotate(-90)`)
          .text("Obesity (%)");


      // add data points
      var circles = dataGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.obesity))
        .attr("stroke", "black")
        .attr("stroke-width", "1.5")
        .attr("fill", "white")
        .attr("r", 10)

      dataGroup.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => xScale(d.poverty))
        .attr("y", d => {return (yScale(d.obesity) + 3.75)})
        .attr("text-anchor", "middle")
        .attr("font-size", 10)
        .text(d => d.abbr)


      // toolTips if i ever feel like it
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
}

windowRespond();

d3.select(window).on("resize", windowRespond);