/// <reference path="../typings/tsd.d.ts" />
//import * as validator from "./ZipCodeValidator"

class MyLink {
    constructor (public source: MyNode,
        public target: MyNode) {
    };
}

class MyNode {
    x: number;
    y: number;
    fixed: boolean;
    constructor(public id: any) {
    }
}

window.onload = () => {
    const height = 500, width = 900;
    const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.on("contextmenu", () => event.preventDefault());

    const nodes = [1, 2, 3, 4, 5]
        .map(e => new MyNode(e));

    const links = [[1, 2], [2, 3], [3, 4], [3, 5], [4, 5]]
        .map(pair => new MyLink(nodes[pair[0] - 1], nodes[pair[1] - 1]));

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
        .append("circle")
        .classed("node", true)
        .classed("not-visited", true)
        .attr("r", 12)
        .call(drag);

    let active: d3.Selection<any> = d3.select(".node").classed("active", true);

    node.on("contextmenu", function(d: MyNode) {
        event.preventDefault();
        active.classed("not-visited", true)
          .classed("active", false);
        active = d3.select(this);
        active.classed("not-visited", false)
          .classed("active", true);
    });

    node.on("dblclick", function(d: MyNode) {
        d3.select(this).classed("fixed", d.fixed = false);
    });

    function dragstart(d: MyNode) {
        d3.select(this).classed("fixed", d.fixed = true);
    }

    force.on("tick", function() {
        link.attr("x1", function(d: MyLink) { return d.source.x; })
            .attr("y1", function(d: MyLink) { return d.source.y; })
            .attr("x2", function(d: MyLink) { return d.target.x; })
            .attr("y2", function(d: MyLink) { return d.target.y; });

        node.attr("cx", function(d: MyNode) { return d.x; })
            .attr("cy", function(d: MyNode) { return d.y; });
    });
};