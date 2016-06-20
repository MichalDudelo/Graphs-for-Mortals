class Link<T> {
    constructor (public source: Node<T>,
        public target: Node<T>) {
    };
}

class Node<T> {
    x = 0;
    y = 0;
    px = 0;
    py = 0;
    fixed = false;
    constructor(public id: T) {
    }
}

type Nodes<T> = Node<T>[];
type Links<T> = Link<T>[];

class GraphCreator<T> {
    /* static toAdjacencyGraph<T>(nodes: Node<T>[], links: Links<T>): Graph<T> {
        return new AdjacencyGraph<T>();
    }*/

    static toTestGraph<T>(nodes: Node<T>[], links: Links<T>): Graph<T> {
        return new TestGraph(nodes, links);
    }
}

interface Graph<T> {
    nodes(): Nodes<T>;
    links(): Links<T>;
    addNode(id: T): void;
    removeNode(id: T): void;
    addLink(sourceId: T, targetId: T): void;
}

class TestGraph<T> implements Graph<T> {
    constructor(private nodes_: Nodes<T>, private links_: Links<T>) {};
    
    nodes(): Nodes<T> {
        return this.nodes_;
    }

    links(): Links<T> {
        return this.links_;
    }

    addNode(id: T): void {
        this.nodes_.push(new Node(id));
    }

    removeNode(id: T): void {
        this.nodes_ = this.nodes_.filter(n => n.id !== id);
        this.links_ = this.links_.filter(link => link.source.id !== id && link.target.id !== id);
    }

    addLink(sourceId: T, targetId: T): void {
        this.links_.push(new Link(this.findNode(sourceId), this.findNode(targetId)));
    }

    private findNode(id: T): Node<T> {
        return this.nodes_.filter(n => n.id === id)[0];
    }
}

/*class AdjacencyGraph<T> implements Graph<T> {
    nodes(): Nodes<T> {
        return [];
    }

    links(): Links<T> {
        return [];
    }
}*/

export { GraphCreator, Graph, Link, Node };