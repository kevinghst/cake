function maxCoordinate(coords, matrix){
  let maxCoord = coords[0];
  let maxX = maxCoord[0];
  let maxY = maxCoord[1];
  let maxValue = matrix[maxX][maxY];

  coords.forEach(function(coord){
    let x = coord[0];
    let y = coord[1];
    if(matrix[x][y] > maxValue){
      maxCoord = coord;
      maxX = x;
      maxY = y;
    }
  });
  return maxCoord;
}

function rabbitNav(matrix){

  let x1, x2, y1, y2, x, y;

  // Identify potential center x-coordinate(s)
  if(matrix.length % 2 === 0){
    x1 = (matrix.length)/2;
    x2 = (matrix.length)/2 - 1;
  } else {
    x = (matrix.length - 1)/2;
  }

  // Identify potential center y-coordinate(s)
  if(matrix[0].length % 2 === 0){
    y1 = (matrix[0].length)/2;
    y2 = (matrix[0].length)/2 - 1;
  } else {
    y = (matrix[0].length - 1)/2;
  }

  // If numbers of rows and columns are both even, select the x and y values with the biggest value
  if(matrix.length % 2 === 0 && matrix[0].length % 2 === 0){
    let maxCoord = maxCoordinate([[x1,y1], [x1,y2], [x2,y1], [x2,y2]],matrix);
    x = maxCoord[0];
    y = maxCoord[1];
  }
  // If only the number of rows are even, select the row that gives the bigger value
  else if(matrix.length % 2 === 0){
    let maxCoord = maxCoordinate([[x1,y], [x2,y]],matrix);
    x = maxCoord[0];
    y = maxCoord[1];
  }
  // If only the number of columns are even, select the column that gives the bigger value
  else if(matrix[0].length % 2 === 0){
    let maxCoord = maxCoordinate([[x,y1], [x,y2]],matrix);
    x = maxCoord[0];
    y = maxCoord[1];
  }

// Once we have our starting spot [x,y], we can solve the problem.
// We initialize a new variable currentPos to the starting spot, we use a while loop to continually update the currentPos,
// after traveling to the nearby spot with the highest value in it. We always reset the value of the position which the
// rabbit just travelled to 0, since the rabbit consumed all of the carrots in his path. Meanwhile, we continually
// add the number of carrots from each travelled spot to a accumulated sum, which will be the final return value.
// The while loop ends when all of its surrounding spots are either out of bound or has a value of 0.

  let currentPos = [x,y];
  let totalCarrots = matrix[currentPos[0]][currentPos[1]];

  // We use a helper function nextGrid to return the neighboring grid with the highest carrot count. If
  // all neighboring grids are either out of bound or 0, null is returned. Resetting of current grid to 0 is performed in the
  // helper function.

  while(nextGrid(matrix, currentPos)){
    currentPos = nextGrid(matrix, currentPos);
    totalCarrots += matrix[currentPos[0]][currentPos[1]];
  }

  return totalCarrots;
}

function nextGrid(matrix, pos){
  // We initialize the variable highestValue - which represents the number of carrots in the grid with most carrots - to null.
  // As we iterate through the four grids on top, bottom, left, and right of the current grid, we update the highestValue by
  // comparing the current value against the highestValue and updating the latter. If all of the neighboring grids are 0
  // or out of bound, the highestValue will remain null by the end.

  let highestValue = null;

  let x = pos[0];
  let y = pos[1];
  let nextX = x;
  let nextY = y;

  if(matrix[x+1] && matrix[x+1][y] > highestValue){
    highestValue = matrix[x+1][y];
    nextX = x+1;
    nextY = y;
  }
  if(matrix[x][y+1] > highestValue){
    highestValue = matrix[x][y+1];
    nextX = x;
    nextY = y+1;
  }
  if(matrix[x-1] && matrix[x-1][y] > highestValue){
    highestValue = matrix[x-1][y];
    nextX = x - 1;
    nextY = y;
  }
  if(matrix[x][y-1] > highestValue){
    highestValue = matrix[x][y-1];
    nextX = x;
    nextY = y-1;
  }

  // We reset the number of carrots in current grid to 0
  matrix[x][y] = 0;

  if(highestValue){
    return [nextX, nextY];
  } else {
    return null;
  }
}

let matrix = [
  [5,7,8,6,3],
  [0,0,7,0,4],
  [4,6,3,4,9],
  [3,1,0,5,8]
];

console.log(rabbitNav(matrix));
