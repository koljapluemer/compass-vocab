<template>
  <button class="btn fixed bottom-3 right-14" @click="toggleModal">
    Create New Learning Node
  </button>

  <div class="modal" :class="{ 'modal-open': showModal }">
    <div class="modal-box">
      <p class="py-4">
        <input
          v-model="name"
          class="input"
          type="text"
          placeholder="Front side (native lang)"
        />
        <input
          v-model="translation"
          type="text"
          class="input"
          placeholder="Back side (target lang)"
        />
      </p>
      <div class="modal-action">
        <button class="btn" @click="toggleModal">Close</button>
        <button class="btn btn-primary" @click="createNode">
          Create Learning Node
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { VocabNode } from "@/types/VocabNode";

const showModal = ref(false);

function toggleModal(): void {
  showModal.value = !showModal.value;
}

const emit = defineEmits(["node-created"]);


const name = ref("");
const translation = ref("");
const info = ref("");
const imgLink = ref("");

const createNode = () => {
  const newNode: VocabNode = {
    name: name.value,
    translation: translation.value,
    info: info.value,
    imgLink: imgLink.value,
    learningData: {}
  };
  // Emit an event with the newly created node data
  emit("node-created", newNode);

  // Clear input fields after creating the node
  name.value = "";
  translation.value = "";
  info.value = "";
  imgLink.value = "";

};


</script>
