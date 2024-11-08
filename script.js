let cells = Array.from(document.getElementsByClassName("cell"));
let current_player = "X";
let alert = document.getElementsByClassName("alertbar")[0];
let button = document.getElementsByClassName("restartBtn")[0]; // Access the first restart button
let p1 = document.getElementById("P1");
let p2 = document.getElementById("P2");

start_game();
alert.style.background = "#212121";
function start_game() {
  cells.forEach((element) => {
    element.addEventListener("click", handleClick);
  });
}

function switchplayer() {
  current_player = current_player === "X" ? "O" : "X";
  if (current_player === "X") {
    p1.style.backgroundColor = "#ff0000";
    p2.style.backgroundColor = "#212121";
  } else {
    p2.style.backgroundColor = "#ff0000";
    p1.style.backgroundColor = "#212121";
  }
}
//Naman Soni

let winning_combo = [
  [0, 1, 2], // First row
  [3, 4, 5], // Second row
  [6, 7, 8], // Third row
  [0, 3, 6], // First column
  [1, 4, 7], // Second column
  [2, 5, 8], // Third column
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Diagonal
];

button.addEventListener("click", reset);

function check_win() {
  for (let combo of winning_combo) {
    let [a, b, c] = combo;

    if (
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[b].innerHTML === cells[c].innerHTML &&
      cells[a].innerHTML !== ""
    ) {
      cells[a].style.background = "#A9A9A9";
      cells[b].style.background = "#A9A9A9";
      cells[c].style.background = "#A9A9A9";
      if (cells[a].innerHTML == "X") {
        p1.style.backgroundColor = "#14d34d";
        p2.style.backgroundColor = "#212121";
      } else {
        p1.style.backgroundColor = "#212121";
        p2.style.backgroundColor = "#14d34d";
      }
      return true; // Return true if a winning combination is found
    }
  }
  return false; // Return false if no winning combination is found
}

function check_draw() {
  let count = 0;
  cells.forEach((e) => {
    if (e.innerHTML != "") count++;
  });
  return count === 9;
}

function handleClick(event) {
  const element = event.target;
  if (element.innerHTML === "") {
    element.innerHTML = current_player;

    if (check_win()) {
      stop_game();
      alert.innerHTML = `${current_player} WON !!`;
      alert.style.background = "antiquewhite";
    } else if (check_draw()) {
      stop_game();
      alert.innerHTML = `GAME DRAW !!`;
      alert.style.background = "antiquewhite";
    } else {
      switchplayer();
    }
  }
}

function stop_game() {
  cells.forEach((e) => {
    //e.style.background = "#A9A9A9";
    e.removeEventListener("click", handleClick);
  });
}

function reset() {
  cells.forEach((e) => {
    e.innerHTML = "";
    e.style.background = "#212121";
  });
  alert.innerHTML = "";
  alert.style.background = "#212121";
  current_player = "X"; // Reset the player to 'X'
  p1.style.backgroundColor = "#ff0000";
  p2.style.backgroundColor = "#212121";
  start_game();
}
