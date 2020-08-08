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
    
    
    
    for (let i = 0; i < width*width; i++) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);
    }
  }

  // add number

  for (let i = 0; i < squares.length; i++) {
    let total = 0;
    const isLeftEgde = (i % width === 0); // no sq  to the left
    const isRightEgde = (i % width === width -1); // no sq to the rigth

    
  }
createBoard();
});