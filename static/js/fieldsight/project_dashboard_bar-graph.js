var margin = {top: 30, right: 0, bottom: 30, left: 0},
    width = 400 - margin.left - margin.right,
    height = 300;

var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>No of Sites </strong> <span style='color:red'>" + d.frequency + "</span>";
  })

var svg = d3.select("#progress-bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);


x.domain(dict_bar_data.map(function(d) { return d.letter; }));
y.domain([0, d3.max(dict_bar_data, function(d) { return d.frequency; })]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("y", 15)
    .attr("x",465)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Progress %");


svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -20)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Sites");

svg.selectAll(".bar")
    .data(dict_bar_data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.letter); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.frequency); })
    .attr("height", function(d) { return height - y(d.frequency); })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)

function type(d) {
  d.frequency = +d.frequency;
  return d;
}

