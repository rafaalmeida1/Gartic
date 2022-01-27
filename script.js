document.addEventListener("DOMContentLoaded", () => {
  const screen = document.querySelector("#screen");
  const ctx = screen.getContext("2d");
  let lineAtual = 1;

  screen.width = 1000;
  screen.height = 700;

  ctx.lineWidth = 1;
  ctx.strokeStyle = "red";

  const pincel = {
    active: false,
    movement: false,
    pos: { x: 0, y: 0 },
    posBack: null,
  };
  const drawLine = (line) => {
    ctx.beginPath();
    ctx.moveTo(line.posBack.x, line.posBack.y);
    ctx.lineTo(line.pos.x, line.pos.y);
    ctx.stroke();
  };

  screen.onmousedown = (event) => (pincel.active = true);
  screen.onmouseup = (even) => (pincel.active = false);

  screen.onmousemove = (event) => {
    pincel.pos.x = event.clientX;
    pincel.pos.y = event.clientY;
    pincel.movement = true;
  };

  const cicle = () => {
    if (pincel.active && pincel.movement && pincel.posBack) {
      drawLine({ pos: pincel.pos, posBack: pincel.posBack });
      pincel.movement = false;
    }
    pincel.posBack = { x: pincel.pos.x, y: pincel.pos.y };

    setTimeout(cicle, 1);
  };

  cicle();

  document.getElementById("colors").addEventListener("click", (event) => {
    let color = event.target.style.backgroundColor;
    let colors = document.getElementById("colors");
    let btn = document.getElementById("btn-colors");
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    colors.style.display = "none";
    btn.style.display = "inline-block";
    if (color !== "white") {
      ctx.lineWidth = lineAtual;
    }
  });

  document.getElementById("btn-clear").addEventListener("click", () => {
    ctx.clearRect(0, 0, screen.width, screen.height);
  });

  document.getElementById("btn-eraser").addEventListener("click", () => {
    let color = "white";
    let colors = document.getElementById("colors");
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    colors.style.display = "none";
  });

  document.getElementById("lineWidth").addEventListener("input", () => {
    lineAtual = document.getElementById("lineWidth").value;
    ctx.lineWidth = lineAtual;
  });
});
