/// <reference path="../typings/index.d.ts" />
import { Graph, GraphCreator, Node, Link } from "./Graph";
import { GraphDisplay } from "./GraphDisplay"
import * as algorithms from "./algorithms/Algorithm";
import * as d3 from "d3";
import { ContextMenu } from "./ContextMenu";

window.onload = () => {
    const height = 500, width = 900;

    const svg = d3.select("svg")
        .attr({"width": width, "height": height});

    svg.append("rect")
        .attr({"x": 0, "y": 0, "width": width, "height": height})
        .classed("svg-border", true);

    svg.on("contextmenu", () => (d3.event as Event).preventDefault());

    const initNodes = [0,1,2,3,4,5]
        .map(e => new Node(e));

    const initLinks = [[0,1], [0,5], [1,5], [5,4], [1,4], [3,4], [2,3], [1,2], [2,5]]
        .map(pair => new Link(initNodes[pair[0]], initNodes[pair[1]]));

    const graph = GraphCreator.toTestGraph(initNodes, initLinks);

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

    const menu = new ContextMenu();
    menu.addItem("Release node", releaseNode);
    menu.addItem("Set active", setActive);
    menu.addItem("Remove node", removeNode);

    d3.select("body").on("click", menu.close);

    function releaseNode() {
        (d3.event as Event).preventDefault()
        d3.select(this)
          .classed("fixed", d => d.fixed = false);
        force.resume();
    }

    function removeNode() {
        (d3.event as Event).preventDefault();
        const nodeToRemove: Node<any> = d3.select(this).datum();
        graph.removeNode(nodeToRemove.id);
        graph.nodes().forEach(n => n.fixed = false);
        graphDisplay.updateGraph();
        force.stop();
        force.nodes(graph.nodes()).links(graph.links()).start();
    }

    let active: d3.Selection<any> = d3.select(".node")
        .classed({"not-visited": false, "active": true});

    function setActive(d: Node<any>) {
        if ((d3.event as Event).defaultPrevented)
            return;
        (d3.event as Event).preventDefault()
        active.classed({"not-visited": true, "active": false});
        active = d3.select(this);
        active.classed({"not-visited": false, "active": true});
    }

    type AnyNode = Node<any>; 

    function updateListeners() {
        const nodesSelection = graphDisplay.selectNodes();    
    
        nodesSelection.on("click", onNodeClick);
        nodesSelection.on("contextmenu", onNodeRightClick);
    }

    /** defaultPrevented is checked to distinguish 
        drag and click events. */
    function onNodeClick() {
        if ((d3.event as Event).defaultPrevented)
            return;
        setActive.call(this);
    }

    function onNodeRightClick(d: Node<any>) {
        menu.show(d.x ? d.x : 0, d.y ? d.y : 0, this);
    }

    function onSvgClick() {
        if ((d3.event as Event).defaultPrevented)
            return;
        const id = Math.max(...graph.nodes().map(n => n.id)) + 1;
        graph.addNode(id);
        graphDisplay.updateGraph();
        updateListeners();
        force.start();
    }

    function dragstart(d: AnyNode) {
        (d3.event as d3.BaseEvent).sourceEvent.stopPropagation();
        d3.select(this).classed("fixed", d.fixed = true);
    }

    force.on("tick", e => graphDisplay.updatePositions());

    d3.select("#circleLayout")
        .attr("value", "Circle layout")
        .on("click", setNodesOnCircle);

    d3.select("#runAlgorithm")
        .attr("value", "Run example algorithm");

    function setNodesOnCircle() {
        const nodes = graph.nodes();
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
        graphDisplay.updatePositionsOverTime();
        force.stop();
    }

    function toRad(degrees: number) {
        return degrees * Math.PI / 180.0;
    }
};