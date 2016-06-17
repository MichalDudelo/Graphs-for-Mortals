type Node<T> = { id: T };
type Link<T> = { source: Node<T>, target: Node<T> };
type Nodes<T> = Node<T>[];
type Links<T> = Link<T>[];

class GraphCreator<T> {
    static toAdjacencyGraph<T>(nodes: Node<T>[], links: Link<T>[]): Graph<T> {
        return new AdjacencyGraph<T>();
    }
}

interface Graph<T> {
    nodes(): Nodes<T>;
}

class AdjacencyGraph<T> implements Graph<T> {
    nodes(): Nodes<T> {
        return [];
    }
}

export { GraphCreator };
export { Graph };