document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let width = 10;
  let squares = [];
  let bombAmount = 20;

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
          squares[i].setAttribute('data', total);
          console.log(squares[i]);
          
        }
    
        
      }
  }
createBoard();

function click(square) {
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
  }
};

});