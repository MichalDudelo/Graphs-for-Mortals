import { Algorithm, Graph } from "./Algorithm"

class DepthFirstSearch implements Algorithm {
    run(grapg: Graph): void {
        console.log("DFS is running!");
    }
}

export { DepthFirstSearch };