document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let width = 10;
  let squares = [];
  let bombAmount = 20;
  let isGameOver = false;

  // create board

  function createBoard(){
    // get shuffled game array with random bomb
    const bombArray = Array(bombAmount).fill('bomb');
    const emptyArray = Array(width*width - bombAmount).fill('valid');
    const gameArray = emptyArray.concat(bombArray);
    const shuffledArray = gameArray.sort(()=> Math.random() - 0.5);
    
    
    
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);

      // normal click

      square.addEventListener('click', function(e){
        click(square);
      });
    }
    
      // add number
    
      for (let i = 0; i < squares.length; i++) {
        let total = 0;
        const isLeftEdge = (i % width === 0); // no sq  to the left
        const isRightEdge = (i % width === width -1); // no sq to the rigth
    
        if (squares[i].classList.contains('valid')) {
          if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total++;
          if (i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total ++;
          if (i > 10 && squares[i -width].classList.contains('bomb')) total++;
          if (i > 11 && !isLeftEdge && squares[i -width].classList.contains('bomb')) total++;
          if (i < 98 && !isRightEdge && squares[i +1].classList.contains('bomb')) total++;
          if (i < 90 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')) total++;
          if (i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('bomb')) total++;
          if (i < 89 && squares[i +width].classList.contains('bomb')) total++;
          squares[i].setAttribute('data', total);
          console.log(squares[i]);
          
        }
    
        
      }
  }
createBoard();

function click(square) {
  let currentID = square.id;
  if(isGameOver) return;
  if(square.classList.contains('checked')) return;
  if (square.classList.contains('checked') || square.classList.contains('flag')) return;
  if(square.classList.contains('bomb')) {
    console.log('Game Over');
  } else {
    let total = square.getAttribute('data');
    if (total != 0) {
      square.classList.add('checked');
      square.innerHTML = total;
      console.log(total);
      
      return;
    }
    chechSquare(square, currentID)
  }
  square.classList.add('checked');
};

// check sq around for bomb

function chechSquare(square, currentID) {

  const isLeftEdge = (currentID % width === 0);
  const isRightEdge = (currentID % width === width -1);
  setTimeout(() => {
    if (currentID > 0 && !isLeftEdge) {
      const newId = squares[parseInt(currentID) -1].id;
      const newSqure = document.getElementById(newId);
      click(newSqure);
    }
    if (currentID > 9 && !isRightEdge) {
      const newId = squares[parseInt(currentID) +1 - width].id;
      const newSqure = document.getElementById(newId);
      click(newSqure);
    }
    if (currentID > 10) {
      const newId = squares[parseInt(currentID - width)].id;
      const newSqure = document.getElementById(newId);
      click(newSqure);
    }
    if (currentID > 11 && !isLeftEdge) {
      const newId = squares[parseInt(currentID) - 1 - width].id;
      const newSqure = document.getElementById(newId);
      click(newSqure);
    }
    if (currentID < 98 && !isRightEdge) {
      const newId = squares[parseInt(currentID) +1].id;
      const newSqure = document.getElementById(newId);
      click(newSqure);
    }
    if (currentID < 90 && !isLeftEdge) {
      const newId = squares[parseInt(currentID)-1 + width].id;
      const newSqure = document.getElementById(newId);
      click(newSqure);
    }
    if (currentID < 88 && !isRightEdge) {
      const newId = squares[parseInt(currentID) +1 + width].id;
      const newSqure = document.getElementById(newId);
      click(newSqure);
    }
    if (currentID < 89) {
      const newId = squares[parseInt(currentID) + width].id;
      const newSqure = document.getElementById(newId);
      click(newSqure);
    }
  }, 10);
};

});