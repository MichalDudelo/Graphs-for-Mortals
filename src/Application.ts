import * as graph from "./Graph"
import * as algorithms from "./algorithms/Algorithm"
import * as d3 from "d3"

class MyLink<T> {
    constructor (public source: MyNode<T>,
        public target: MyNode<T>) {
    };
}

class MyNode<T> {
    x: number;
    y: number;
    fixed: boolean;
    constructor(public id: T) {
    }
}

window.onload = () => {
    const height = 500, width = 900;
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .classed("svg-border", true);

    svg.on("contextmenu", () => event.preventDefault());

    const nodes = [0,1,2,3,4,5]
        .map(e => new MyNode(e));

    const links = [[0,1], [0,5], [1,5], [5,4], [1,4], [3,4], [2,3], [1,2], [2,5]]
        .map(pair => new MyLink(nodes[pair[0]], nodes[pair[1]]));

    const force = d3.layout.force()
        .nodes(nodes)
        .links(links)
        .size([width, height])
        .linkDistance(100)
        .charge(-200)
        .start();

    const link = svg.selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .classed("link", true);

    const drag = force.drag()
        .on("dragstart", dragstart);

    const node = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g");
        
    const circles = node.append("circle")
        .classed("node", true)
        .attr("r", 12)
        .call(drag)
        .classed("not-visited", true);

    const texts = node.append("text")
        .text(d => "v" + d.id);

    let active: d3.Selection<any> = d3.select(".node")
        .classed("not-visited", false)
        .classed("active", true);

    /** defaultPrevented is checked to distinguish 
        drag and click events. */
    node.on("click", function() {
        if (event.defaultPrevented)
            return;
        event.preventDefault();
        active.classed("not-visited", true)
            .classed("active", false);
        active = d3.select(this).select("circle");
        active.classed("not-visited", false)
            .classed("active", true);
    });

    type AnyNode = MyNode<any>;

    node.on("contextmenu", function(d: AnyNode) {
        event.preventDefault();
        d3.select(this).classed("fixed", d.fixed = false);
    });

    function dragstart(d: AnyNode) {
        event.stopPropagation();
        d3.select(this).classed("fixed", d.fixed = true);
    }

    force.on("tick", function() {
        link.attr("x1", link => link.source.x)
            .attr("y1", link => link.source.y)
            .attr("x2", link => link.target.x)
            .attr("y2", link => link.target.y);

        /** this is much smoother than using transform on the group */
        circles.attr("cx", node => node.x)
            .attr("cy", node => node.y);

        texts.attr("x", node => node.x - 15)
            .attr("y", node => node.y - 15);
    });

    d3.select("#runAlgorithm")
        .attr("value", "Run DFS")
        .classed({ "disabled": false, "active": true })
        .on("click", function () {
            d3.select(this)
              .classed({ "disabled": true, "active": false })
              .on("click", null);
            run(new algorithms.DepthFirstSearch());
        });

    function run(toRun: algorithms.Algorithm) {
        toRun.run(graph.GraphCreator.toAdjacencyGraph(nodes, links));
    }
};