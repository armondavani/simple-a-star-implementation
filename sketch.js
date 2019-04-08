/* eslint-disable max-statements */


/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
// import generatePoints, {Point} from './utils/generatePoints';
// const {generatePoints, Point} = require('./utils/generatePoints');

// helper functions
const removeFromArray = function(arr, elt) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === elt) {
      arr.splice(i, 1);
    }
  }
};



// initialize variables
let backgroundLightness = 245;
let rad = 12;
let w = 600;
let h = 400;

let points = generatePoints(w, h);

// add a start point and an end point
let startPoint = new Point(50, 50);
let endPoint = new Point(w - 50, h - 50);

// add my created start point and end point as neighbors to 2 points
// and add my start and end points to my list of points to draw and work with.
startPoint.addNeighbor(points[0]);
endPoint.addNeighbor(points[1]);
points.push(startPoint);
points.push(endPoint);

// variables i need for algorithm
let openSet = [];
let closedSet = [];
let finalPath = [];
let current;
openSet.push(startPoint);
// end of initializing variables

// ---

// setup drawing
setup = function () {
  createCanvas(w, h);
  background(backgroundLightness);
  stroke(0);
  strokeWeight(2);

  for (let i = 0; i < points.length; i++) {
    if (i > points.length - 3) {
      noStroke()
      fill(150, 150, 0);
      ellipse(points[i].x, points[i].y, rad+8, rad+8);
      noFill()
      stroke(150, 50, 150)
      ellipse(points[i].x, points[i].y, rad, rad);
      stroke(0);
    } else {
      ellipse(points[i].x, points[i].y, rad, rad);
    }
  }

  for (let i = 0; i < points.length; i++) {
    let x1 = points[i].x;
    let y1 = points[i].y;
    points[i].neighbors.forEach((neighbor) => {
      line(x1, y1, neighbor.x, neighbor.y)
    })
  }
}
// end of setup drawing

// ---

myCustomRedrawAccordingToNewPropsHandler = function (props) {
  backgroundLightness = props.x
}


draw = function () {
  if (openSet.length > 0) {
    // keep goin
    
    // make current node equal to node in open set with lowest (or best) f score
    let bestScoreIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[bestScoreIndex].f) {
        bestScoreIndex = i;
      }
    }
    current = openSet[bestScoreIndex];
    
    if (current === endPoint) {
      // we won its over woo
      noLoop();
    }
    
    removeFromArray(openSet, current);
    closedSet.push(current);
    
    current.neighbors.forEach((neighbor) => {
      if (!closedSet.includes(neighbor)) {
        let tempG = current.g + Math.hypot(neighbor.x - current.x, neighbor.y - current.y);
        
        let newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }
        
        if (newPath) {
          neighbor.h = Math.hypot(neighbor.x - endPoint.x, neighbor.y - endPoint.y);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
        
      }
      
      
      
      
    });
    
  } else {
    // no solut
  }
  
  // every pass, color in open set with green
  fill(0, 150, 0);
  openSet.forEach((item) => {
    stroke(0)
    ellipse(item.x, item.y, rad, rad);
  });
  
  // every pass, color in closed set with red
  fill(150, 0, 0);
  closedSet.forEach((item) => {
    stroke(0);
    ellipse(item.x, item.y, rad, rad);
  })
  
  for (let i = 0; i < points.length; i++) {
    stroke(0)
    let x1 = points[i].x;
    let y1 = points[i].y;
    points[i].neighbors.forEach((neighbor) => {
      line(x1, y1, neighbor.x, neighbor.y)
    })
  }
  
  
  fill(250, 0, 250)
  finalPath = [];
  let temp = current;
  finalPath.push(temp);
  while (temp.previous) {
    finalPath.push(temp.previous);
    stroke(250, 0, 250)
    line(temp.x, temp.y, temp.previous.x, temp.previous.y);
    temp = temp.previous;
  }
  
  fill(250, 0, 250);
  finalPath.forEach((item) => {
    ellipse(item.x, item.y, rad, rad);
  });
  
}




