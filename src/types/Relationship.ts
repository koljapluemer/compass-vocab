import { RelationshipType } from "./RelationshipType";

export interface Relationship {
    type: RelationshipType;
    connectedNode: Node;
}
