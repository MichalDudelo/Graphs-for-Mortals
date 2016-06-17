import { Graph } from "../Graph"

interface Algorithm {
    run<T>(graph: Graph<T>): void;
}

export { Algorithm, Graph };
export * from "./DepthFirstSearch";