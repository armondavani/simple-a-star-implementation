// export class Point {
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.neighbors = [];
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.previous = undefined;
  }

  addNeighbor(point) {
    this.neighbors.push(point);
    point.neighbors.push(this);
  }
}

let generatePoints = function(maxX, maxY) {

  // between 5 and 10 points
  let numOfPoints = Math.floor(Math.random() * 5) + 250;
  let points = [];

  // randomly creates the points.
  // created so they are not within 30px of each border of canvas
  for (let i = 0; i < numOfPoints; i++) {
    let pointX = Math.floor(Math.random() * (maxX - 60)) + 30;
    let pointY = Math.floor(Math.random() * (maxY - 60)) + 30;
    let newPoint = new Point(pointX, pointY);
    points.push(newPoint);
  }


  // creates neighbors for each point
  points.forEach((currentPoint) => {

    // determines random num of neighbors
    let numOfNeighbors = 0;
    let ranNum = Math.random();
    if (ranNum < 0.3) {
      numOfNeighbors = 2;
    } else if (ranNum > 0.9) {
      numOfNeighbors = 4;
    } else {
      numOfNeighbors = 3;
    }

    // compares this to existing num of neighbors. if it already has 4 or however many.
    // just return, dont make any new ones
    let neighborsToMake = numOfNeighbors - currentPoint.neighbors.length;
    if (neighborsToMake < 1) {
      return;
    }

    // otherwise, if theres any spaces left for newneighbors, generate neighbors.
    // be sure to check that not adding a same  neighbor that was already assigned to it before.

    while (neighborsToMake > 0) {
      let randomNeighbor = Math.floor(Math.random() * points.length);
      let newNeighbor = points[randomNeighbor];
      if (currentPoint.neighbors.includes(newNeighbor) === false && newNeighbor !== currentPoint) {
        currentPoint.neighbors.push(newNeighbor);
        neighborsToMake--;
      }
    }


  });

  return points;

}



// export default generatePoints;
// module.exports = {
//   generatePoints,
//   Point
// }
