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
      item.style.opacity = 1;
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
  highlightLine();
  // document.querySelector('.grid-container').style.opacity = 0;
  const winner = (!xTurn) ? 'X Won' : 'O Won';
  console.log(`${winner}`);
  document.querySelector('h1').innerHTML = winner;
}

function highlightLine() {
  let boxes_to_highlight = getHighlight();
  console.log(boxes_to_highlight);
  boxes_to_highlight.forEach(num => {
    let box = boxes[num];
    box.style.opacity = 0.3;
  });
}

function getHighlight() {
  let boxes_to_highlight = [];
  for (let i=0; i<3; i++) {
    if (grid[i] !== undefined && grid[i]===grid[i+3] && grid[i]===grid[i+6]) {
      boxes_to_highlight.push(i);
      boxes_to_highlight.push(i+3);
      boxes_to_highlight.push(i+6);
    }
  }
  for (let i=0; i<=6; i+=3) {
    if (grid[i] !== undefined && grid[i]===grid[i+1] && grid[i]===grid[i+2]) {
      boxes_to_highlight.push(i);
      boxes_to_highlight.push(i+1);
      boxes_to_highlight.push(i+2);
    }
  }
  if (grid[0] !== undefined && grid[0]===grid[4] && grid[0]===grid[8]) {
    boxes_to_highlight.push(0);
    boxes_to_highlight.push(4);
    boxes_to_highlight.push(8);
  }
  if (grid[2] !== undefined && grid[2]===grid[4] && grid[4]===grid[6]) {
    boxes_to_highlight.push(2);
    boxes_to_highlight.push(4);
    boxes_to_highlight.push(6);
  }
  
  return boxes_to_highlight;
}
