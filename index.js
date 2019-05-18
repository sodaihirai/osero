window.onload = function() {
  const black = "●"
  const white = "◯"
  let order = 0

  let table_elements = document.getElementsByTagName("td");
  for (let i = 0; i < table_elements.length; i++) {
    table_elements[i].addEventListener("click", function(){
      putstone(i);
    })
  }

  function putstone(i) { 
    if (order % 2 == 0) {
      table_elements[i].innerHTML = black;
    } else {
      table_elements[i].innerHTML = white;
    };

    table_elements = document.getElementsByTagName("td")
    order ++;
  }
};
