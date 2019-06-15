window.onload = function() {
  const black = "●"
  const white = "◯"
  const squ = 8
  let turnCheckCount = 0
  let order = 0


  let tableElements = document.getElementsByTagName("td");
  let tableMatrix = toMatrix(tableElements);
  for (let i = 0; i < tableElements.length; i++) {
    let grid = toCordinate(i);
    tableElements[i].addEventListener("click", function(){
      let stoneColor = checkColor(order);
      beforeCheckForPut(grid, tableMatrix, stoneColor);
      if (turnCheckCount > 0 && stoneCheck(grid, tableMatrix)) {
        putstone(grid, tableMatrix, stoneColor);
        turnCheckCount = 0;
      } else {
        console.log('eroor');
      };
    })
  }

  function putstone(grid, matrix, color) {
    const x = grid.x
    const y = grid.y

    matrix[y][x].innerHTML = color;
    order++;
  }

  function toMatrix(elements) {
    const array = Array.from(elements);
    let ret = [];
    for(let i = 0; i < squ; i++) {
      ret.push(array.slice(i*squ, i*squ+squ) );
    };
    return ret
  }

  function toCordinate(i) {
    const y = Math.floor(i/8);
    const x = i % 8;
    return { 'x': x, 'y': y }
  }

  function checkColor(order) {
    if(order % 2 === 0) {
      return black;
    } else {
      return white;
    };
  }

  function beforeCheckForPut(grid, matrix, stoneColor) {
    verticalCheck(grid, matrix, stoneColor);
    horizontalCheck(grid, matrix, stoneColor);
    diagonalCheck(grid, matrix, stoneColor);
  }

  function verticalCheck(grid, matrix, stoneColor){
    const x = grid.x
    const y = grid.y

    let newMatrix = transpose(matrix)
    let sameColumn = newMatrix[x]

    upCheck(sameColumn, y, stoneColor);
    downCheck(sameColumn, y, stoneColor);
  }

  function stoneCheck(grid, matrix){
    const x = grid.x
    const y = grid.y

    if (matrix[y][x].innerHTML === black || white) {
      return true;
    } else {
      return false;
    }
  }

  function horizontalCheck(grid, matrix, stoneColor){
    const x = grid.x
    const y = grid.y

    let sameRow = matrix[y]

    upCheck(sameRow, x, stoneColor);
    downCheck(sameRow, x, stoneColor);
  }

  function diagonalCheck(grid, matrix, stoneColor){
    upLeftCheck(grid, matrix, stoneColor);
    upRightCheck(grid, matrix, stoneColor);
    downLeftCheck(grid, matrix, stoneColor);
    downRightCheck(grid, matrix, stoneColor);
  }

  class WhiteStone {
    isOppositeColor(square) {
      square.innerHTML === black;
    }
    isSameColor(square) {
      square.innerHTML === white;
    }
    turnStone(square) {
      square.innerHTML = white;
    }
  }

  class BlackStone {
    isOppositeColor(square) {
      square.innerHTML === white;
    }
    isSameColor(square) {
      square.innerHTML === black;
    }
    turnStone(square) {
      square.innerHTML = black;
    }
  }

  function isApprovedToTurn(firstSameColor, outOfBoard, emptyGrid) {
    return !firstSameColor && !outOfBoard && !emptyGrid
  }
  
  function getSquareByDirection(direction, row = null) {
    switch (direction) {
      case 'upLeft':
        return matrix[y-i][x-i];
      case 'upRight':
        return matrix[y-i][x+i];
      case 'downLeft':
        return matrix[y+i][x-i];
      case 'downRight':
        return matrix[y+i][x+i];
      case 'up':
        return row[x + i];
      case 'down':
        return row[x - i];
    }
  }

  function turnStone(approval, globalOrder, direction, row = null) {
    const stone = stoneColor === white ? new WhiteStone() : new BlackStone();
    if (approval) {
      for(let i = 1; i <= globalOrder; i++) {
        let square = getSquareByDirection(direction, row);
        stone.turnStone(square);
      }
      turnCheckCount++;
    }
  }

  class elementOfCheck {
    constructor() {
      this.firstSameColor = false;
      this.outOfBoard = false;
      this.emptyGrid = false;
      this.globalOrder = 1;
    }
  }

  function upLeftCheck(grid, matrix, stoneColor){
    const x = grid.x;
    const y = grid.y;

    const element = new elementOfCheck();

    const stone = stoneColor === white ? new WhiteStone() : new BlackStone();
    for(let i = x-1, n = y-1, order = 1; i >= -1 && n >= -1; i--, n--, order++) {
      if (i === -1 || n === -1) {
        element.outOfBoard = true;
        break;
      } else {
        if(stone.isSameColor(matrix[n][i])) {
          if(order === 1) {
            element.firstSameColor = true;
            break;
          } else {
            break;
          }
        } else if(stone.isOppositeColor(matrix[n][i])) {
          element.globalOrder++;
          continue;
        } else {
          element.emptyGrid = true;
          break;
        }
      }
    }
    let approvalToTurn = isApprovedToTurn(element.firstSameColor, outOfBoard, element.emptyGrid);
    turnStone(approvalToTurn, element.globalOrder, 'upLeft');
  }

  function upRightCheck(grid, matrix, stoneColor){
    const x = grid.x;
    const y = grid.y;

    const element = new elementOfCheck();

    const stone = stoneColor === white ? new WhiteStone() : new BlackStone();
    for(let i = x+1, n = y-1, order = 1; i <= 8 && n >= -1; i++, n--, order++) {
      if(i === 8 || n === -1) {
        element.outOfBoard = true;
        break;
      } else {
        if(stone.isSameColor(matrix[n][i])) {
          if(order === 1) {
            element.firstSameColor = true;
            break;
          } else {
            break;
          }
        } else if(stone.isOppositeColor(matrix[n][i])) {
          element.globalOrder++;
          continue;
        } else {
          element.emptyGrid = true;
          break;
        }
      }
    }
    let approvalToTurn = isApprovedToTurn(element.firstSameColor, element.outOfBoard, element.emptyGrid);
    turnStone(approvalToTurn, element.globalOrder, 'upRight');
  }

  function downLeftCheck(grid, matrix, stoneColor){
    const x = grid.x;
    const y = grid.y;

    const element = new elementOfCheck();

    const stone = stoneColor === white ? new WhiteStone() : new BlackStone();
    for(let i = x-1, n = y+1, order = 1; i >= -1 && n <= 8; i--, n++, order++) {
      if (i === -1 || n === 8) {
        element.outOfBoard = true;
        break;
      } else {
        if(stone.isSameColor(matrix[n][i])) {
          if(order === 1) {
            element.firstSameColor = true;
            break;
          } else {
            break;
          }
        } else if(stone.isOppositeColor(matrix[n][i])) {
          element.globalOrder++;
          continue;
        } else {
          element.emptyGrid = true;
          break;
        }
      }
    }
    let approvalToTurn = isApprovedToTurn(element.firstSameColor, element.outOfBoard, element.emptyGrid);
    turnStone(approvalToTurn, element.globalOrder, 'downLeft');
  }

  function downRightCheck(grid, matrix, stoneColor){
    const x = grid.x;
    const y = grid.y;

    const element = new elementOfCheck();

    const stone = stoneColor === white ? new WhiteStone() : new BlackStone();
    for(let i = x+1, n = y+1, order = 1; i <= 8 && n <= 8; i++, n++, order++) {
      if (i === 8 || n === 8) {
        element.outOfBoard = true;
        break;
      } else {
        if(stone.isSameColor(matrix[n][i])) {
          if(order === 1) {
            element.firstSameColor = true;
            break;
          } else {
            break;
          }
        } else if(stone.isOppositeColor(matrix[n][i])) {
          element.globalOrder++;
          continue;
        } else {
          element.emptyGrid = true;
          break;
        }
      }
    }
    let approvalToTurn = isApprovedToTurn(element.firstSameColor, element.outOfBoard, element.emptyGrid);
    turnStone(approvalToTurn, element.globalOrder, 'downRight');
  }


  function upCheck(row, x, stoneColor) {
    const element = new elementOfCheck();

    const stone = stoneColor === white ? new WhiteStone() : new BlackStone();
    for(let i = x+1, order = 1; i <= 8; i++, order++) {
      if (i === 8) {
        element.outOfBoard = true;
        break;
      } else {
        if(stone.isSameColor(row[i])) {
          if(order === 1) {
            element.firstSameColor = true;
            break;
          } else {
            break;
          };
        } else if(stone.isOppositeColor(row[i])){
          element.globalOrder++;
          continue;
        } else {
          element.emptyGrid = true;
          break;
        }
      }
    }
    let approvalToTurn = isApprovedToTurn(element.firstSameColor, element.outOfBoard, element.emptyGrid);
    turnStone(approvalToTurn, element.globalOrder, 'up', row);
  }

  function downCheck(row, x, stoneColor) {
    const element = new elementOfCheck();

    const stone = stoneColor === white ? new WhiteStone() : new BlackStone();
    for(let i = x-1, order = 1; i >= -1; i--, order++) {
      if (i === -1) {
        element.outOfBoard = true;
        break;
      } else {
        if(stone.isSameColor(row[i])) {
          if(order === 1) {
            element.firstSameColor = true;
            break;
          } else {
            break;
          }
        } else if(stone.isOppositeColor(row[i])){
          element.globalOrder++
          continue;
        } else {
          element.emptyGrid = true;
          break;
        }
      }
    }
    let approvalToTurn = isApprovedToTurn(element.firstSameColor, element.outOfBoard, element.emptyGrid);
    turnStone(approvalToTurn, element.globalOrder, 'down', row);
  }

  function transpose(a) {
    return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) { return r[c]; });
    });
  }
};
