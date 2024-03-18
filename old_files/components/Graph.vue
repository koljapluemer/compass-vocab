<template>
  <div class="graph">
    <NodeDetail :node="currentNode" v-if="currentNode" />
  </div>

  <NodeCreatorModal @node-created="handleNodeCreated" />
</template>

<script setup lang="ts">
import { ref, defineProps, provide, watch, onMounted } from "vue";
import { VocabNode } from "@/types/VocabNode";
import { Relationship } from "@/types/Relationship";
import NodeDetail from "./NodeDetail.vue";
import NodeCreatorModal from "./NodeCreatorModal.vue";


const currentNode = ref<VocabNode | null>(null);

import { useNodeStore } from "@/store/pinia";
const store = useNodeStore();

const handleNodeCreated = (newNode: VocabNode) => {
  // Add the new node to the list of nodes
  store.addNode(newNode);

  // Perform any other necessary actions, such as updating relationships (TODO)
};

// Create a function to establish a relationship between two nodes
const createRelationship = (
  firstNode: VocabNode,
  secondNode: VocabNode,
  relationshipType: RelationshipType
) => {
  const newRelationship: Relationship = {
    type: relationshipType,
    connectedNode: secondNode,
  };

  // Add the relationship to the first node's connected nodes
  firstNode.connectedNodes.push(newRelationship);

  // Handle reverse relationships
  // if related, type, confusable, opposite or rhyme, add the same relationship to the second node
  if (
    relationshipType === "RELATED" ||
    relationshipType === "CONFUSABLE" ||
    relationshipType === "OPPOSITE" ||
    relationshipType === "GOES_WITH" ||
    relationshipType === "RHYME"
  ) {
    const newRelationshipForSecondNode: Relationship = {
      type: relationshipType,
      connectedNode: firstNode,
    };

    secondNode.connectedNodes.push(newRelationshipForSecondNode);
  }
  // if parent or example, add first node as a child of the second node
  if (relationshipType === "PARENT" || relationshipType === "EXAMPLE") {
    const newRelationshipForSecondNode: Relationship = {
      type: "CHILD",
      connectedNode: firstNode,
    };

    secondNode.connectedNodes.push(newRelationshipForSecondNode);
  }
  // if child, add second node as a parent of the first node
  if (relationshipType === "CHILD") {
    const newRelationshipForSecondNode: Relationship = {
      type: "PARENT",
      connectedNode: firstNode,
    };

    secondNode.connectedNodes.push(newRelationshipForSecondNode);
  }
};

const changeCurrentNodeTo = (node: VocabNode) => {
  currentNode.value = node;
};

provide("changeCurrentNodeTo", changeCurrentNodeTo);

const exampleNodes: VocabNode[] = [
  {
    id: "1",
    connectedNodes: [],
    front: "bicycle",
    back: "بـِسكيلـِتّـَة",
    info: "biskeelitta",
  },
  {
    id: "2",
    connectedNodes: [],
    front: "vehicle",
    back: " و َسيلـِة ا ِلنـَقل",
    info: "waseelit ilna'l",
  },
  {
    id: "3",
    connectedNodes: [],
    front: "pedestrian",
    back: "مَشـاة ",
    info: "mushaet",
  },
  {
    id: "4",
    connectedNodes: [],
    front: "car",
    back: " عـَر َبـِيـَة",
    info: "3arabiyya",
  },
  {
    id: "5",
    connectedNodes: [],
    front: "wheel",
    back: " عـَجـَل",
    info: "3agal",
  },
  {
    id: "6",
    connectedNodes: [],
    front: "This bicycle is mine",
    back: " البسكلتة دي بتاعتي. ",
    info: "albiskeelitta di bta3ti",
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
  },
];

const setupExample = () => {
  // loop example nodes and add them to the store
  exampleNodes.forEach((node) => {
    store.addNode(node);
  });
  // create connections
  // #2 is a parent of #1
  createRelationship(exampleNodes[0], exampleNodes[1], "PARENT");
  // #3 is related to #1
  createRelationship(exampleNodes[0], exampleNodes[2], "RELATED");
  // #4 is opposite of #1
  createRelationship(exampleNodes[0], exampleNodes[3], "OPPOSITE");
  // #5 is a child of #1
  createRelationship(exampleNodes[0], exampleNodes[4], "CHILD");
  // #6 is a concordance of #1
  createRelationship(exampleNodes[0], exampleNodes[5], "EXAMPLE");
  // #7 is a concordance of #1
  createRelationship(exampleNodes[0], exampleNodes[6], "EXAMPLE");
  // #8 is confusable with #1
  createRelationship(exampleNodes[0], exampleNodes[7], "CONFUSABLE");
  // #9 is ryhme with #1
  createRelationship(exampleNodes[0], exampleNodes[8], "RHYME");
  // #10 is a type of #1
  createRelationship(exampleNodes[0], exampleNodes[9], "GOES_WITH");
};

setupExample();
currentNode.value = store.nodes[0];
</script>
