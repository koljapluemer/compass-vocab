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

const exampleNodes = [
  { name: "بـِسكيلـِتّـَة — bicycle", size: 30 }, // bicycle
  { name: "و َسيلـِة ا ِلنـَقل", size: 30 }, // vehicle
  { name: "مَشـاة  ", size: 30 }, // pedestrian
];


const exampleRelationships = [
  {
    from: exampleNodes[0].name + "_PARENT",
    to: exampleNodes[1].name + "_CHILD",
  },
  {
    from: exampleNodes[0].name + "_RELATED",
    to: exampleNodes[2].name + "_RELATED",
  },
];

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
        radius: (node) => node.size,
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

      margin: 3,
      // marker: {
      //   target: { type: "arrow" },
      // },
    },
  })
);

const handleNodeCreated = (node) => {
  console.log("Node created", node);
  nodes.value[node.name] = node;
  // create small nodes for every relationship type, and connect them to the new node
  for (const relType of relationshipTypes) {
    const newNode = {
      name: relType,
      size: 5,
    };
    const relNodeName = node.name + "_" + relType;
    nodes.value[relNodeName] = newNode;
    edges.value[`edge${Object.keys(edges.value).length + 1}`] = {
      source: node.name,
      target: relNodeName,
    };
  }
};

// onmounted, if no nodes, add example nodes one by one
onMounted(() => {
  if (Object.keys(nodes.value).length === 0) {
    for (const nodeName in exampleNodes) {
      handleNodeCreated(exampleNodes[nodeName]);
    }

    for (const relationship of exampleRelationships) {
      edges.value[`edge${Object.keys(edges.value).length + 1}`] = {
        source: relationship.from,
        target: relationship.to,
        label: "",
      };
      console.log("created relationship", relationship);
    }
  }
});
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
  {{ nodes }}
  <br />
  <br />
  <br />
  <br />
  {{ edges }}
  <NodeCreatorModal @node-created="handleNodeCreated" />
</template>

<style>
.graph {
  width: 800px;
  height: 600px;
  border: 1px solid #000;
}
</style>
