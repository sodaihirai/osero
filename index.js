window.onload = function() {
  const black = "●"
  const white = "◯"
  const squ = 8
  let order = 0

  let table_elements = document.getElementsByTagName("td");
  let table_matrix = to_matrix(table_elements);
  for (let i = 0; i < table_elements.length; i++) {
    let grid = to_cordinate(i);
    table_elements[i].addEventListener("click", function(){
      let stone_color = check_color(order);
      if (horizontal_check(grid, table_matrix, stone_color)) {
        putstone(grid, table_matrix, stone_color);
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

  function to_matrix(elements) {
    const array = Array.from(elements);
    let ret = [];
    for(let i = 0; i < squ; i++) {
      ret.push(array.slice(i*squ, i*squ+squ) );
    };
    return ret
  }

  function to_cordinate(i) {
    const y = Math.floor(i/8);
    const x = i % 8;
    return { 'x': x, 'y': y }
  }

  function check_color(order) {
    if(order % 2 === 0) {
      return black;
    } else {
      return white;
    };
  }

  function before_check_for_put(grid, matrix, stone_color) {
    if(vertical_check(grid, matrix, stone_color) && horizontal_check(grid, matrix, stone_color) && diagonal_check(grid, matrix, stone_color)) {
      true
    } else {
      false
    };
  }

  function vertical_check(grid, matrix){
    const x = grid.x
    const y = grid.y


  }

  function horizontal_check(grid, matrix, stone_color){
    const x = grid.x
    const y = grid.y

    let same_row = matrix[y]

    if (stone_color === black) {
      if (check_next_up_white_stone(x, same_row) || check_next_down_white_stone(x, same_row)) {
        if (up_check(same_row, x, stone_color) || down_check(same_row, x, stone_color)) {
          return true;
        } else {
          return false;
        };
      } else {
        return false;
      };
    } else if(stone_color === white) {
      if (check_next_up_black_stone(x, same_row) || check_next_down_black_stone(x, same_row)) {
        if (up_check(same_row, x, stone_color) || down_check(same_row, x, stone_color)) {
          return true;
        } else {
          return false;
        };
      } else {
        return false;
      };
    };
  }

  function diagonal_check(grid, matrix){
  }

  function up_check(row, x, stone_color) {
    if(x < 6) {
      for(let i = x+2; i < 8; i++) {
        if(stone_color === black) {
          if(row[i] === black) {
            break;
          } else if(row[i] === white && i !== 7){
            continue;
          };
        } else if(stone_color === white) {
          if(row[i] === white) {
            break;
          } else if(row[i] === black && i !== 0){
            continue;
          };
        };
      };
      return true;
    } else {
      return false;
    };
  }

  function down_check(row, x, stone_color) {
    if(x > 1) {
      for(let i = x-2; i > -1; i--) {
        if(stone_color === black) {
          if(row[i] === black) {
            break;
          } else if(row[i] === white){
            continue;
          };
        } else if(stone_color === white) {
          if(row[i] === white) {
            break;
          } else if(row[i] === black){
            continue;
          };
        };
      };
      return true;
    } else {
      return false;
    };
  }

  function check_next_up_white_stone(x, row) {
    if(x !== 7) {
      return row[x+1].innerHTML === white;
    } else {
      return false;
    };
  }

  function check_next_down_white_stone(x, row) {
    if(x !== 0){
      return row[x-1].innerHTML === white;
    } else {
      return false;
    };
  }

  function check_next_up_black_stone(x, row) {
    if(x !== 7) {
      return row[x+1].innerHTML === black;
    } else {
      return false;
    };
  }

  function check_next_down_black_stone(x, row) {
    if(x !== 0){
      return row[x-1].innerHTML === black;
    } else {
      return false;
    };
  }

};
