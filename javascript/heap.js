{
  /* 
   1) player can only move up or left
   2) player cannot cross obstacle (denoted by white coler)
   3) both players will play alternatively
   4) 2 bombs will be given to each player to break the obstacle
   5) player who cannot move will loose the game
   6) current position will be denoted by 'x'
  */

  /* -------------    VARIABLES     ----------------- */

  let table = document.getElementById("table-grid");
  let alert = document.getElementById("alert");
  let turn = 1;
  let bombUsed = false;
  let r = 10,
    c = 10; // total rows and columns in grid
  let prev = [r - 1, c - 1]; // previous obstacle position
  let arrCol = [],
    arrRow = []; // store obstacles position
  let bombs = [2, 2]; // STORE AVAILABLE BOMB VALUES  ---bombs[0] - player 1 bomb ----bombs[1] - player 2 bombs

  r = Math.floor(Math.random() * 15) + 5; // choose value of row and column
  c = Math.floor(Math.random() * 15) + 5;
  prev = [r - 1, c - 1];

  /* ------------- IIFEs ----------------- */

  // IIFE to create grid
  (() => {
    let col = '<td class="{$class$}"></td>'; // column html to be inserted in table
    let row = '<tr id="{$id$}">{$td$}</tr>'; // row html to be inserted in table
    let colString = ""; //store column string
    let rowString = ""; // store row string
    // creating column string
    for (var i = 0; i < c; i++) {
      let s = col.replace("{$class$}", i);
      colString += s;
    }
    // creating row string
    for (var i = 0; i < r; i++) {
      let s = row.replace("{$id$}", i);
      s = s.replace("{$td$}", colString);
      rowString += s;
    }
    // inserting row in table HTML
    table.innerHTML = rowString;
  })();

  // function to remove previous position
  var removePrev = () => {
    document.getElementById(prev[0]).childNodes[prev[1]].innerHTML = "";
  };

  // IIFE creating obstacles in grid
  (() => {
    document.getElementById(prev[0]).childNodes[prev[1]].innerHTML = "X";

    for (let i = 0; i < r; i++) arrRow[i] = [];
    for (let i = 0; i < c; i++) arrCol[i] = [];

    let arr = [];
    arr[0] = [0];
    arr[r - 1] = [c - 1];
    for (var i = 0; i < r + c; i++) {
      // selecting randow row and column within the range
      let row = Math.floor(Math.random() * r);
      let col = Math.floor(Math.random() * c);
      if (arr[row]) {
        // checking if that position already has a obstacle
        if (arr[row].includes(col)) i--;
        else {
          // if no obstacle put there obstacle and change its background color to white
          arrRow[row].push(col);
          arrCol[col].push(row);
          arr[row].push(col);
          document.getElementById(row).childNodes[col].style.backgroundColor =
            "white";
        }
      } else {
        // if no column has obstacle in that row create an array and store the value of column for that row
        arrRow[row].push(col);
        arrCol[col].push(row);
        arr[row] = [col];
        document.getElementById(row).childNodes[col].style.backgroundColor =
          "white";
      }
    }
  })();

  /* ------------------  INITILIZIATION ----------------------------- */

  // DISSABLE PLAYER 2 BUTTON
  document.getElementById(`button-p-1`).setAttribute("disabled", "disabled");

  /* -------------------------   FUNCTIONS    ---------------------------- */

  // REMOVE OBSTACLE IT USES BOMB
  let removeObstacle = (event) => {
    let flag = 0;
    let row = event.target.parentNode.id * 1, // current row value
      col = event.target.classList[0] * 1; // current column value

    // CHECK IF THERE IS AN OBSTACLE AT THE SELECTED POSITION
    if (arrRow[row].includes(col)) {
      // console.log("ind", arrRow[row].indexOf(col));
      arrRow[row].splice(arrRow[row].indexOf(col), 1);
      arrCol[col].splice(arrCol[col].indexOf(row), 1);
      // console.log(arrRow);
      event.target.style.backgroundColor = "#7d7d7d";
      flag = 1;
    }
    return flag;
  };

  // CHANGE THE TURN AND CHANGE HTML TEXT ACCORDINGLY
  let changeTurn = () => {
    document
      .getElementById(`button-p${turn}`)
      .setAttribute("disabled", "disabled");
    turn *= -1; // CHANGE TURN
    document.getElementById(`button-p${turn}`).removeAttribute("disabled");
    printAlert("", "success", `PLAYER ${turn === 1 ? 1 : 2} TURN`);
  };

  // FUNCTION TO CHECK IF THE CURRENT PLAYER LOOSE
  let isLost = () => {
    let bomb;
    turn === 1 ? (bomb = bombs[0]) : (bomb = bombs[1]);
    // console.log(prev);
    // console.log(prev[0] === 0 || arrRow[prev[0] - 1].includes(prev[1]));
    // console.log(prev[1] === 0 || arrCol[prev[1] - 1].includes(prev[0]));
    // console.log(!bomb);

    if (
      (prev[0] === 0 || arrRow[prev[0] - 1].includes(prev[1])) && // CHECK IF THE CURRENT ROW IS THE LAST ROW OR 1 POSITION UP IS NOT THE OBSTACLE
      (prev[1] === 0 || arrCol[prev[1] - 1].includes(prev[0])) && // CHECK IF THE CURRENT COLUMN IS THE LAST COLUMN OR 1 POSITION LEFT IS NOT THE OBSTACLE
      !bomb // CHECK IF NO BOMB LEFT TO BREAK THE OBSTACLE
    )
      return true;
    return false;
  };

  // CHECK IF THE CURRENT POSITION IF TOP-LEFT [0,0]
  let isWinning = () => {
    if (!prev[0] && !prev[1]) {
      printAlert("", "success", `PLAYER ${turn === 1 ? 1 : 2} won`);
    }
    return !prev[0] && !prev[1]; // WE ALREADY SET VALUE OF PREV TO CURRENT VALUES AND THEN CALL THIS FUNCTION
  };

  // CHANGES THE STYLE AND INNER HTML OF THE ALERT BOX
  let printAlert = (message, type, player) => {
    if (type === "alert") {
      window.setTimeout(() => {
        alert.classList.add("alert-success");
        alert.classList.remove("alert-danger");
        alert.innerHTML = player;
      }, 1500);
      alert.classList.remove("alert-success");
      alert.classList.add("alert-danger");
      alert.innerHTML = message;
    } else {
      window.setTimeout(() => {
        alert.innerHTML = message || player;
      }, 100);
    }
  };

  // CALLBACK OF USE BOMB
  let useBomb = (event) => {
    let bomb;
    turn === 1 ? (bomb = bombs[0]) : (bomb = bombs[1]);

    if (!bomb) {
      printAlert("NO BOMBS LEFT", "alert", `PLAYER ${turn === 1 ? 1 : 2} TURN`);
      return;
    }
    // WITH THE HELP OF bombUsed VARIABLE WE CAN THE OTHER EVENTLISTENER IN (CALLED WHEN CLICK IN GRID) TO ACT
    bombUsed = true;
    table.addEventListener("click", (e) => {
      bombUsed = false; // SET SO THAT THE OTHER EVENT LISTENER CAN ACT
      if (removeObstacle(e)) {
        turn === 1 ? (bomb = bombs[0]) : (bomb = bombs[1]);
        bomb--;
        console.log("bomb --", bomb);
        turn === 1 ? bombs[0]-- : bombs[1]--;
        document.getElementById(
          `bomb-p${turn}`
        ).innerHTML = `${bomb} BOMBS LEFT`;
        if (isLost()) {
          printAlert(
            "",
            "success",
            `PLAYER ${turn === 1 ? 2 : 1} WON THE GAME`
          );
          if (
            confirm(
              `PLAYER ${turn === 1 ? 2 : 1} WON THE GAME\nwant to play again?`
            )
          ) {
            location.reload();
          }
        }
      } else {
        bombUsed = false;
        return;
      }
    });
  };

  /* ---------------- EVENT LISTENERS ---------------------- */

  table.addEventListener("click", (event) => {
    if (bombUsed) return; // THIS MEANS THIS FUNCTION IS CALLED IN CALLBACK OF BUTTON (USE BOMB)
    bombUsed = false;

    let row = event.target.parentNode.id * 1, // current row value
      col = event.target.classList[0] * 1; // current column value
    let flag = 0;
    if (!event.target.classList[0]) return; // return if no column is selected in row like when they click on broder in table

    if (
      (row != prev[0] && col != prev[1]) || // if clicked on position which is not on same column or same row as player can only move right or up
      row > prev[0] || // prevent backword move
      col > prev[1] || // prevent backword move
      (row === prev[0] && col === prev[1]) // if clicked on previous position
    ) {
      printAlert("INVALID", "alert", `PLAYER ${turn === 1 ? 1 : 2} TURN`);
      // alert.innerHTML = "INVALID";
      console.log("INVALID");
      return;
    }
    // if row is same check if there is an obstacle and change value of flag to 1
    if (row === prev[0]) {
      // console.log(1, arrRow[row], col, prev[1]);
      arrRow[row].forEach((el) => {
        if (el >= col && el < prev[1]) flag = 1;
      });
    }
    // if col is same check if there is an obstacle and change value of flag to 1
    if (col === prev[1]) {
      // console.log(2, arrCol[col], row, prev[0]);
      arrCol[col].forEach((el) => {
        if (el >= row && el < prev[0]) flag = 1;
      });
    }
    // if flag return invalid
    if (flag) {
      printAlert("INVALID", "alert", `PLAYER ${turn === 1 ? 1 : 2} TURN`);
      alert.innerHTML = "INVALID";
      // console.log("INVALID");
      return;
    }
    removePrev(); // remove X from previous position
    event.target.innerHTML = "X"; // put X on current position
    prev = [event.target.parentNode.id * 1, event.target.classList[0] * 1]; // change previous position
    isWinning();
    // WHEN YOU REACH TOP-RIGHT POINT
    if (isWinning()) {
      if (
        confirm(
          `PLAYER ${turn === 1 ? 1 : 2} WON THE GAME\nwant to play again?`
        )
      )
        location.reload();
    } else changeTurn();

    // WHEN YOU CANNOT MOVE UP OR LEFT
    // OTHER PLAYER WILL WIN IN THIS SITUATION
    if (isLost()) {
      printAlert("", "success", `PLAYER ${turn === 1 ? 2 : 1} WON THE GAME`);
      if (
        confirm(
          `PLAYER ${turn === 1 ? 2 : 1} WON THE GAME\nwant to play again?`
        )
      ) {
        location.reload();
      }
    }
  });

  document.getElementById(`button-p1`).addEventListener("click", useBomb);
  document.getElementById(`button-p-1`).addEventListener("click", useBomb);

  // refresh warning
  window.onbeforeunload = function (event) {
    return confirm("Confirm refresh");
  };
}
