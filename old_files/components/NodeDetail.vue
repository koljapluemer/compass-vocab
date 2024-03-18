<template>
  <Transition name="generic-fade">
    <div class="grid grid-cols-6 gap-4 m-4" :key="props.node.id">
      <!-- concordances, parents, GOES_WITH, opposite, main, related, confusables, children, variations -->
      <div class="flex gap-2 text-right">
        <NodePreview
          v-for="node in getRelatedNodesOfType('EXAMPLE')"
          :node="node"
        />
        <small>Examples</small>
      </div>
      <div
        class="col-span-4 flex gap-2 items-center justify-end text-center flex-reverse"
      >
        <NodePreview
          v-for="node in getRelatedNodesOfType('PARENT')"
          :node="node"
        />
        <small>Parents </small>
      </div>
      <div class="flex gap-2 justify-end items-start">
        <NodePreview
          v-for="node in getRelatedNodesOfType('GOES_WITH')"
          :node="node"
        />
        <small>Goes With</small>
      </div>
      <div class="flex gap-2 justify-center items-end text-right">
        <small>Opposites </small>
        <NodePreview
          v-for="node in getRelatedNodesOfType('OPPOSITE')"
          :node="node"
        />
      </div>
      <div class="col-span-4">
        <div class="card shadow-md border">
          <div class="card-body flex flex-col items-center text-center">
            <h2 class="card-title text-center">{{ node.back }}</h2>
            <div class="">{{ node.front }}</div>
          </div>
        </div>
      </div>
      <div class="flex gap-2 justify-center items-start">
        <small>Related </small>
        <NodePreview
          v-for="node in getRelatedNodesOfType('RELATED')"
          :node="node"
        />
      </div>
      <div class="flex gap-2 text-right">
        <small>Confusable</small>
        <NodePreview
          v-for="node in getRelatedNodesOfType('CONFUSABLE')"
          :node="node"
        />
      </div>
      <div class="col-span-4 flex gap-2 items-center text-center">
        <small>Children </small>
        <NodePreview
          v-for="node in getRelatedNodesOfType('CHILD')"
          :node="node"
        />
      </div>
      <div class="flex gap-2 items-start justify-start">
        <small>Rhymes</small>
        <NodePreview
          v-for="node in getRelatedNodesOfType('RHYME')"
          :node="node"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import VocabNode from "@/types/VocabNode";
import NodePreview from "./NodePreview.vue";
import { ref, defineProps, computed } from "vue";

const props = defineProps<{
  node: VocabNode;
}>();

// Define a computed property to get related nodes of a specific type for the current node
const getRelatedNodesOfType = (relationshipType: RelationshipType) => {
  // filter the connectedNodes[], which is made out of Relationship objects (which have a RelationshipType)
  // but return the connectedNode property of the Relationship object
  return props.node.connectedNodes
    .filter((relationship) => relationship.type === relationshipType)
    .map((relationship) => relationship.connectedNode);
};
</script>

<style scoped>
.grid > * {
  display: flex;
  flex-direction: column;
}

.generic-fade-enter-active {
  transition: opacity 0.5s ease;
}

.generic-fade-enter-from,
.generic-fade-leave-to {
  opacity: 0;
}
</style>
