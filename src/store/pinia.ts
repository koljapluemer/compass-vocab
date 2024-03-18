import { defineStore } from "pinia";
import { VocabNode } from "../types/VocabNode";

// save store in local storage
export const useNodeStore = defineStore({
  id: "nodes-store",
  state: () => ({
    nodes: [] as VocabNode[],
  }),
  persist: true,
  actions: {
    addNode(node: VocabNode) {
      this.nodes.push(node);
    },
    removeNode(node) {
      this.nodes.splice(this.nodes.indexOf(node), 1);
    }
  },
});
