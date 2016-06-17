import { Algorithm, Graph } from "./Algorithm";
import { MyNode } from "../Application";
import { Stack } from "typescript-collections";
import * as d3 from "d3";

class DepthFirstSearch<T> implements Algorithm {
    private stack = new Stack<T>();
    private state: DepthFirstSearchState<T>;

    constructor(graph: Graph<T>, active: MyNode<T>) {
        this.state = new DepthFirstSearchState<T>(
            active.id, 
            graph.nodes().map(n => n.id).filter(id => id !== active.id)
        );
    }

    initialState(): DepthFirstSearchState<T> {
        return this.state;
    }

    run(graph: Graph<T>): void {
        console.log(`DFS is running!`);
        console.log("The stack is empty: " + this.stack.isEmpty());
    }
}

class DepthFirstSearchState<T> {
    stack: T[] = [];
    visited: T[] = [];
    constructor(public active: T, public notVisited: T[]) {}
}

export { DepthFirstSearch };