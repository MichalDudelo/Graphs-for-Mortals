/// <reference path="../typings/index.d.ts" />
import { Node } from "./Graph";
import * as d3 from "d3"

type Action = (d: Node<any>) => void;

class MenuItem {
    constructor(public title: string,
        public actions: Action) { }
}

export class ContextMenu {
    items: MenuItem[] = [];
    private created = false;

    addItem(title: string, action: Action) {
        this.items.push(new MenuItem(title, action));
    }

    show(x: number, y: number, clicked: any) {
        const menu = this;

        if(!this.created)
            this.create();

        d3.selectAll(".d3-context-menu").text("");
        const list = d3.selectAll(".d3-context-menu").append("ul");
        
        list.selectAll("li").data(this.items).enter()
            .append("li")
            .text(d => d.title)
            .on("click", function(d){
                d.actions.call(clicked);
                menu.close();
            });

        d3.select('.d3-context-menu')
            .style('left', x + 'px')
            .style('top', y + 'px')
            .style('display', 'block');

        event.preventDefault();
    }

    create() {
        d3.selectAll('.d3-context-menu').data([1])
            .enter()
            .append('div')
            .attr('class', 'd3-context-menu')
            .append("ul");
        this.created = true;
    }

    close() {
        d3.select('.d3-context-menu')
          .style('display', 'none');
    }
}