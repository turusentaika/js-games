export class Score {
    constructor(context) {
        this.context = context;
        this.value = 0;
    }

    add(points) {
        this.value += points;
        if (this.value < 0) {
            this.value = 0;
        }
    }

    draw() {
        this.context.fillStyle = "white";
        this.context.font = "30px Arial";
        this.context.fillText("Pisteet: " + this.value, 20, 40);
    }

    reset() {
        this.value = 0;
    }
}


