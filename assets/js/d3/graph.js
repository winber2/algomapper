import { nodelistGenerator } from '../algorithms/node';
import FloydWarshall from '../algorithms/floyd_warshall';

export default class Graph {
  constructor(alg1, alg2){
    this.nodeNums = [ 50, 100, 150, 200, 250, 300, 350, 400,
                      500, 600, 700, 800, 900, 1000];
    this.data1 = [];
    this.data2 = [];
    this.alg1 = alg1;
    this.alg2 = alg2;
    this.nodelistGenerator = nodelistGenerator;
  }

  computeData(alg, i) {
    i == 0 ?
      this.data1 = [] :
      this.data2 = [];

    this.nodeNums.forEach(num => {
      let runtime = new alg(new nodelistGenerator(num).nodelist)
                      .search('1', String(num))
                      .runtime;

      i == 0 ?
        this.data1.push({numNodes: num, runtime}) :
        this.data2.push({numNodes: num, runtime});
    });
  }

  drawPlaceholder() {
    // -- LINEAR DATA TEST --
    this.data1 = [
      {numNodes: 10, runtime: 500},
      {numNodes: 25, runtime: 1250},
      {numNodes: 40, runtime: 2000},
      {numNodes: 50, runtime: 2500},
      {numNodes: 80, runtime: 4000},
      {numNodes: 100, runtime: 5000}
    ];

    // -- QUAD DATA TEST --
      this.data2 = [
        {numNodes: 10, runtime: 100},
        {numNodes: 20, runtime: 400},
        {numNodes: 50, runtime: 2505},
        {numNodes: 80, runtime: 6400},
        {numNodes: 100, runtime: 10000}
      ];

    // -- CUBIC DATA TEST --
    // data2 = [
    //   {numNodes: 5, runtime: 125},
    //   {numNodes: 11, runtime: 1000},
    //   {numNodes: 20, runtime: 8000},
    //   {numNodes: 51, runtime: 12500},
    //   {numNodes: 80, runtime: 51200},
    //   {numNodes: 100, runtime: 1000000}
    // ];

    this.draw();
  }

  draw() {
    let algs = [this.alg1, this.alg2];

    this.data1.length == 0 ?
      algs.forEach((alg, i) => this.computeData(alg, i)) :
      null;
    // this.computeData(this.alg1, this.alg2);

    let compData = this.data1.concat(this.data2);

    var div = d3.select("div.comp-graph"),
        svg = div.append("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        // width = Number(div.attr("width")) - margin.left - margin.right,
        // height = Number(div.attr("height")) - margin.top - margin.bottom,
        width = 500,
        height = 500,
        g = svg.append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.data(compData);
    svg.style("width", width).style("height", height);

    var x = d3.scaleLinear()
        .rangeRound([0, width - margin.left - margin.right]);

    var y = d3.scaleLinear()
        .rangeRound([height - margin.bottom - margin.top, 0]);

    var line = d3.line()
        .x(function(d) { return x(d.numNodes); })
        .y(function(d) { return y(d.runtime); })
        .curve(d3.curveBasis);

    var tooltip = d3.select("div.comp-graph")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    var dotMapX = function(d) {
      console.log(x(d.numNodes) + margin.left);
      return x(d.numNodes) + margin.left;};
    var dotMapY = function(d) { return y(d.runtime) + margin.top;};

      x.domain(d3.extent(compData, function(d) { return d.numNodes; }));
      y.domain(d3.extent(compData, function(d) { return d.runtime; }));

      g.append("g")
          .attr("transform", "translate(0," + 450 + ")")
          .call(d3.axisBottom(x))
          .append("text")
            .attr("fill", "#000")
            .attr("x", 215)
            .attr("y", -8)
            .attr("dx", "0.71em")
            .attr("text-anchor", "middle")
            .text("Number of Nodes");
        // .select(".domain")
        //   .remove();

      // svg.selectAll("dot")
      //   .data(data)
      //   .enter().append("circle")
      //   .attr("r", 3.5)
      //   .attr("cx", function(d) { return x(d.numNodes); })
      //   .attr("cy", function(d) { return y(d.runtime); });

      g.append("g")
          .call(d3.axisLeft(y))
        .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Runtime (microseconds)");

      g.append("path")
          .datum(this.data1)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", line);

      g.append("path")
          .datum(this.data2)
          .attr("fill", "none")
          .attr("stroke", "red")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", line);

      svg.selectAll(".dot")
         .data(this.data1)
       .enter().append("circle")
         .attr("class", "dot")
         .attr("fill", "steelblue")
         .attr("r", 5)
         .attr("cx", dotMapX)
         .attr("cy", dotMapY)
         .on("mouseover", function(d) {
            tooltip.transition()
                   .duration(200)
                   .style("opacity", .9);
            tooltip.html(`num = ${d.numNodes}<br /> time = ${Math.floor(d.runtime)}`)
                   .style("left", dotMapX(d)+"px")
                   .style("top", dotMapY(d)+"px");
          })
          .on("mouseout", function(d) {
              tooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
          });


       svg.selectAll(".dot2")
          .data(this.data2)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("fill", "red")
          .attr("r", 5)
          .attr("cx", dotMapX)
          .attr("cy", dotMapY)
          .on("mouseover", function(d) {
             tooltip.transition()
                    .duration(50)
                    .style("opacity", .9);
             tooltip.html(`num = ${d.numNodes}<br /> time = ${Math.floor(d.runtime)}`)
                    .style("left", dotMapX(d)+"px")
                    .style("top", dotMapY(d)+"px");
           })
           .on("mouseout", function(d) {
               tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
           });
  }
}
