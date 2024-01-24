<template>
  <div class="content">
    <BubbleGraph :bubbleGraphProps="props2" />
    <BubbleGraph :bubbleGraphProps="props1" />
    <BubbleGraph :bubbleGraphProps="props3" />
    <BubbleGraph :bubbleGraphProps="props4" />
    <BubbleGraph :bubbleGraphProps="props5" />
    <BubbleGraph :bubbleGraphProps="props6" />
  </div>
</template>

<script>
import BubbleGraph from "./components/BubbleGraph.vue";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    BubbleGraph,
  },
};
</script>

<script setup>
const data2 = [
  {
    label: "Iran",
    value: 100,
    score: 4,
    tooltip: "Iran",
  },
  {
    label: "UK",
    value: 0,
    score: 10,
    tooltip: "UK",
  },
  {
    label: "USA",
    value: 2,
    score: 10,
    tooltip: "USA",
  },
  {
    label: "France",
    value: 2,
    score: 10,
    tooltip: `France \n France`,
  },
  {
    label: "Ireland",
    value: 2,
    score: 10,
    tooltip: "Ireland",
  },
  {
    label: "Germany",
    value: 2,
    score: 1,
    tooltip: "Germ",
  },
  {
    label: "Enies lobby",
    value: 2,
    score: 1,
    tooltip: "Lobby",
  },
  {
    label: "Switzerland",
    value: 2,
    score: 1,
    tooltip: "Suisse",
  },
  {
    label: "Sweden",
    value: 2,
    score: 1,
    tooltip: "Sweden",
  },
];

const data1 = [
  {
    label: "Italie",
    value: 10,
    score: 4,
  },
  {
    label: "France",
    value: 7,
    score: 100,
  },
  {
    label: "Espagne",
    value: 9,
    score: 55,
  },
  {
    label: "Roumanie",
    value: 8,
    score: 32,
  },
  {
    label: "Danemark",
    value: 10,
    score: 90,
  },
  {
    label: "Hollande",
    value: 7,
    score: 78,
  },
  {
    label: "UK",
    value: 8,
    score: 14,
  },
  {
    label: "Irlande",
    value: 9,
    score: 3162,
  },
  {
    label: "Sénégal Sénégal Sénégal Sénégal Sénégal",
    value: 102,
    score: 62,
  },
  {
    label: "Mali",
    value: 36,
    score: 14,
  },
  {
    label: "Russie",
    value: 7,
    score: 5262,
  },
  {
    label: "Venezuela",
    value: 9,
    score: 262,
  },
  {
    label: "Kenya",
    value: 9,
    score: 623,
  },
  {
    label: "Guatemala",
    value: 8,
    score: 144,
  },
  {
    label: "Hongrie",
    value: 9,
    score: 612,
  },
  {
    label: "Chine",
    value: 5,
    score: 137,
  },
  {
    label: "Pérou",
    value: 102,
    score: 71,
  },
  {
    label: "Ouganda",
    value: 6,
    score: 1,
  },
  {
    label: "Bolivie",
    value: 48,
    score: 262,
  },
  {
    label: "Chili",
    value: 1,
    score: 2222,
  },
  {
    label: "Jordanie",
    value: 91,
    score: 63,
  },
  {
    label: "Israel",
    value: 87,
    score: 14,
  },
  {
    label: "Liban",
    value: 9106,
    score: 6,
  },
  {
    label: "Maroc",
    value: 59,
    score: 37,
  },
];

const data3 = [
  {
    label: "Iran",
    value: 2,
    score: 10,
  },
  {
    label: "UK",
    value: 10000,
    score: 1,
  },
  {
    label: "USA",
    value: 100,
    score: 2,
  },
  {
    label: "France",
    value: 100,
    score: 3,
  },
  {
    label: "Ireland",
    value: 100,
    score: 4,
  },
  {
    label: "Germany",
    value: 100,
    score: null,
  },
  {
    label: "Enies lobby",
    value: 100,
    score: 7,
  },
  {
    label: "Switzerland",
    value: 100,
    score: null,
  },
  {
    label: "Sweden",
    value: 100,
    score: null,
  },
];

const data4 = [
  {
    label: "Iran",
    value: 2,
    score: 10,
  },
  {
    label: "UK",
    value: 100,
    score: 3,
  },
  {
    label: "USA",
    value: 100,
    score: 1,
  },
  {
    label: "France",
    value: 100,
    score: 7,
  },
  {
    label: "Ireland",
    value: 100,
    score: 8,
  },
  {
    label: "Germany",
    value: 100,
    score: 4,
  },
  {
    label: "Enies lobby",
    value: 100,
    score: 2,
  },
  {
    label: "Switzerland",
    value: 100,
    score: 9,
  },
  {
    label: "Sweden",
    value: 100,
    score: 8,
  },
];
const data5 = [
  {
    label: "Sweden",
    value: 100,
    score: 8,
  },
];
const data6 = [
  {
    label: "SARL John Doe",
    value: 10,
    score: 4,
  },
  {
    label: "Bruno SA",
    value: 7,
    score: 8,
  },
  {
    label: "Julian GMBH",
    value: 4,
    score: 55,
  },
  {
    label: "Paul LTD",
    value: 8,
    score: 32,
  },
  {
    label: "BV",
    value: 10,
    score: 90,
  },
  {
    label: "Marco BV",
    value: 7,
    score: 78,
  },
  {
    label: "Le 1",
    value: 3,
    score: 14,
  },
  {
    label: "Le 2",
    value: 1,
    score: 62,
  },
];
const acc = ref(0);
const props = (d) => {
  acc.value += 1;
  return {
    data: d.sort((a, b) => b.value - a.value),
    graphName: "graph" + acc.value,
    numberOfColumns: 1,
    useLogarithmicScale: true,
    LogarithmicFactor: 0.3,
    maxRadius: 0,
    minRadius: 0,
    height: 250,
    isScoreGraph: true,
    highScoreColor: "#4CAF50",
    mediumScoreColor: "#FFD700",
    lowScoreColor: "#FF6347",
    textColor: "#000000",
  };
};
const props1 = props(data1);
const props2 = props(data2);
const props3 = props(data3);
const props4 = props(data4);
const props5 = props(data5);
const props6 = props(data6);
</script>

<style lang="scss" scoped>
.content {
  width: 100px;
  height: 800px;
}
</style>
