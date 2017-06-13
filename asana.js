function getMaxCoord(coords, matrix){
  let maxCoord = coords[0];
  let maxX = maxCoord[0];
  let maxY = maxCoord[1];
  let maxValue = matrix[maxX][maxY];

  coords.forEach(function(coord){
    let x = coord[0];
    let y = coord[1];
    if(matrix[x] && matrix[x][y] > maxValue){
      maxCoord = coord;
      maxValue = matrix[x][y];
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
    let maxCoord = getMaxCoord([[x1,y1], [x1,y2], [x2,y1], [x2,y2]],matrix);
    x = maxCoord[0];
    y = maxCoord[1];
  }
  // If only the number of rows are even, select the row that gives the bigger value
  else if(matrix.length % 2 === 0){
    let maxCoord = getMaxCoord([[x1,y], [x2,y]],matrix);
    x = maxCoord[0];
    y = maxCoord[1];
  }
  // If only the number of columns are even, select the column that gives the bigger value
  else if(matrix[0].length % 2 === 0){
    let maxCoord = getMaxCoord([[x,y1], [x,y2]],matrix);
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
  let x = pos[0];
  let y = pos[1];

  // We set the current position in matrix to 0, to represent the fact that the rabbit eats all carrots in a given
  // grid
  matrix[x][y] = 0;

  // We see whether if any of the top, bottom, left, right neighboring grids has any carrots. If it does, we use
  // our maxCoordinate function to get the coordinate with the highest carrot number in it. If not, return null
  if(matrix[x+1] && matrix[x+1][y] > 0 ||
     matrix[x-1] && matrix[x-1][y] > 0 ||
     matrix[x][y+1] > 0 ||
     matrix[x][y-1] > 0){
    return getMaxCoord([[x+1,y], [x-1, y], [x, y+1], [x, y-1]], matrix);
  } else {
    return null;
  }
}

let matrix = [
  [1,3,0,9,5,4],
  [5,0,10,1,8,3],
  [0,0,7,3,0,14],
  [2,1,5,10,1,0],
  [0,0,13,14,5,0]
];

console.log(rabbitNav(matrix));
