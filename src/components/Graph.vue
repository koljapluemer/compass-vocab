<script setup lang="ts">
import * as vNG from "v-network-graph";
import { reactive, computed, ref, onMounted } from "vue";
import NodeCreatorModal from "./NodeCreatorModal.vue";

import {
  ForceLayout,
  ForceNodeDatum,
  ForceEdgeDatum,
} from "v-network-graph/lib/force-layout";

const relationshipTypes = [
  "PARENT",
  "GOES_WITH",
  "RELATED",
  "EXAMPLE",
  "CHILD",
  "CONFUSABLE",
  "OPPOSITE",
  "RHYME",
];

const exampleNodes = {
  node1: { name: "بـِسكيلـِتّـَة — bicycle" },
  node2: { name: "و َسيلـِة ا ِلنـَقل" },
  node3: { name: "مَشـاة  " },
  node4: { name: "عـَر َبـِيـَة" },
  node5: { name: "عـَجـَل" },
  node6: { name: "البسكلتة دي بتاعتي." },
  node7: { name: "السيارات حلت محل الدراجات." },
  node8: { name: "عا َلـَة" },
  node9: { name: "محفلّة" },
  node10: { name: "أحمـَر" },
};

const exampleRelationships = {
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

const nodes = ref({});
const edges = ref({});

const d3ForceEnabled = computed({
  get: () => configs.view.layoutHandler instanceof ForceLayout,
  set: (value: boolean) => {
    if (value) {
      configs.view.layoutHandler = new ForceLayout();
    } else {
      configs.view.layoutHandler = new vNG.SimpleLayout();
    }
  },
});

const layoutHandler: vNG.LayoutHandler = new ForceLayout();

const configs = reactive(
  vNG.defineConfigs({
    view: {
      layoutHandler,
    },
    node: {
      normal: {
        color: "#aabbff",
        radius: node => node.size = 10,
      },
    },
    edge: {
      label: {
        fontSize: 8,
        // TODO: pm autoset to same color as edge
        color: "#77bff2",
      },
      normal: {
        color: "#77bff2",
      },
      hover: {
        color: "#368fce",
      },

      margin: 12,
      marker: {
        target: { type: "arrow" },
      },
    },
  })
);

const handleNodeCreated = (node) => {
  console.log("Node created", node);
  const nodeName = `node${Object.keys(nodes.value).length + 1}`;
  nodes.value[nodeName] = node;
  // create small nodes for every relationship type, and connect them to the new node
  for (const relType of relationshipTypes) {
    const newNode = {
      name: relType,
      size: 5,
    };
    const relNodeName = `node${Object.keys(nodes.value).length + 1}`;
    nodes.value[relNodeName] = newNode;
    edges.value[`edge${Object.keys(edges.value).length + 1}`] = {
      source: nodeName,
      target: relNodeName,
    };
  }
};
</script>

<template>
  <div class="demo-control-panel">
    <div class="form-control">
      <label class="label cursor-pointer">
        <input type="checkbox" class="checkbox" v-model="d3ForceEnabled" />

        <span class="ml-2 label-text">Enable Force Layout</span>
      </label>
    </div>
  </div>

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
  <NodeCreatorModal @node-created="handleNodeCreated" />
</template>

<style>
.graph {
  width: 800px;
  height: 600px;
  border: 1px solid #000;
}
</style>
