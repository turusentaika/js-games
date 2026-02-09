import { Player } from "./player.js";
import { Platform } from "./platform.js";
import { Item } from "./item.js";
import { Score } from "./score.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1920;
canvas.height = 900;

let gameSpeed = 4;
let distanceCounter = 0;

const player = new Player(ctx, 200, 500);
const score = new Score(ctx);

let platforms = [];
let items = [];

// aloituskatot
platforms.push(new Platform(ctx, 0, 650, 500, gameSpeed));
platforms.push(new Platform(ctx, 600, 600, 400, gameSpeed));

function spawnPlatform() {
    const width = 300 + Math.random()*200;
    const gap = 100 + Math.random()*120;
    const last = platforms[platforms.length - 1];
    platforms.push(new Platform(ctx, last.x + last.width + gap, 550 + Math.random()*80, width, gameSpeed));
}

function spawnItem(x, y) {
    const r = Math.random();
    let type = "coin";
    if (r > 0.9) type = "shield";
    else if (r > 0.8) type = "boost";

    items.push(new Item(ctx, x, y-40, type, gameSpeed));
}

function drawBackground() {
    const g = ctx.createLinearGradient(0,0,0,canvas.height);
    g.addColorStop(0,"#2b004f");
    g.addColorStop(1,"#050014");
    ctx.fillStyle = g;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function update() {
    drawBackground();

    if (player.isDead) {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#ff00ff";
        ctx.font = "80px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
        ctx.font = "30px monospace";
        ctx.fillText("Paina F5 jatkaaksesi", canvas.width/2, canvas.height/2+60);
        ctx.textAlign = "left";
        return;
    }

    distanceCounter += gameSpeed;
    if (distanceCounter > 2000) { gameSpeed += 0.4; distanceCounter = 0; }

    platforms.forEach(p => { p.speed = gameSpeed; p.update(); p.draw(); });
    if (platforms[platforms.length-1].x < canvas.width) {
        spawnPlatform();
        spawnItem(platforms[platforms.length-1].x+100, platforms[platforms.length-1].y);
    }
    platforms = platforms.filter(p => p.x+p.width > -200);

    items.forEach(i => { 
        i.speed = gameSpeed; 
        i.update(); 
        i.draw(); 

        if (i.collide(player)) {
            if (i.type === "coin") score.add(10);
            if (i.type === "shield") player.hasShield = true;
            if (i.type === "boost") player.activateBoost();
        }
    });
    items = items.filter(i => !i.collected);

    player.update(platforms);
    player.draw();

    score.draw(canvas);

    requestAnimationFrame(update);
}

window.addEventListener("keydown", e => { if (e.code==="Space") player.jump(); });

update();
