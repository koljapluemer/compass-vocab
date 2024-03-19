<script setup lang="ts">
import * as vNG from "v-network-graph";
import { reactive } from "vue";

import {
  ForceLayout,
  ForceNodeDatum,
  ForceEdgeDatum,
} from "v-network-graph/lib/force-layout";

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

const initialConfigs = vNG.defineConfigs({
  view: {
    layoutHandler: new ForceLayout({
      positionFixedByDrag: false,
      positionFixedByClickWithAltKey: true,
      createSimulation: (d3, nodes, edges) => {
        // d3-force parameters
        const forceLink = d3
          .forceLink<ForceNodeDatum, ForceEdgeDatum>(edges)
          .id((d) => d.id);
        return d3
          .forceSimulation(nodes)
          .force("edge", forceLink.distance(40).strength(0.5))
          .force("charge", d3.forceManyBody().strength(-800))
          .force("center", d3.forceCenter().strength(0.05))
          .alphaMin(0.001);
      },
    }),
  },
  node: {
    normal: {
      color: "#aabbff",
    },
  },
  edge: {
    normal: {
      color: "#77bff2",
    },
    hover: {
      color: "#368fce",
    },
    margin: 4,
    marker: {
      target: { type: "arrow" },
    },
    gap: 10,
    keepOrder: "clock",
  },
});

const configs = reactive(initialConfigs);
</script>

<template>
  <v-network-graph
    class="graph"
    :nodes="nodes"
    :edges="edges"
    :configs="configs"
  >
    <template #edge-label="{ edge, ...slotProps }">
      <v-edge-label
        :text="edge.label"
        align="center"
        vertical-align="above"
        v-bind="slotProps"
      />
    </template>
  </v-network-graph>
</template>

<style>
.graph {
  width: 800px;
  height: 600px;
  border: 1px solid #000;
}
</style>
