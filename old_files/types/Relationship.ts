import { RelationshipType } from "./RelationshipType.ts";
import { VocabNode } from "./VocabNode.ts";

export interface Relationship {
    type: RelationshipType;
    connectedNode: VocabNode;
    description: string;
}
