import { RelationshipType } from "./RelationshipType";
import { VocabNode } from "./VocabNode.ts";

export interface Relationship {
    type: RelationshipType;
    connectedNode: VocabNode;
    description: string;
}
