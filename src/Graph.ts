type Node<T> = { id: T };
type Link<T> = { source: Node<T>, target: Node<T> };
type Nodes<T> = Node<T>[];
type Links<T> = Link<T>[];

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