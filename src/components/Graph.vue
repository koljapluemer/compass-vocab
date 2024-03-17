<template>
  <div class="graph">
    <NodeDetail :node="currentNode" v-if="currentNode" />
  </div>

  <NodeCreatorModal @node-created="handleNodeCreated" />
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import { Node } from "@/types/Node";
import { Relationship } from "@/types/Relationship";
import NodeDetail from "./NodeDetail.vue";
import NodeCreatorModal from "./NodeCreatorModal.vue";

const nodes = ref<Node[]>([]); // Assuming nodes are stored in a ref

const currentNode = ref<Node | null>(null);

const handleNodeCreated = (newNode: Node) => {
  // Add the new node to the list of nodes
  nodes.value.push(newNode);

  // Perform any other necessary actions, such as updating relationships (TODO)
};

// Create a function to establish a relationship between two nodes
const createRelationship = (
  firstNode: Node,
  secondNode: Node,
  relationshipType: RelationshipType
) => {
  const newRelationship: Relationship = {
    type: relationshipType,
    connectedNode: secondNode,
  };

  // Add the relationship to the first node's connected nodes
  firstNode.connectedNodes.push(newRelationship);
};

const exampleNotes: Node[] = [
  {
    id: "1",
    connectedNodes: [],
    front: "bicycle",
    back: "بـِسكيلـِتّـَة",
    info: "biskeelitta"
  },
  {
    id: "2",
    connectedNodes: [],
    front: "vehicle",
    back: " و َسيلـِة ا ِلنـَقل",
    info: "waseelit ilna'l"

  },
  {
    id: "3",
    connectedNodes: [],
    front: "pedestrian",
    back: "مَشـاة ",
    info: "mushaet"
  },
  {
    id: "4",
    connectedNodes: [],
    front: "car",
    back: " عـَر َبـِيـَة",
    info: "3arabiyya"
  },
  {
    id: "5",
    connectedNodes: [],
    front: "wheel",
    back: " عـَجـَل",
    info: "3agal"
  },
  {
    id: "6",
    connectedNodes: [],
    front: "This bicycle is mine",
    back: " البسكلتة دي بتاعتي. ",
    info: "albiskeelitta di bta3ti"

  },
  {
    id: "7",
    connectedNodes: [],
    front: " Cars took the place of bicycles.",
    back: "السيارات حلت محل الدراجات.",
  },
  {
    id: "8",
    connectedNodes: [],
    front: "dependent",
    back: "عا َلـَة",
  },
  {
    id: "9",
    connectedNodes: [],
    front: "gathering",
    back: "محفلّة",
  },
  {
    id: "10",
    connectedNodes: [],
    back: "أحمـَر",
    front: "red",
  }
];

const setupExample = () => {
  nodes.value = exampleNotes;
  currentNode.value = exampleNotes[0];
  // create connections
  // #2 is a parent of #1
  createRelationship(exampleNotes[0], exampleNotes[1], "PARENT");
  // #3 is related to #1
  createRelationship(exampleNotes[0], exampleNotes[2], "RELATED");
  // #4 is opposite of #1
  createRelationship(exampleNotes[0], exampleNotes[3], "OPPOSITE");
  // #5 is a child of #1
  createRelationship(exampleNotes[0], exampleNotes[4], "CHILD");
  // #6 is a concordance of #1
  createRelationship(exampleNotes[0], exampleNotes[5], "EXAMPLE");
  // #7 is a concordance of #1
  createRelationship(exampleNotes[0], exampleNotes[6], "EXAMPLE");
  // #8 is confusable with #1
  createRelationship(exampleNotes[0], exampleNotes[7], "CONFUSABLE");
  // #9 is ryhme with #1
  createRelationship(exampleNotes[0], exampleNotes[8], "RHYME");
  // #10 is a type of #1
  createRelationship(exampleNotes[0], exampleNotes[9], "TYPE");
};

setupExample();
</script>
