window.onload = function() {
  const black = "●"
  const white = "◯"
  const squ = 8
  let turn_check_count = 0
  let order = 0


  let table_elements = document.getElementsByTagName("td");
  let table_matrix = to_matrix(table_elements);
  for (let i = 0; i < table_elements.length; i++) {
    let grid = to_cordinate(i);
    table_elements[i].addEventListener("click", function(){
      let stone_color = check_color(order);
      before_check_for_put(grid, table_matrix, stone_color);
      if (turn_check_count > 0) {
        putstone(grid, table_matrix, stone_color);
        turn_check_count = 0;
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
    vertical_check(grid, matrix, stone_color);
    horizontal_check(grid, matrix, stone_color);
    diagonal_check(grid, matrix, stone_color);
  }

  function vertical_check(grid, matrix, stone_color){
    const x = grid.x
    const y = grid.y

    let new_matrix = transpose(matrix)
    let same_column = new_matrix[x]

    up_check(same_column, y, stone_color);
    down_check(same_column, y, stone_color);
  }

  function horizontal_check(grid, matrix, stone_color){
    const x = grid.x
    const y = grid.y

    let same_row = matrix[y]

    up_check(same_row, x, stone_color);
    down_check(same_row, x, stone_color);
  }

  function diagonal_check(grid, matrix, stone_color){
    up_left_check(grid, matrix, stone_color);
    up_right_check(grid, matrix, stone_color);
    down_left_check(grid, matrix, stone_color);
    down_right_check(grid, matrix, stone_color);
  }

  function up_left_check(grid, matrix, stone_color){
    const x = grid.x
    const y = grid.y 

    let first_same_color = false;
    let out_of_board = false;
    let empty_grid = false;
    let global_order = 1;

    for(let i = x-1, n = y-1, order = 1; i >= -1 && n >= -1; i--, n--, order++) {
      if (i === -1 || n === -1) {
        out_of_board = true;
        break;
      } else {
        if(stone_color === black) {
          if(matrix[n][i].innerHTML === black) {
            if(order === 1) {
              first_same_color = true;
              break;
            } else {
              break;
            }
          } else if(matrix[n][i].innerHTML === white) {
            global_order++;
            continue;
          } else {
            empty_grid = true;
            break;
          };
        } else if(stone_color === white) {
          if(matrix[n][i].innerHTML === white) {
            if(order === 1) {
              first_same_color = true;
              break;
            } else {
              break;
            }
          } else if(matrix[n][i].innerHTML === black) {
            global_order++;
            continue;
          } else {
            empty_grid = true;
            break;
          };
        }
      }
    };
    if (!first_same_color && !out_of_board && !empty_grid) {
      for(let i = 1; i <= global_order; i++) {
        if(stone_color === black) {
          matrix[y - i][x - i].innerHTML = black; 
        } else {
          matrix[y - i][x - i].innerHTML = white;
        };
      };
      turn_check_count++;
    };
  }

  function up_right_check(grid, matrix, stone_color){
    const x = grid.x
    const y = grid.y 

    let first_same_color = false;
    let out_of_board = false;
    let empty_grid = false;
    let global_order = 0;

    for(let i = x+1, n = y-1, order = 1; i <= 8 && n >= -1; i++, n--, order++) {
      if(i === 8 || n === -1) {
        out_of_board = true;
        break;
      } else {
        if(stone_color === black) {
          if(matrix[n][i].innerHTML === black) {
            if(order === 1) {
              first_same_color = true;
              break;
            } else {
              break;
            }
          } else if(matrix[n][i].innerHTML === white) {
            global_order++;
            continue;
          } else {
            empty_grid = true;
            break;
          };
        } else if(stone_color === white) {
          if(matrix[n][i].innerHTML === white) {
            if(order === 1) {
              first_same_color = true;
              break;
            } else {
              break;
            }
          } else if(matrix[n][i].innerHTML === black) {
            global_order++;
            continue;
          } else {
            empty_grid = true;
            break;
          };
        }
      };
      }
    if (!first_same_color && !out_of_board && !empty_grid) {
      for(let i = 1; i <= global_order; i++) {
        if(stone_color === black) {
          matrix[y - i][x + i].innerHTML = black; 
        } else {
          matrix[y - i][x + i].innerHTML = white;
        };
      };
      turn_check_count++;
    };
  }

  function down_left_check(grid, matrix, stone_color){
    const x = grid.x
    const y = grid.y 

    let first_same_color = false;
    let out_of_board = false;
    let empty_grid = false;
    let global_order = 0;

    for(let i = x-1, n = y+1, order = 1; i >= -1 && n <= 8; i--, n++, order++) {
      if (i === -1 || n === 8) {
        out_of_board = true;
        break;
      } else {
        if(stone_color === black) {
          if(matrix[n][i].innerHTML === black) {
            if(order === 1) {
              first_same_color = true;
              break;
            } else {
              break;
            }
          } else if(matrix[n][i].innerHTML === white) {
            global_order++;
            continue;
          } else {
            empty_grid = true;
            break;
          };
        } else if(stone_color === white) {
          if(matrix[n][i].innerHTML === white) {
            if(order === 1) {
              first_same_color = true;
              break;
            } else {
              break;
            }
          } else if(matrix[n][i].innerHTML === black) {
            global_order++;
            continue;
          } else {
            empty_grid = true;
            break;
          };
        };
      };
    };
    if (!first_same_color && !out_of_board && !empty_grid) {
      for(let i = 1; i <= global_order; i++) {
        if(stone_color === black) {
          matrix[y + i][x - i].innerHTML = black; 
        } else {
          matrix[y + i][x - i].innerHTML = white;
        };
      };
      turn_check_count++;
    };
  }

  function down_right_check(grid, matrix, stone_color){
    const x = grid.x
    const y = grid.y 

    let first_same_color = false;
    let out_of_board = false;
    let empty_grid = false;
    let global_order = 0;

    for(let i = x+1, n = y+1, order = 1; i <= 8 && n <= 8; i++, n++, order++) {
      if (i === 8 || n === 8) {
        out_of_board = true;
        break;
      } else {
        if(stone_color === black) {
          if(matrix[n][i].innerHTML === black) {
            if(order === 1) {
              first_same_color = true;
              break;
            } else {
              break;
            }
          } else if(matrix[n][i].innerHTML === white) {
            global_order++;
            continue;
          } else {
            empty_grid = true;
            break;
          };
        } else if(stone_color === white) {
          if(matrix[n][i].innerHTML === white) {
            if(order === 1) {
              first_same_color = true;
              break;
            } else {
              break;
            }
          } else if(matrix[n][i].innerHTML === black) {
            global_order++;
            continue;
          } else {
            empty_grid = true;
            break;
          };
        };
      };
    };
    if (!first_same_color && !out_of_board && !empty_grid) {
      for(let i = 1; i <= global_order; i++) {
        if(stone_color === black) {
          matrix[y + i][x + i].innerHTML = black; 
        } else {
          matrix[y + i][x + i].innerHTML = white;
        };
      };
      turn_check_count++;
    };
  }


  function up_check(row, x, stone_color) {
    let first_same_color = false;
    let empty_grid = false;
    let out_of_board = false;
    let global_order = 0;
    for(let i = x+1, order = 1; i <= 8; i++, order++) {
      if (i === 8) {
        out_of_board = true;
        break;
      } else {
        if(stone_color === black) {
          if(row[i].innerHTML === black) {
            if(order === 1) {
              first_same_color = true;
              break;
            } else {
              break;
            };
          } else if(row[i].innerHTML === white){
            global_order++;
            continue;
          } else {
            empty_grid = true;
            break;
          };
        } else if(stone_color === white) {
          if(row[i].innerHTML === white) {
            if(order === 1) {
              first_same_color = true;
              break;
            } else {
              break;
            };
          } else if(row[i].innerHTML === black){
            global_order++;
            continue;
          } else {
            empty_grid = true;
            break;
          };
        };  
      };
    };
    if (!first_same_color && !out_of_board && !empty_grid) {
      for(let i = 1; i <= global_order; i++) {
        if(stone_color === black){
          row[x + i].innerHTML = black;
        } else {
          row[x + i].innerHTML = white;
        }
      }; 
      turn_check_count++;
    };
  }

  function down_check(row, x, stone_color) {
    let first_same_color = false;
    let empty_grid = false;
    let out_of_board = false;
    let global_order = 0
    for(let i = x-1, order = 1; i >= -1; i--, order++) {
      if (i === -1) {
        out_of_board = true;
        break;
      } else {
        if(stone_color === black) {
          if(row[i].innerHTML === black) {
            if(order === 1) {
              first_same_color = true;
              break;
            } else {
              break;
            };
          } else if(row[i].innerHTML === white){
            row[i].innerHTML = white
            global_order++
            continue;
          } else {
            empty_grid = true;
            break;
          };
        } else if(stone_color === white) {
          if(row[i].innerHTML === white) {
            if(order === 1) {
              first_same_color = true;
              break;
            } else {
              break;
            };
          } else if(row[i].innerHTML === black){
            row[i].innerHTML = black;
            global_order++;
            continue;
          } else {
            empty_grid = true;
            break;
          };
        };
      };
    };
    if (!first_same_color && !out_of_board && !empty_grid) {
      for(let i = 1; i <= global_order; i++) {
        if(stone_color === black){
          row[x - i].innerHTML = black;
        } else {
          row[x - i].innerHTML = white;
        }
      };
      turn_check_count++;
    };
  }

  function transpose(a) {
    return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) { return r[c]; });
    });
  }
};
