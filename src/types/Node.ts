import { Relationship } from "./Relationship";

export interface Node {
    id: string;
    connectedNodes: Map<string, Relationship[]>;
    front: string;
    back: string;
}