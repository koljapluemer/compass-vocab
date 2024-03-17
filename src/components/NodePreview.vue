<template>
  <span class="card shadow-sm border p-2">
    <small>{{ node.back }}</small></span
  >
</template>

<script setup lang="ts">
import Node from "@/types/Node";
import { ref, defineProps } from "vue";

const props = defineProps<{
  node: Node;
}>();
</script>

<style scoped>
.card-body {
  font-size: 10px;
}

.card-title {
  font-size: 12px;
}
</style>
