// variables
var tiles = Math.floor(Math.random() * 1000) + 1000; // total tiles left
var hint_left = [5, 5];
document.getElementById("tiles-val").innerHTML = tiles;

var values = []; // allowed withdrawls

while (values.length < 4) {
  let x = Math.floor(Math.random() * 50) + 2;
  if (values.includes(x)) continue;
  else values.push(x);
}

values.sort(function (a, b) {
  return a - b;
});

var target_pos = [0]; // loosing position for opponent if they get on these position

// setting loosing position
for (var i = 1; i <= tiles; i++) {
  let flag = 0;
  for (var j = 0; j < values.length; j++) {
    if (values[j] > i) break;
    if (target_pos.includes(i - values[j])) {
      flag = 1;
      break;
    }
  }
  if (!flag) target_pos.push(i);
}

values.forEach((element, i) => {
  document.getElementById(`val-${i}`).innerHTML = values[i];
});

var turn = 1; // current player turn

// if turn = 1        --- player 1 turn
// if turn = -1       --- player 2 turn

// preparing for player 1 turn
var elem = document.getElementById(`alert-p${turn}`);
document.getElementById(`input-p${turn}`).focus();
elem.classList.add("alert-success");
elem.classList.remove("alert-danger");
elem.innerHTML = "YOUR TURN";
elem.classList.remove("invisible");

//  this will make other player input dissable
document.getElementById(`input-p-1`).setAttribute("readonly", "true");

var callback = (event) => {
  event.preventDefault();
  console.log(document.activeElement.id);
  if (
    document.activeElement.id == `input-p${turn}` ||
    document.activeElement.id == `button-p${turn}`
  ) {
    let val = document.getElementById(`input-p${turn}`).value;

    val *= 1;
    if (tiles < val || !values.includes(val)) {
      document.getElementById(`input-p${turn}`).value = "";
      // display invalid warning on invalid or empty move
      elem.classList.remove("alert-success");
      elem.classList.add("alert-danger");
      elem.innerHTML = "INVALID";
      elem.classList.remove("invisible");
    } else {
      // if move accepted
      // removing current player values
      document.getElementById(`input-p${turn}`).value = "";
      document
        .getElementById(`input-p${turn}`)
        .setAttribute("readonly", "true");
      elem.classList.add("invisible");
      // changing player
      turn *= -1;
      document.getElementById(`input-p${turn}`).removeAttribute("readonly");
      elem = document.getElementById(`alert-p${turn}`);
      document.getElementById(`input-p${turn}`).focus();
      elem.classList.add("alert-success");
      elem.classList.remove("alert-danger");
      elem.innerHTML = "your turn";
      elem.classList.remove("invisible");
      tiles -= val;
      document.getElementById("tiles-val").innerHTML = tiles;
      if (tiles < values[0]) {
        alert(` ${turn === 1 ? "PLAYER 2" : "PLAYER 1"} WON THE GAME `);
        location.reload();
      }
    }
  }
};

document.getElementById(`form-p1`).addEventListener("submit", callback);
document.getElementById(`form-p-1`).addEventListener("submit", callback);
document.getElementById(`button-p1`).addEventListener("click", callback);
document.getElementById(`button-p-1`).addEventListener("click", callback);
// give warning on reload/ refresh if any change accured
window.onbeforeunload = function (event) {
  return confirm("Confirm refresh");
};

// hint callback
var hint = (event) => {
  if (event.target.id != `hint-p${turn}`) return;
  let x = 0;
  turn === 1 ? (x = 0) : (x = 1);
  if (hint_left[x] <= 0) {
    document.getElementById(`hint-ans-p${turn}`).classList.remove("invisible");
    document.getElementById(`hint-ans-p${turn}`).classList.add("color-red");
    document.getElementById(`hint-ans-p${turn}`).innerHTML = "X";
    window.setTimeout(() => {
      document
        .getElementById(`hint-ans-p${turn}`)
        .classList.remove("color-red");
      console.log("done");
      document.getElementById(`hint-ans-p${turn}`).classList.add("invisible");
    }, 1000);
    return;
  }

  let t = [];
  for (let i = 0; i < values.length; i++) {
    if (target_pos.includes(tiles - values[i])) {
      t.push(values[i]);
    }
  }
  let ans = 0;
  if (t.length === 0) ans = values[0];
  else ans = t[Math.floor(Math.random() * 1) + t.length - 1];
  document.getElementById(`hint-ans-p${turn}`).classList.remove("invisible");
  document.getElementById(`hint-ans-p${turn}`).innerHTML = ans;
  window.setTimeout(() => {
    console.log("done");
    document.getElementById(`hint-ans-p${turn}`).classList.add("invisible");
  }, 1000);
  hint_left[x]--;
  document.getElementById(
    `hint-left-p${turn}`
  ).innerHTML = `${hint_left[x]} left`;
};
// hint eventlistener
document.getElementById("hint-p1").addEventListener("click", hint);
document.getElementById("hint-p-1").addEventListener("click", hint);
