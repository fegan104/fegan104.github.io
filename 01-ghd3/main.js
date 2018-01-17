const svg = d3.select("body").append("svg")
  .attr("height", "100vh")
  .attr("width", "100vw")
  .on('mousemove', function () {
    var coordinates = d3.mouse(this)
    follow(coordinates)
  });
let points = [];
d3.json("circles.json", (err, data) => renderCircles(data))
d3.json("rectangles.json", (err, data) => renderRectangles(data))
//in memory data for lines
var lineData = [
  { "x": 360, "y": 255 },
  { "x": 405, "y": 265 },
  { "x": 450, "y": 255 }
];
var noseData = [
  { "x": 390, "y": 245 },
  { "x": 405, "y": 265 },
  { "x": 420, "y": 245 }
];
var pawData = [
  { "x": 480, "y": 420 },
  { "x": 470, "y": 460 },
  { "x": 520, "y": 500 },
  { "x": 570, "y": 460 },
  { "x": 560, "y": 420 }
];
//data for head
const headData = [
  { x: 550, y: 300 },
  { x: 400, y: 100 },
  { x: 250, y: 300 }
];
//data for left ear
const leftEarData = [
  { x: 375, y: 150 },
  { x: 295, y: 130 },
  { x: 325, y: 210 }
];
//data for left ear
const rightEarData = [
  { x: 425, y: 150 },
  { x: 505, y: 130 },
  { x: 475, y: 210 }
];
//This is the accessor function we talked about above
const lineFunction = d3.line()
  .x(d => d.x)
  .y(d => d.y);
//Draw head
const head = svg.append("path")
  .attr("d", lineFunction(headData))
  .attr("class", "fur");
//Draw nose
const nose = svg.append("path")
  .attr("d", lineFunction(noseData))
  .attr("class", "nose");
//Draw ears
const leftEar = svg.append("path")
  .attr("d", lineFunction(leftEarData))
  .attr("stroke-width", 20)
  .attr("stroke", "darkgray")
  .attr("class", "ear");

const rightEar = svg.append("path")
  .attr("d", lineFunction(rightEarData))
  .attr("stroke-width", 20)
  .attr("stroke", "darkgray")
  .attr("class", "ear");

//Draw mouth
const mouth = svg.append("path")
  .attr("d", lineFunction(lineData))
  .attr("stroke", "black")
  .attr("stroke-width", 2)
  .attr("fill", "none");

//Render circle form data
const renderCircles = data => {

  const circles = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle");

  //set circle attributes
  circles
    .attr("cx", d => d.x_axis)
    .attr("cy", d => d.y_axis)
    .attr("r", d => d.radius)
    .attr("class", "eye");

  let pupil1 = svg.append("circle")
    .attr("id", "pupil1")
    .attr("class", "pupil")
    .attr("cx", 365)
    .attr("cy", 220)
    .attr("r", 5)
    .attr("fill", "black")
    .data(points);
  let pupil2 = svg.append("circle")
    .attr("cx", 450)
    .attr("cy", 220)
    .attr("r", 5)
    .attr("fill", "black")
    .data(points);
}
//Render rectangles form data
const renderRectangles = data => {
  const rects = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect");

  //Draw the Rectangle
  rects
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("width", d => d.width)
    .attr("height", d => d.height)
    .attr("class", "fur");
}
const paw = svg.append("path")
  .attr("d", lineFunction(pawData))
  .attr("stroke", "black")
  .attr("stroke-width", 2)
  .attr("class", "fur");
const follow = coords => {
  points.push(coords)
  console.log(coords)
  const x = 360;
  const y = 220;
  const rad = Math.atan2(coords[0] - x, coords[1] - y) - Math.PI / 2;
  const pupil = svg.selectAll(".pupil");
  pupil.attr("cx", d => 360 + (Math.cos(rad) * 5))
  pupil.attr("cy", d => 220 - (Math.sin(rad) * 5))
}