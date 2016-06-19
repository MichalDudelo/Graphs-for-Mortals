class Link<T> {
    constructor (public source: Node<T>,
        public target: Node<T>) {
    };
}

class Node<T> {
    x: number;
    y: number;
    px: number;
    py: number;
    fixed: boolean;
    constructor(public id: T) {
    }
}

type Nodes<T> = Node<T>[];
type Links<T> = Link<T>[];

class GraphCreator<T> {
    static toAdjacencyGraph<T>(nodes: Node<T>[], links: Links<T>): Graph<T> {
        return new AdjacencyGraph<T>();
    }

    static toTestGraph<T>(nodes: Node<T>[], links: Links<T>): Graph<T> {
        return new TestGraph(nodes, links);
    }
}

interface Graph<T> {
    nodes(): Nodes<T>;
    links(): Links<T>;
}

class TestGraph<T> implements Graph<T> {
    constructor(private nodes_: Nodes<T>, private links_: Links<T>) {};
    
    nodes(): Nodes<T> {
        return this.nodes_;
    }

    links(): Links<T> {
        return this.links_;
    }
}

class AdjacencyGraph<T> implements Graph<T> {
    nodes(): Nodes<T> {
        return [];
    }

    links(): Links<T> {
        return [];
    }
}

export { GraphCreator, Graph, Link, Node };