/// <reference path="../typings/index.d.ts" />
import { Graph, Link, Node } from "./Graph"
import * as d3 from "d3"

type DragBehaviour = d3.behavior.Drag<d3.layout.force.Node>;

export class GraphDisplay {
    private nodeSize = 15;
    private svg: d3.Selection<any>;
    private nodeDrag: DragBehaviour;

    constructor(public graph: Graph<number>, drag?: DragBehaviour) { 
        this.svg = d3.select("svg");
        if(drag)
            this.nodeDrag = drag;
    };

    updateLinks(): void {
        const links = this.selectLinks();
        links.exit().remove();
        links.enter()
            .append("line")
            .classed("link", true);
        this.updateLinksPositions(links);
    }

    private selectLinks() {
        return this.svg.selectAll(".link")
            .data(this.graph.links(), (link) => (link.source.id + " " + link.target.id));
    }

    updateLinksPositions(links?: d3.selection.Update<Link<number>>): void {
        const selection = links ? links : this.selectLinks();
        selection.attr("x1", link => link.source.x)
            .attr("y1", link => link.source.y)
            .attr("x2", link => link.target.x)
            .attr("y2", link => link.target.y);
    }

    updateNodes(): void {
        const groups = this.selectNodeGroups();
            
        groups.exit().remove();

        const groupsEnter = groups.enter()
            .append("g")
            .classed("nodeGroup", true);

        groupsEnter.append("circle")
            .classed("node", true)
            .attr("r", 12)
            .classed("not-visited", true);

        groupsEnter.append("text")
            .text(d => "v" + d.id)
            .classed("nodeName", true);

        if(this.nodeDrag)
            groupsEnter.select(".node").call(this.nodeDrag);

        this.updateNodesPositions(groups);
    }

    private selectNodeGroups() {
        return this.svg.selectAll(".nodeGroup")
            .data(this.graph.nodes(), (node) => node.id.toString());
    }

    selectNodes() {
        return this.selectNodeGroups().select(".node");
    }

    updateNodesPositions(group?: d3.selection.Update<Node<number>>): void {
        const selection = group ? group : this.selectNodeGroups();

        selection.select(".node")
            .attr("cx", node => node.x)
            .attr("cy", node => node.y);

        selection.select(".nodeName").attr("x", node => node.x - this.nodeSize)
            .attr("y", node => node.y - this.nodeSize);
    }

    // TODO Transition and Update cant be used interchangeably. This is duplication
    // of updateNodesPosition though.
    updateNodesPositionsOverTime(): void {
        const groups = this.selectNodeGroups();
        const duration = 1500;

        groups.transition().duration(duration)
            .select(".node")
            .attr("cx", node => node.x)
            .attr("cy", node => node.y);

        groups.transition().duration(duration)
            .select(".nodeName")
            .attr("x", node => node.x - this.nodeSize)
            .attr("y", node => node.y - this.nodeSize);

        this.selectLinks()
            .transition().duration(duration)
            .attr("x1", link => link.source.x)
            .attr("y1", link => link.source.y)
            .attr("x2", link => link.target.x)
            .attr("y2", link => link.target.y);
    }

    updateGraph(): void {
        this.updateLinks();
        this.updateNodes();
    }

    updatePositions(): void {
        this.updateLinksPositions();
        this.updateNodesPositions();
    }
}