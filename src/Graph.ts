type Node<T> = { id: T };
type Link<T> = { source: Node<T>, target: Node<T> };

class GraphCreator<T> {
    static toAdjacencyGraph<T>(nodes: Node<T>[], links: Link<T>[]): Graph {
        return new AdjacencyGraph();
    }
}

interface Graph {

}

class AdjacencyGraph implements Graph {

}

export { GraphCreator };
export { Graph };