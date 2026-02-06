export class Lives {
    constructor(context, maxLives = 5) {
        this.context = context;
        this.maxLives = maxLives;
        this.value = maxLives;
        this.gameOver = false;
    }

    loseLife() {
        if (this.gameOver) return;

        this.value--;

        if (this.value <= 0) {
            this.value = 0;
            this.gameOver = true;
        }
    }

    draw() {
        this.context.fillStyle = "white";
        this.context.font = "30px Arial";
        this.context.fillText("Elämät: " + this.value, 20, 80);

        if (this.gameOver) {
            this.context.fillStyle = "red";
            this.context.font = "80px Arial";
            this.context.textAlign = "center";
            this.context.fillText("GAME OVER", 950, 410);
            this.context.fillText("Paina Enter jatkaaksesi", 950, 520);
            this.context.textAlign = "left";
        }
    }

    reset() {
        this.value = this.maxLives;
        this.gameOver = false;
    }
}
