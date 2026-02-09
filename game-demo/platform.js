export class Platform {
    constructor(context, x, y, width, height, speed) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    update() {
        this.x -= this.speed;
    }

    draw() {
        this.context.fillStyle = "#111";
        this.context.fillRect(this.x, this.y, this.width, this.height);

        // neon-reuna
        this.context.strokeStyle = "#0ff";
        this.context.lineWidth = 2;
        this.context.strokeRect(this.x, this.y, this.width, this.height);
    }
}
