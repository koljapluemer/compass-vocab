<template>
  <button class="btn" @click="toggleModal">Create New Node</button>

  <div class="modal" :class="{ 'modal-open': showModal }">
    <div class="modal-box">
      <p class="py-4">
        <NodeCreator />
      </p>
      <div class="modal-action">
        <button class="btn" @click="toggleModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import NodeCreator from "./NodeCreator.vue";

const showModal = ref(false);

function toggleModal(): void {
  showModal.value = !showModal.value;
}
</script>
