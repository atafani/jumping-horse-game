// Game Class
class Game {
  constructor(canvas) {
    this.context = canvas.getContext("2d");
    this.gamePlaying = true;
    this.score = 0;
    this.horse = new Horse(30, canvas.height - 30, canvas);
    this.road = new Road(0, canvas.height - 30, canvas);
    this.distances = [400, 560, 450, 600];
    this.fences = [];
    this.gameInterval = setInterval(() => {
      this.drawGame();
    }, 10);
    this.scoreInterval = setInterval(() => {
      this.score++;
      document.getElementById("score").innerHTML = sessionStorage.getItem(
        "logged"
      )
        ? sessionStorage.getItem("logged") + " your score is: " + this.score
        : "Your score is: " + this.score;
    }, 500);
  }

  drawGame() {
    if (this.gamePlaying) {
      this.context.clearRect(0, 0, canvas.width, canvas.height);

      if (!this.horse.isJumping) {
        this.horse.drawHorse();
      } else {
        this.horse.jump();
      }
      this.road.drawRoad(this.horse.speed);
      this.fences.push(
        new Fence(
          this.fences.length == 0
            ? canvas.width
            : this.fences[this.fences.length - 1].x +
              this.distances[Math.floor(Math.random() * 3)],
          canvas.height - 30,
          this.context
        )
      );
      for (let i = 0; i < this.fences.length; i++) {
        this.fences[i].drawFence(this.horse.speed);
      }
      this.checkCrash();
    }
  }

  checkCrash() {
    for (let i = 0; i < this.fences.length; i++) {
      if (
        this.horse.x + this.horse.horseWalking.width >= this.fences[i].x &&
        this.horse.y + this.horse.horseWalking.height >= this.fences[i].y &&
        this.horse.x + 20 <= this.fences[i].x + this.fences[i].width
      ) {
        this.endGame();
      }
    }
  }
  endGame() {
    this.gamePlaying = false;
    document.getElementById("message-container").style.display = "block";
    clearInterval(this.gameInterval);
    clearInterval(this.scoreInterval);
    window.onkeydown = null;
    const username = sessionStorage.getItem("logged");
    if (username) {
      const user = JSON.parse(localStorage.getItem(username));
      this.score > user.score
        ? (user.score = this.score)
        : (user.score = user.score);
      localStorage.setItem(username, JSON.stringify(user));
    }
  }
}

// Horse class
class Horse {
  constructor(x, y, canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.horseWalking = document.getElementById("horse-walking");
    this.horseWalking2 = document.getElementById("horse-walking2");
    this.horseJumping = document.getElementById("horse-jumping");
    this.x = x;
    this.y = canvas.height - 30 - this.horseWalking.height;
    this.speed = 5;
    this.isJumping = false;
    this.tick = 0;
    this.walk = true;
    this.addEvent();
  }
  drawHorse() {
    this.tick++;
    this.context.clearRect(
      this.x,
      this.y,
      this.canvas.width,
      this.horseWalking.height
    );
    this.y = canvas.height - 30 - this.horseWalking.height;
    this.context.drawImage(
      this.walk ? this.horseWalking : this.horseWalking2,
      this.x,
      this.y,
      this.horseWalking.width,
      this.horseWalking.height
    );
    if (this.tick % 12 == 0) {
      this.walk ? (this.walk = false) : (this.walk = true);
    }
  }

  jump() {
    this.context.clearRect(
      this.x,
      this.y,
      this.horseJumping.width,
      this.horseJumping.height
    );

    this.context.drawImage(
      this.horseJumping,
      this.x,
      this.y,
      this.horseJumping.width,
      this.horseJumping.height
    );
  }

  addEvent() {
    window.onkeydown = () => {
      this.isJumping = true;
      this.y = this.y - 150;
      this.jump();
      setTimeout(() => {
        this.isJumping = false;
        this.drawHorse();
      }, 400);
    };
  }
}

// Fence Class
class Fence {
  constructor(x, y, context) {
    this.context = context;
    this.fence = document.getElementById("fence");
    this.x = x;
    this.y = y - this.fence.height;
    this.width = this.fence.width;
    this.height = this.fence.height;
  }
  drawFence(horseSpeed) {
    this.context.clearRect(this.x, this.y, this.width, this.height);
    this.x -= horseSpeed;

    this.context.drawImage(this.fence, this.x, this.y, this.width, this.height);
  }
}

class Road {
  constructor(x, y, canvas) {
    this.context = canvas.getContext("2d");
    this.grass = document.getElementById("grass");
    this.x = x;
    this.y = y;
    this.width = canvas.width;
  }

  drawRoad(speed) {
    this.context.clearRect(0, this.y, this.width, this.grass.height);

    for (let i = 0; i < this.width / this.grass.width; i++) {
      this.context.drawImage(
        this.grass,
        this.x + i * this.grass.width,
        this.y,
        this.grass.width + 5,
        this.grass.height
      );
    }

    this.x -= speed;
    this.width += speed;
  }
}

// Game initialization
const canvas = document.getElementById("canvas");
let game = new Game(canvas);

// Start a new game when player clicks on the replay button
document.getElementById("replay").onclick = () => {
  game = new Game(canvas);
  document.getElementById("message-container").style.display = "none";
  document.getElementById("score").innerHTML = sessionStorage.getItem("logged")
    ? sessionStorage.getItem("logged") + " your score is: " + 0
    : "Your score is: " + 0;
};
