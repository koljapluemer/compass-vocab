<template>
  <div class="node-creator">
    <input v-model="front" type="text" placeholder="Front side (word)">
    <input v-model="back" type="text" placeholder="Back side (definition)">
    <button @click="createNode">Create Node</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Node } from '@/types/Node';

const emit = defineEmits(['node-created']);

const front = ref('');
const back = ref('');

const createNode = () => {
  if (!front.value || !back.value) {
    alert('Please fill in both front and back sides');
    return;
  }
  
  const newNode: Node = {
    id: generateNodeId(), // You need to define a function to generate unique IDs
    connectedNodes: new Map(),
    front: front.value,
    back: back.value,
  };

  // Emit an event with the newly created node data
  emit('node-created', newNode);

  // Clear input fields after creating the node
  front.value = '';
  back.value = '';
};

const generateNodeId = () => {
  // You can implement a logic to generate unique IDs here
  return Math.random().toString(36).substring(2, 15);
};
</script>