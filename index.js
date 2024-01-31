let grid = []
let xTurn = true;
let gameOver = false;
for (let i=0; i<9; i++) {
  grid[i];
}

console.log(grid);

document.querySelector('h1').innerHTML = (xTurn) ? 'X Turn' : 'O Turn';
let boxes = document.querySelectorAll('.grid-container div');

for (let boxNumber = 0; boxNumber<9; boxNumber++) {
  let item = boxes[boxNumber];
  item.onclick = () => {
    if (gameOver) return;
    if (xTurn) {
      if (grid[boxNumber] === 'x' || grid[boxNumber] ==='o') {
        console.log('Already used');
      }
      else {
        grid[boxNumber] = 'x';
        item.innerHTML = '<p>x</p>';
        console.log('x played his move');
        xTurn = !xTurn;
      }
    } else {
      if (grid[boxNumber] === 'x' || grid[boxNumber] ==='o') {
        console.log('Already used');
      }
      else {
        grid[boxNumber] = 'o';
        item.innerHTML = '<p>o</p>';
        console.log('o played his move');
        xTurn = !xTurn;
      }
    }
    
    if (hasSomeoneWon()) {
      declareWinner();
      gameOver = true;
      return;
    }
    if (allFull()) {
      gameOver = true;
      document.querySelector('h1').innerHTML = 'DRAW';
      document.querySelector('.grid-container').style.opacity = 0;
      console.log(`Match draw.`);
      gameOver = true;
      return;
    }
    document.querySelector('h1').innerHTML = (xTurn) ? 'X Turn' : 'O Turn';
    
  }
  document.querySelector('#reset').onclick = () => {
    grid = [];
    boxes.forEach(item => {
      item.innerHTML = '';
    })
    document.querySelector('.grid-container').style.opacity = 1;
    xTurn = true;
    gameOver = false;
    document.querySelector('h1').innerHTML = (xTurn) ? 'X Turn' : 'O Turn';
    console.log('hehe you pressed me');
  }
}

function allFull() {
  for (let i=0; i<9; i++) {
    if (grid[i] === undefined) return false;
  }
  return true;
}
function hasSomeoneWon() {
  for (let i=0; i<3; i++) {
    if (grid[i] !== undefined && grid[i]===grid[i+3] && grid[i]===grid[i+6]) {
      return true;
    }
  }
  for (let i=0; i<=6; i+=3) {
    if (grid[i] !== undefined && grid[i]===grid[i+1] && grid[i]===grid[i+2]) {
      return true;
    }
  }
  if (grid[0] !== undefined && grid[0]===grid[4] && grid[0]===grid[8]) {return true;}
  if (grid[2] !== undefined && grid[2]===grid[4] && grid[4]===grid[6]) {return true;}
  return false;
}
function declareWinner() {
  document.querySelector('.grid-container').style.opacity = 0;
  const winner = (!xTurn) ? 'X Won' : 'O Won';
  console.log(`${winner}`);
  document.querySelector('h1').innerHTML = winner;
}

