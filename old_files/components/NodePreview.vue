<template>
  <span class="card shadow-sm border p-2 cursor-pointer" @click="handleClick">
    <small>{{ node.back }}</small></span
  >
</template>

<script setup lang="ts">
import VocabNode from "@/types/VocabNode";
import { ref, defineProps, emit, inject } from "vue";

const props = defineProps<{
  node: VocabNode;
}>();

// changeCurrentNodeTo
const changeCurrentNodeTo = inject<Function>("changeCurrentNodeTo");

const handleClick = () => {
  changeCurrentNodeTo(props.node);
};

</script>

<style scoped>
.card-body {
  font-size: 10px;
}

.card-title {
  font-size: 12px;
}
</style>
