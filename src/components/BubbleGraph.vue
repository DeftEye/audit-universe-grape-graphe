<script>
import * as d3 from "d3";
import * as utils from "./utils.js";

export default {
  name: "BubbleGraph",
  props: {
    bubbleGraphProps: {
      data: [
        Array,
        {
          value: Number,
          label: String,
        },
      ],
      graphName: String,
      numberOfColumns: Number,
      useLogarithmicScale: Boolean,
      LogarithmicFactor: Number,
      maxRadius: Number,
      minRadius: Number,
      height: Number,
    },
  },
  setup(props) {
    const graphId =
      "my_dataviz" + props.bubbleGraphProps.graphName.replaceAll(" ", "_");
    return { graphId };
  },
  watch: {
    bubbleGraphProps() {
      this.renderGraph();
    },
  },

  methods: {
    renderGraph() {
      const { data, maxRadius, width, height, size, numberOfColumns } =
        utils.getGraphParameters(
          this.bubbleGraphProps,
          this.$refs.container.clientWidth
        );

      const graphName =
        "#my_dataviz" + this.bubbleGraphProps.graphName.replaceAll(" ", "_");

      // append the svg object to the body of the page
      var svg = d3
        .select(graphName)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      console.log(data);

      // Initialize the circle: all located at the center of the svg area
      let node = svg.append("g").selectAll("circle").data(data).enter();

      let bubble = node
        .append("circle")
        .attr("class", "node")
        .attr("r", (d) => size(d.value))
        .attr(
          "cx",
          (d) => (width * (d.index % numberOfColumns)) / numberOfColumns
        )
        .attr(
          "cy",
          (d) =>
            (height * Math.round(d.index / numberOfColumns)) /
            (data.length / numberOfColumns)
        )
        .style("fill", "#D1D1D1")
        .style("fill-opacity", 1)
        .call(
          d3
            .drag() // call specific function when circle is dragged
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );

      let bubbleText = utils.addBubbleText(node, size, width, height);

      const globalContainer = this.$refs.container;

      utils.addTooltip(globalContainer, graphName, bubble);

      // Features of the forces applied to the nodes:
      // const repart = d3
      //   .scalePow()
      //   .exponent(1)
      //   .domain([0, data.length])
      //   .range([0, height]);

      // let acc = 0;

      var simulation = d3
        .forceSimulation()
        .force(
          "x",
          d3
            .forceX()
            .strength(0.1)
            .x(width / 2)
        )
        // .force(
        //   "y",
        //   d3
        //     .forceY()
        //     .strength((d) => size(d.value) / maxRadius)
        //     .y(0)
        // )
        .force(
          "y",
          d3
            .forceY()
            .strength(0.1)
            .y(
              (d) =>
                (height * d.index) /
                numberOfColumns /
                (data.length / numberOfColumns)
            )
        )
        // .force("charge", d3.forceManyBody().strength(10)) // Nodes are attracted one each other of scale * 1000000 is > 0
        .force(
          "collide",
          d3
            .forceCollide()
            .strength(1)
            .radius((d) => {
              return size(d.value);
            })
            .iterations(1)
        ); // Force that avoids circle overlapping

      // Apply these forces to the nodes and update their positions.
      // Once the force algorithm is happy with positions ('alpha' scale * 1000000 is low enough), simulations will stop.
      simulation.nodes(data).on("tick", () => {
        bubble
          .attr("cx", (d) => {
            return (d.x = Math.max(
              size(d.value),
              Math.min(width - size(d.value), d.x)
            ));
          })
          .attr("cy", (d) => {
            return (d.y = Math.max(
              size(d.value),
              Math.min(height - size(d.value), d.y)
            ));
          });
        bubbleText
          .attr("x", (d) => {
            return (d.x = Math.max(
              size(d.value),
              Math.min(width - size(d.value), d.x)
            ));
          })
          .attr("y", (d) => {
            return (d.y = Math.max(
              size(d.value),
              Math.min(height - size(d.value), d.y)
            ));
          });
      });
      // What happens when a circle is dragged?
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3);
        d.fx = null;
        d.fy = null;
      }
    },
  },
  mounted() {
    this.renderGraph();
  },
};
</script>

<template>
  <div class="container" ref="container">
    <div :id="`${graphId}`"></div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.heavy {
  font: bold 30px sans-serif;
}
</style>
