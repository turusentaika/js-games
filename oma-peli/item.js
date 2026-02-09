export class Item {
    constructor(ctx, x, y, type, speed) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.type = type; // "coin" | "shield" | "boost"
        this.speed = speed;
        this.size = 40;
        this.collected = false;

        this.angle = 0;
        this.glowCounter = 0;
    }

    update() {
        this.x -= this.speed;
        this.angle += 0.1;
        this.glowCounter += 0.1;
    }

    draw() {
        if (this.collected) return;

        const ctx = this.ctx;

        if (this.type === "coin") {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = "#ffd700";
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#fff200";
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.restore();

        } else if (this.type === "shield") {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.strokeStyle = `hsl(${(this.glowCounter*50)%360}, 100%, 50%)`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

        } else if (this.type === "boost") {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.strokeStyle = `hsl(${(this.glowCounter*120)%360}, 100%, 50%)`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const theta = (i * 2 * Math.PI) / 5;
                ctx.lineTo(Math.cos(theta) * this.size/2, Math.sin(theta) * this.size/2);
                ctx.moveTo(0,0);
            }
            ctx.stroke();
            ctx.restore();
        }
    }

    collide(player) {
        const dx = player.x + player.width / 2 - this.x;
        const dy = player.y + player.height / 2 - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < this.size && !this.collected) {
            this.collected = true;
            return true;
        }
        return false;
    }
}
