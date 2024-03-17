<template>
  <div class="graph">
    <!-- Render nodes -->
    <div v-for="node in nodes" :key="node.id" class="node">
      {{ node.id }}
    </div>
    <!-- Render relationships -->
    <div
      v-for="relationship in relationships"
      :key="relationship.id"
      class="relationship"
    >
      <!-- You can render the connections visually here -->
    </div>
  </div>

  <NodeCreatorModal />
</template>

<script setup lang="ts">
import { Node } from "@/types/Node";
import { Relationship } from "@/types/Relationship";
import NodeCreatorModal from "./NodeCreatorModal.vue";

const props = defineProps<{
  nodes: Node[];
  relationships: Relationship[];
}>();

const handleNodeCreated = (newNode: Node) => {
  // Add the new node to the list of nodes
  nodes.value.push(newNode);

  // Perform any other necessary actions, such as updating relationships
};
</script>
