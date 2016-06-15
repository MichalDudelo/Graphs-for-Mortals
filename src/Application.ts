/// <reference path="../typings/tsd.d.ts" />
//import * as validator from "./ZipCodeValidator"

window.onload = () => {
    const height = 500, width = 900;
    const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const nodes = [1, 2, 3, 4, 5]
        .map(e => { return { id: e } });

    const links = [[1, 2], [2, 3], [3, 4], [3, 5], [4, 5]]
        .map(pair => { return { source: nodes[pair[0]], target: nodes[pair[1]] }; });

    const numbers = [1, 2, 5, -3];
    const squares = _.map(numbers, x => x*x);
    console.log(squares);
};