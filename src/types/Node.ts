import { Relationship } from "./Relationship";

export interface Node {
    id: string;
    connectedNodes: Relationship[];
    front: string;
    back: string;
    info: string;
}