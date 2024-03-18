import { VocabNode } from "../types/VocabNode";
import { Relationship } from "../types/Relationship";

// Function to serialize nodes for storage
const serializeNodes = (nodes: VocabNode[]): string => {
  const serializedNodes = nodes.map((node) => {
    // Serialize node properties
    const serializedNode: any = {
      id: node.id,
      front: node.front,
      back: node.back,
      info: node.info,
      learningData: node.learningData,
      imgLink: node.imgLink,
      connectedNodes: [],
    };

    // Serialize relationships
    node.connectedNodes.forEach((relationship) => {
      serializedNode.connectedNodes.push({
        type: relationship.type,
        connectedNodeId: relationship.connectedNode.id,
        description: relationship.description,
      });
    });

    return serializedNode;
  });

  return JSON.stringify(serializedNodes);
};

// Function to deserialize nodes from storage
const deserializeNodes = (serializedNodes: string): VocabNode[] => {
  const simplifiedNodes = JSON.parse(serializedNodes);

  // Initialize originalNodes array before the loop
  const originalNodes: VocabNode[] = [];

  // Reconstruct the original nodes with correct relationships
  simplifiedNodes.forEach((serializedNode: any) => {
    const originalNode: VocabNode = {
      id: serializedNode.id,
      front: serializedNode.front,
      back: serializedNode.back,
      info: serializedNode.info,
      learningData: serializedNode.learningData,
      imgLink: serializedNode.imgLink,
      connectedNodes: [],
    };

    // Deserialize relationships
    serializedNode.connectedNodes.forEach((serializedRelationship: any) => {
      const connectedNode: VocabNode = originalNodes.find(
        (node: VocabNode) => node.id === serializedRelationship.connectedNodeId
      )!;
      if (connectedNode) {
        const relationship: Relationship = {
          type: serializedRelationship.type,
          connectedNode: connectedNode,
          description: serializedRelationship.description,
        };
        originalNode.connectedNodes.push(relationship);
      }
    });

    // Push the reconstructed node to the originalNodes array
    originalNodes.push(originalNode);
  });

  return originalNodes;
};

// Usage
export const saveNodesToLocalStorage = (nodes: VocabNode[]): void => {
  const serializedNodes = serializeNodes(nodes);
  localStorage.setItem("vocab-nodes", serializedNodes);
};

export const loadNodesFromLocalStorage = (): VocabNode[] => {
  console.log("loadNodesFromLocalStorage");
  const serializedNodes = localStorage.getItem("vocab-nodes");
  console.log("serializedNodes", serializedNodes);
  if (serializedNodes) {
    return deserializeNodes(serializedNodes);
  }
  return [];
};
