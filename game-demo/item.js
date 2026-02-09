export class Item {
    constructor(context, x, y, type, speed) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.type = type; // "coin" | "shield" | "boost"
        this.speed = speed;
        this.type = "coin";

        this.size = 30;
        this.collected = false;
    }

    update() {
        this.x -= this.speed;
    }

    draw() {
        if (this.collected) return;

        if (this.type === "coin") {
            this.context.fillStyle = "#ffd700"; // kulta
        } else if (this.type === "shield") {
            this.context.fillStyle = "#00ffff"; // cyan
        } else if (this.type === "boost") {
            this.context.fillStyle = "#ff00ff"; // magenta
        }

        this.context.beginPath();
        this.context.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        this.context.fill();
    }

    collide(player) {
        if (this.collected) return false;

        const dx = player.x + player.width / 2 - this.x;
        const dy = player.y + player.height / 2 - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size) {
            this.collected = true;
            return true;
        }
        return false;
    }
}

