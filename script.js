var tiles = Math.floor(Math.random() * 1000) + 1000;

document.getElementById("tiles-val").innerHTML = tiles;

var values = [];

while (values.length < 4) {
  let x = Math.floor(Math.random() * 50) + 2;
  if (values.includes(x)) continue;
  else values.push(x);
}

values.sort(function (a, b) {
  return a - b;
});
// tiles = 30;
// values = [1, 2, 3];
var target_pos = [0];

var flag = 0;

console.log(values);

for (var i = 1; i <= tiles; i++) {
  flag = 0;
  for (var j = 0; j < values.length; j++) {
    if (values[j] > i) break;
    if (target_pos.includes(i - values[j])) {
      flag = 1;
      break;
    }
  }
  if (!flag) target_pos.push(i);
}
console.log(target_pos);

values.forEach((element, i) => {
  document.getElementById(`val-${i}`).innerHTML = values[i];
});

var turn = 1;
var elem = document.getElementById(`alert-p${turn}`);
document.getElementById(`input-p${turn}`).focus();
// elem.style.visibility = "visible";
elem.classList.add("alert-success");
elem.classList.remove("alert-danger");
elem.innerHTML = "YOUR TURN";
elem.classList.remove("invisible");

document.getElementById(`input-p-1`).setAttribute("readonly", "true");

var callback = (event) => {
  event.preventDefault();
  if (document.activeElement.id != `input-p${turn}`) return;

  let val = document.getElementById(`input-p${turn}`).value;

  // console.log(val);
  val *= 1;
  if (tiles < val || !values.includes(val)) {
    document.getElementById(`input-p${turn}`).value = "";
    elem.classList.remove("alert-success");
    elem.classList.add("alert-danger");
    elem.innerHTML = "INVALID";
    elem.classList.remove("invisible");
  } else {
    document.getElementById(`input-p${turn}`).value = "";
    document.getElementById(`input-p${turn}`).setAttribute("readonly", "true");
    elem.classList.add("invisible");
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
      alert("you won the game");
      location.reload();
    }
  }
};

document.getElementById(`form-p1`).addEventListener("submit", callback);
document.getElementById(`form-p-1`).addEventListener("submit", callback);

// window.onbeforeunload = function (event) {
//   console.log("xxxxxx");
//   return confirm("Confirm refresh");
// };

var hint = (event) => {
  if (event.target.id != `hint-p${turn}`) return;
  let t = [];
  for (let i = 0; i < values.length; i++) {
    if (target_pos.includes(tiles - values[i])) {
      t.push(values[i]);
    }
  }
  console.log(t);
  let ans = 0;
  if (t.length === 0) ans = values[0];
  else ans = t[Math.floor(Math.random() * 1) + t.length - 1];
  document.getElementById(`hint-ans-p${turn}`).classList.remove("invisible");
  document.getElementById(`hint-ans-p${turn}`).innerHTML = ans;
  window.setTimeout(() => {
    console.log("done");
    document.getElementById(`hint-ans-p${turn}`).classList.add("invisible");
  }, 1000);
};

document.getElementById("hint-p1").addEventListener("click", hint);
document.getElementById("hint-p-1").addEventListener("click", hint);
