import { Relationship } from "./Relationship";

export interface VocabNode {
    id: string;
    connectedNodes: Relationship[];
    front: string;
    back: string;
    info: string;
    learningData: {};
    imgLink: string;
}