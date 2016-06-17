import { Graph } from "../Graph"

interface Algorithm {
    run(graph: Graph): void;
}

export { Algorithm, Graph };
export * from "./DepthFirstSearch";