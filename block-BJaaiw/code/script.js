const canvas = document.getElementById("canvas");
const ctx = canvas.getContext(`2d`);
canvas.width = window.innerWidth * 0.37;
canvas.height = window.innerHeight * 0.85;

//postn of ball to start
let x = canvas.width / 2;
let y = canvas.height - 30;

//radius of ball
let ballR = 20;

//add small amount to make ball move
let dx = 2;
let dy = -2;

//paddle
let paddleHeight = 30;
let paddleWidth = 145;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight;

//left and right keys for paddle
let rightPressed = false;
let leftPressed = false;

// paddles for upper rows

let row = 3;
let column = 4;
let brickWidth = 150;
let brickHeight = 35;
let brickPadding = 20;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

//score variable
let score = 0;

//lives variable
let lives = 3;

//array to draw the brick
let bricks = [];
for (i = 0; i < column; i++) {
  bricks[i] = [];
  for (j = 0; j < row; j++) {
    bricks[i][j] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keyup", keyUpHandler);
document.addEventListener("keydown", keyDownHandler);

function keyDownHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  }
}

//draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballR, 0, Math.PI * 2, true);
  ctx.fillStyle = "#BC8F8F";
  ctx.fill();
  ctx.closePath();
}

//draw paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#BC8F8F";
  ctx.fill();
  ctx.closePath();
}

//break the brick when the ball hits
function breakBricks() {
  for (i = 0; i < column; i++) {
    for (j = 0; j < row; j++) {
      let br = bricks[i][j];
      if (br.status == 1) {
        if (
          x > br.x &&
          x < br.x + brickWidth &&
          x > br.y &&
          y < br.y + brickHeight
        ) {
          dy = -dy;
          br.status = 0;
          score++;
          if (score == row * column) {
            alert(`Winner winner chicken dinner`);
            document.location.reload();
          }
        }
      }
    }
  }
}
//score function
function calcScore() {
  ctx.font = "25px Ariel";
  ctx.fillStyle = "#BC8F8F";
  ctx.fillText(`Score :` + score, 8, 25);
}

//lives function
function lifelines() {
  ctx.font = "25px Ariel";
  ctx.fillStyle = "#BC8F8F";
  ctx.fillText(`Lives :` + lives, canvas.width - 120, 25);
}

//draw bricks
function drawBricks() {
  for (i = 0; i < column; i++) {
    for (j = 0; j < row; j++) {
      if (bricks[i][j].status == 1) {
        let brickX = i * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = j * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[i][j].x = brickX;
        bricks[i][j].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#BC8F8F";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas after interval
  drawBall();
  drawPaddle();
  drawBricks();
  lifelines();
  calcScore();
  breakBricks();

  // collision and bounce back off the sides

  //if ball passes y axis its game over

  if (y + dy < ballR) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballR) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        alert(`Game Over`);
        document.location.reload();
      } else {
        let x = canvas.width / 2;
        let y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
  if (x + dx > canvas.width - ballR || x + dx < ballR) {
    dx = -dx;
  }

  //paddle movement
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
