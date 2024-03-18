<script setup lang="ts">
const nodes = {
  node1: { name: "بـِسكيلـِتّـَة — bicycle" },
  node2: { name: "و َسيلـِة ا ِلنـَقل" },
  node3: { name: "مَشـاة " },
  node4: { name: "عـَر َبـِيـَة" },
  node5: { name: "عـَجـَل" },
  node6: { name: "البسكلتة دي بتاعتي." },
  node7: { name: "السيارات حلت محل الدراجات." },
  node8: { name: "عا َلـَة" },
  node9: { name: "محفلّة" },
};

const edges = {
  edge1: { source: "node1", target: "node2", label: "PARENT" },
  edge2: { source: "node1", target: "node3", label: "RELATED" },
  edge3: { source: "node1", target: "node4", label: "OPPOSITE" },
  edge4: { source: "node1", target: "node5", label: "CHILD" },
  edge5: { source: "node1", target: "node6", label: "EXAMPLE" },
  edge6: { source: "node1", target: "node7", label: "EXAMPLE" },
  edge7: { source: "node1", target: "node8", label: "CONFUSABLE" },
  edge8: { source: "node1", target: "node9", label: "RHYME" },
  edge9: { source: "node1", target: "node10", label: "GOES_WITH" },
};
</script>

<template>
  <v-network-graph class="graph" :nodes="nodes" :edges="edges" />
</template>

<style>
.graph {
  width: 800px;
  height: 600px;
  border: 1px solid #000;
}
</style>
