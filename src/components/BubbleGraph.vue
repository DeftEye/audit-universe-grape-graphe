<script>
import * as d3 from "d3";
import { getGraphParameters } from "./init.js";
import * as d3Utils from "./d3Utils.js";

export default {
  name: "BubbleGraph",
  props: {
    bubbleGraphProps: {
      data: [
        Array,
        {
          value: Number,
          label: String,
          score: Number | null,
          tooltip: String,
        },
      ],
      graphName: String,
      numberOfColumns: Number,
      useLogarithmicScale: Boolean,
      LogarithmicFactor: Number,
      maxRadius: Number,
      minRadius: Number,
      height: Number,
      isScoreGraph: Boolean,
      highScoreColor: String,
      mediumScoreColor: String,
      lowScoreColor: String,
      textColor: String,
    },
  },
  setup(props) {
    const graphId =
      "my_dataviz" + props.bubbleGraphProps.graphName.replaceAll(" ", "_");
    return { graphId };
  },
  watch: {
    bubbleGraphProps: {
      handler: function () {
        this.renderGraph();
      },
      deep: true,
    },
  },

  methods: {
    renderGraph() {
      const {
        data,
        width,
        height,
        size: sizeScale,
      } = getGraphParameters(this.bubbleGraphProps, this.$refs.container);

      const graphName =
        "#my_dataviz" + this.bubbleGraphProps.graphName.replaceAll(" ", "_");

      //Remove everything from the graph
      let graph = d3.select(graphName);
      graph.selectAll("*").remove();

      // Append the SVG object to the body of the page
      let svg = graph.append("svg").attr("width", width).attr("height", height);

      // Initialize the circle: all located at the center of the SVG area
      let node = svg.append("g").selectAll("circle").data(data).enter();

      const spaceScale =
        data[data.length - 1].totalPreviousRadius > height
          ? d3
              .scaleLinear()
              .domain([0, data[data.length - 1].totalPreviousRadius])
              .range([0, height])
          : d3
              .scaleLinear()
              .domain([0, data[data.length - 1].totalPreviousRadius])
              .range([0, data[data.length - 1].totalPreviousRadius * 0.5]);
      console.log("max rad", data[data.length - 1].totalPreviousRadius);
      console.log(
        "max scale",
        spaceScale(data[data.length - 1].totalPreviousRadius)
      );

      // Features of the forces applied to the nodes
      let simulation = d3
        .forceSimulation()
        .force(
          "x",
          d3
            .forceX()
            .strength(0.1)
            .x(width / 2)
        )
        .force(
          "y",
          d3
            .forceY()
            .strength(0.5)
            .y((d) =>
              spaceScale(d.totalPreviousRadius - sizeScale(d.value) / 2)
            )
        )
        .force("charge", d3.forceManyBody().strength(0.1))
        .force(
          "collide",
          d3
            .forceCollide()
            .strength(1)
            .radius((d) => sizeScale(d.value))
            .iterations(1)
        );

      let bubble = d3Utils.addCircles(
        node,
        width,
        height,
        data,
        sizeScale,
        simulation,
        {
          high: this.bubbleGraphProps.highScoreColor,
          medium: this.bubbleGraphProps.mediumScoreColor,
          low: this.bubbleGraphProps.lowScoreColor,
        },
        this.bubbleGraphProps.isScoreGraph
      );

      let bubbleText = d3Utils.addBubbleText(
        node,
        sizeScale,
        width,
        height,
        this.bubbleGraphProps.textColor
      );

      d3Utils.addTooltip(this.$refs.container, graphName, bubble);

      //Run the simulation within the svg border
      simulation.nodes(data).on("tick", () => {
        bubble
          .attr(
            "cx",
            (d) =>
              (d.x = Math.max(
                sizeScale(d.value),
                Math.min(width - sizeScale(d.value), d.x)
              ))
          )
          .attr(
            "cy",
            (d) =>
              (d.y = Math.max(
                sizeScale(d.value),
                Math.min(height - sizeScale(d.value), d.y)
              ))
          );
        bubbleText
          .attr("x", (d) =>
            Math.max(
              sizeScale(d.value),
              Math.min(width - sizeScale(d.value), d.x)
            )
          )
          .attr("y", (d) =>
            Math.max(
              sizeScale(d.value),
              Math.min(height - sizeScale(d.value), d.y)
            )
          );
      });
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
  height: 100%;
}

.heavy {
  font: bold 30px sans-serif;
}
</style>
