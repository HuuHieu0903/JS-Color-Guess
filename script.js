const buttonStart = document.getElementById("start");
const buttonNext = document.getElementById("next");
const buttonRestart = document.getElementById("restart");
const main = document.querySelector(".main");
const scoreContainer = document.querySelector(".score");
const timing = document.querySelector(".timing");
const color = document.querySelector(".color");
const boxColors = document.getElementsByClassName("box");
const numberOfQuestion = document.querySelector(".number-of-questions");
const userScore = document.querySelector(".user-score");

class Game {
    constructor() {
        this.countTime = 10;
        this.correctColor = undefined;
        this.numberCorrect = undefined;
        this.numberQuestion = undefined;
        this.score = undefined;
        this.countdown = undefined;
    }

    startGame() {
        buttonStart.style.display = "none";
        scoreContainer.style.display = "none";
        main.style.display = "flex";
        this.numberQuestion = 0;
        this.score = 0;
        this.nextTurn();
    }

    clearAllInterval() {
        // Get a reference to the last interval + 1
        const interval_id = window.setInterval(function () {},
        Number.MAX_SAFE_INTEGER);
        // Clear any timeout/interval up to that id
        for (let i = 1; i < interval_id; i++) {
            window.clearInterval(i);
        }
    }

    timeDisplay() {
        this.countTime = 10;
        this.clearAllInterval();
        const countdown = setInterval(() => {
            this.countTime--;
            if (this.countTime <= 0) {
                this.clearAllInterval();
                this.nextTurn();
            }
            timing.textContent = `${this.countTime}s`;
        }, 1000);
    }

    randomColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return [r, g, b];
    }

    randomListColorBox() {
        [...boxColors].forEach((box, index) => {
            if (index === this.numberCorrect) {
                box.style.backgroundColor = `RGB(${this.correctColor[0]}, ${this.correctColor[1]}, ${this.correctColor[2]})`;
            } else {
                let rgb = this.randomColor();
                box.style.backgroundColor = `RGB(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
            }
        });
    }

    nextTurn() {
        this.clearAllInterval();
        this.numberQuestion++;
        this.endGame();
        this.timeDisplay();
        let rgb = this.randomColor();
        this.correctColor = rgb;
        this.numberCorrect = Math.floor(Math.random() * 4);
        // display color code
        color.textContent = `RGB(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        this.randomListColorBox();
        // display number of questions
        numberOfQuestion.textContent = `${this.numberQuestion} of 5 Questions`;
        // remove choose answer previous
        [...boxColors].forEach((box) => {
            box.classList.remove("clicked");
            box.classList.remove("incorrect");
            box.classList.remove("correct");
        });
    }

    chooseAnswer(number) {
        boxColors[this.numberCorrect].classList.add("correct");
        if (number === this.numberCorrect) {
            this.score++;
        } else {
            boxColors[number].classList.add("incorrect");
        }
        [...boxColors].forEach((box) => {
            box.classList.add("clicked");
        });
    }

    endGame() {
        if (this.numberQuestion > 5) {
            scoreContainer.style.display = "block";
            main.style.display = "none";
            // display score
            userScore.textContent = `Your score is ${this.score} out of 5`;
            this.clearAllInterval();
            return;
        }
    }
}

let game = new Game();
buttonStart.addEventListener("click", () => {
    game.startGame();
});

buttonNext.addEventListener("click", () => {
    game.nextTurn();
});

buttonRestart.addEventListener("click", () => {
    game.startGame();
});

[...boxColors].forEach((box, index) => {
    box.addEventListener("click", (e) => {
        game.chooseAnswer(index);
    });
});
