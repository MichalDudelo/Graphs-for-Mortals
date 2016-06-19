/// <reference path="../typings/index.d.ts" />
import { Graph, GraphCreator, Node, Link } from "./Graph";
import { GraphDisplay } from "./GraphDisplay"
import * as algorithms from "./algorithms/Algorithm";
import * as d3 from "d3";

window.onload = () => {
    const height = 500, width = 900;

    const svg = d3.select("svg")
        .attr({"width": width, "height": height});

    svg.append("rect")
        .attr({"x": 0, "y": 0, "width": width, "height": height})
        .classed("svg-border", true);

    svg.on("contextmenu", () => event.preventDefault());

    const nodes = [0,1,2,3,4,5]
        .map(e => new Node(e));

    const links = [[0,1], [0,5], [1,5], [5,4], [1,4], [3,4], [2,3], [1,2], [2,5]]
        .map(pair => new Link(nodes[pair[0]], nodes[pair[1]]));

    const graph = GraphCreator.toTestGraph(nodes, links);

    svg.on("click", onSvgClick);

    const force = d3.layout.force()
        .nodes(graph.nodes())
        .links(graph.links())
        .size([width, height])
        .linkDistance(150)
        .charge(-300)
        .start();

    const drag = force.drag()
        .on("dragstart", dragstart);

    const graphDisplay = new GraphDisplay(graph, drag);
    graphDisplay.updateGraph();
    updateListeners();

    type AnyNode = Node<any>; 

    function updateListeners() {
        const nodesSelection = graphDisplay.selectNodes();    
    
        nodesSelection.on("click", onNodeClick);
        nodesSelection.on("contextmenu", onNodeRightClick);
    }

    let active: d3.Selection<any> = d3.select(".node")
        .classed({"not-visited": false, "active": true});

    /** defaultPrevented is checked to distinguish 
        drag and click events. */
    function onNodeClick() {
        if (event.defaultPrevented)
            return;
        event.preventDefault();
        active.classed({"not-visited": true, "active": false});
        active = d3.select(this);
        active.classed({"not-visited": false, "active": true});
    }

    function onNodeRightClick(d: AnyNode) {
        event.preventDefault();
        d3.select(this).classed("fixed", d.fixed = false);
        force.resume();
    }

    function onSvgClick() {
        if (event.defaultPrevented)
            return;
        const id = nodes.length;
        nodes.push(new Node(id));
        links.push(new Link(nodes[0], nodes[id]));
        graphDisplay.updateGraph();
        updateListeners();
        force.start();
    }

    function dragstart(d: AnyNode) {
        event.preventDefault();
        d3.select(this).classed("fixed", d.fixed = true);
    }

    force.on("tick", e => graphDisplay.updatePositions());

    d3.select("#runAlgorithm")
        .attr("value", "Run DFS")
        .classed({ "disabled": false, "active": true })
        .on("click", function () {
            d3.select(this)
              .classed({ "disabled": true, "active": false })
              .on("click", null);
            setNodesOnCircle();
        });

    function setNodesOnCircle() {
        const svgCenter = [width/2, height/2];
        const dAngle = 360.0/nodes.length;
        const multiplier = 200;
        for(let i = 0; i < nodes.length; ++i) {
            const angle = toRad(i * dAngle);
            const xpos = svgCenter[0] + Math.sin(angle) * multiplier;
            const ypos = svgCenter[1] - Math.cos(angle) * multiplier;
            nodes[i].x = xpos;
            nodes[i].px = xpos;
            nodes[i].y = ypos;
            nodes[i].py = ypos;
            nodes[i].fixed = true;
        }
        graphDisplay.updateNodesPositionsOverTime();
        force.stop();
    }

    function toRad(degrees: number) {
        return degrees * Math.PI / 180.0;
    }
};