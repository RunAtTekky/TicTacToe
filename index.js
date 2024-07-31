let grid = new Array(9);
let xTurn = true;
let gameOver = false;

function gameInit() {
  grid = new Array(9);
  xTurn = true;
  gameOver = false;
  document.querySelector("h1").innerHTML = xTurn ? "X Turn" : "O Turn";
}

gameInit();

// get all the boxes in an array
let boxes = document.querySelectorAll(".grid-container div");

for (let boxNumber = 0; boxNumber < 9; boxNumber++) {
  let item = boxes[boxNumber];
  item.onclick = () => {
    if (gameOver) return;

    if (grid[boxNumber] !== undefined) {
      console.log("Already used");
      return;
    }
    const playerMark = xTurn ? "x" : "o";
    grid[boxNumber] = playerMark;
    item.innerHTML = `<p>${playerMark}</p>`;
    console.log(`${playerMark} played his move`);

    xTurn = !xTurn;

    const winning_lines = getWinningLines();
    if (winning_lines.length != 0) {
      declareWinner(winning_lines);
      setGameOver();
      return;
    }
    if (allFull()) {
      setGameOver();
      document.querySelector("h1").innerHTML = "DRAW";
      document.querySelector(".grid-container").style.opacity = 0.6;
      console.log(`Match draw.`);
      return;
    }

    document.querySelector("h1").innerHTML = xTurn ? "X Turn" : "O Turn";
  };
}

document.querySelector("#reset").onclick = () => {
  grid = new Array(9);
  boxes.forEach((item) => {
    item.innerHTML = "";
    item.style.opacity = 1;
  });
  document.querySelector(".grid-container").style.opacity = 1;
  document.querySelector("#reset").style.backgroundColor = "#222";
  gameInit();
};

function setGameOver() {
  gameOver = true;
  console.log("GAMEOVER");
  document.querySelector("#reset").style.backgroundColor = "orange";
}

function allFull() {
  for (let i = 0; i < 9; i++) {
    if (grid[i] === undefined) return false;
  }
  return true;
}

function declareWinner(winning_lines) {
  highlightLine(winning_lines);

  const winner = !xTurn ? "X Won" : "O Won";
  console.log(`${winner}`);
  document.querySelector("h1").innerHTML = winner;
}

function highlightLine(boxes_to_highlight) {
  console.log(boxes_to_highlight);
  boxes_to_highlight.forEach((num) => {
    let box = boxes[num];
    box.style.opacity = 0.3;
  });
}

function getWinningLines() {
  let boxes_to_highlight = [];
  for (let i = 0; i < 3; i++) {
    if (
      grid[i] !== undefined &&
      grid[i] === grid[i + 3] &&
      grid[i] === grid[i + 6]
    ) {
      boxes_to_highlight.push(i);
      boxes_to_highlight.push(i + 3);
      boxes_to_highlight.push(i + 6);
    }
  }
  for (let i = 0; i <= 6; i += 3) {
    if (
      grid[i] !== undefined &&
      grid[i] === grid[i + 1] &&
      grid[i] === grid[i + 2]
    ) {
      boxes_to_highlight.push(i);
      boxes_to_highlight.push(i + 1);
      boxes_to_highlight.push(i + 2);
    }
  }
  if (grid[0] !== undefined && grid[0] === grid[4] && grid[0] === grid[8]) {
    boxes_to_highlight.push(0);
    boxes_to_highlight.push(4);
    boxes_to_highlight.push(8);
  }
  if (grid[2] !== undefined && grid[2] === grid[4] && grid[4] === grid[6]) {
    boxes_to_highlight.push(2);
    boxes_to_highlight.push(4);
    boxes_to_highlight.push(6);
  }

  return boxes_to_highlight;
}
