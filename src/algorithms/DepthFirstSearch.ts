import { Algorithm, Graph } from "./Algorithm";
import { Stack } from "typescript-collections";
import * as d3 from "d3";

class DepthFirstSearch implements Algorithm {
    private stack = new Stack<number>();

    run(graph: Graph): void {
        console.log("DFS is running!");
        console.log("The stack is empty: " + this.stack.isEmpty());
    }
}

export { DepthFirstSearch };