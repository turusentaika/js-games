export class Player {
    constructor(context, img, x, y) {
        this.context = context;
        this.img = img;

        this.x = x;
        this.y = y;

        this.width = 60;
        this.height = 100;

        this.velX = 0;
        this.velY = 0;

        this.speed = 0.6;
        this.maxSpeed = 8;
        this.friction = 0.85;
        this.gravity = 0.6;
        this.jumpStrength = -15;

        this.onGround = false;

        this.hasShield = false;
    }

    update(platforms) {
        // gravity
        this.velY += this.gravity;

        // inertia
        this.velX *= this.friction;

        this.x += this.velX;
        this.y += this.velY;

        this.onGround = false;

        platforms.forEach(p => {
            if (this.collide(p)) {
                this.y = p.y - this.height;
                this.velY = 0;
                this.onGround = true;
            }
        });
    }

    jump() {
        if (this.onGround) {
            this.velY = this.jumpStrength;
            this.onGround = false;
        }
    }

    moveRight() {
        this.velX += this.speed;
        if (this.velX > this.maxSpeed) this.velX = this.maxSpeed;
    }

    draw() {
        this.context.drawImage(this.img, this.x, this.y, this.width, this.height);

        // kilpiefekti
        if (this.hasShield) {
            this.context.strokeStyle = "cyan";
            this.context.lineWidth = 3;
            this.context.strokeRect(this.x-5, this.y-5, this.width+10, this.height+10);
        }
    }

    collide(platform) {
        return (
            this.x < platform.x + platform.width &&
            this.x + this.width > platform.x &&
            this.y + this.height <= platform.y + 10 &&
            this.y + this.height + this.velY >= platform.y
        );
    }
}
