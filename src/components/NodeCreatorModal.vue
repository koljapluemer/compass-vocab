<template>
  <button class="btn" @click="toggleModal">Create New Node</button>

  <div class="modal" :class="{ 'modal-open': showModal }">
    <div class="modal-box">
      <p class="py-4">
        <input
          v-model="front"
          class="input"
          type="text"
          placeholder="Front side (native lang)"
        />
        <input
          v-model="back"
          type="text"
          class="input"
          placeholder="Back side (target lang)"
        />
      </p>
      <div class="modal-action">
        <button class="btn" @click="toggleModal">Close</button>
        <button class="btn btn-primary" @click="createNode">Create Node</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Node } from "@/types/Node";

const showModal = ref(false);

function toggleModal(): void {
  showModal.value = !showModal.value;
}

const emit = defineEmits(["node-created"]);

const front = ref("");
const back = ref("");

const createNode = () => {
  if (!front.value || !back.value) {
    alert("Please fill in both front and back sides");
    return;
  }

  const newNode: Node = {
    id: generateNodeId(), // You need to define a function to generate unique IDs
    connectedNodes: new Map(),
    front: front.value,
    back: back.value,
  };

  // Emit an event with the newly created node data
  emit("node-created", newNode);

  // Clear input fields after creating the node
  front.value = "";
  back.value = "";
};

const generateNodeId = () => {
  // You can implement a logic to generate unique IDs here
  return Math.random().toString(36).substring(2, 15);
};
</script>
