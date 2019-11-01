const blue = document.getElementById("blue");
const red = document.getElementById("red");
const orange = document.getElementById("orange");
const green = document.getElementById("green");
const startButton = document.getElementById("startButton");
const LAST_LEVEL = 10;

class Game {
  constructor() {
    this.startGame = this.startGame.bind(this);
    this.startGame();
    this.generateSecuence();
    setTimeout(() => {
      this.nextLevel();
    }, 500);
  }

  startGame() {
    this.pickColor = this.pickColor.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.toggleStartButton();
    this.level = 1;
    this.colors = {
      blue,
      red,
      orange,
      green
    };

    this.levelCounter = document.getElementById("levelCounter");
    this.changeLevelTag(this.level);
  }

  toggleStartButton() {
    if (startButton.classList.contains("hide")) {
      startButton.classList.remove("hide");
    } else {
      startButton.classList.add("hide");
    }
  }

  generateSecuence() {
    this.secuence = new Array(LAST_LEVEL)
      .fill(0)
      .map(n => Math.floor(Math.random() * 4));
  }

  nextLevel() {
    this.subLevel = 0;
    this.lightSecuence();
    this.addClickEvents();
  }

  changeLevelTag(level) {
    this.levelCounter.classList.add("highlight-text");
    setTimeout(() => {
      this.levelCounter.classList.remove("highlight-text");
    }, 500);
    this.levelCounter.textContent = `Level ${level}`;
  }

  parseNumberToColor(number) {
    switch (number) {
      case 0:
        return "blue";
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "green";
    }
  }

  parseColorToNumber(color) {
    switch (color) {
      case "blue":
        return 0;
      case "red":
        return 1;
      case "orange":
        return 2;
      case "green":
        return 3;
    }
  }

  lightSecuence() {
    for (let index = 0; index < this.level; index++) {
      const color = this.parseNumberToColor(this.secuence[index]);
      setTimeout(() => this.turnOnColor(color), 1000 * index);
    }
  }

  turnOnColor(color) {
    this.colors[color].classList.add("light");
    setTimeout(() => this.turnOffColor(color), 350);
  }

  turnOffColor(color) {
    this.colors[color].classList.remove("light");
  }

  addClickEvents() {
    this.colors.blue.addEventListener("click", this.pickColor);
    this.colors.green.addEventListener("click", this.pickColor);
    this.colors.red.addEventListener("click", this.pickColor);
    this.colors.orange.addEventListener("click", this.pickColor);
  }

  removeClickEvents() {
    this.colors.blue.removeEventListener("click", this.pickColor);
    this.colors.green.removeEventListener("click", this.pickColor);
    this.colors.red.removeEventListener("click", this.pickColor);
    this.colors.orange.removeEventListener("click", this.pickColor);
  }

  pickColor(ev) {
    const colorName = ev.target.dataset.color;
    const colorNumber = this.parseColorToNumber(colorName);
    this.turnOnColor(colorName);

    if (colorNumber === this.secuence[this.subLevel]) {
      this.subLevel++;
      if (this.subLevel === this.level) {
        this.level++;
        this.changeLevelTag(this.level);
        if (this.level === LAST_LEVEL + 1) {
          this.gameWon();
        } else {
          setTimeout(this.nextLevel, 1500);
        }
      }
    } else {
      this.gameover();
    }
  }

  gameWon() {
    swal(
      "Congratulations",
      "You've won, now your memory is a bit better.",
      "success"
    ).then(() => {
      this.startGame();
    });
  }

  gameover() {
    swal(
      "Gameover",
      "You've lost in this time, but don't give up.",
      "error"
    ).then(() => {
      this.removeClickEvents();
      this.startGame();
    });
  }
}

function startNewGame() {
  window.game = new Game();
}
