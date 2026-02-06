import { Player } from './player.js';
import { Star } from './star.js';
import { Stuff } from './stuff.js';
import { Score } from './points.js';
import { Lives } from './lives.js';


const WIDTH = 1895;
const HEIGHT = 900;
const STEP = 50;
const STARTX = 300;
const STARTY = 400;
const PLAYERSIZE = 100;
const SPEED = 7;
//https://freesound.org/people/HuvaaKoodia/sounds/77087/
const audio_laser = new Audio();
audio_laser.src = "./sound/laser_zero.wav";
//https://freesound.org/people/murraysortz/sounds/192492/;
const audio_bubble = new Audio();
audio_bubble.src = "./sound/bubble_zero.wav";
let canvas = document.getElementById("canvas");
let playerImg = document.getElementById("player");
let trashImg = document.getElementById("trash");
let bananaImg = document.getElementById("banana");
let moneyImg = document.getElementById("money");
let colaImg = document.getElementById("cola");
let images = [{"img": trashImg, "xsize": 60, "ysize": 60, speed: 10, "sound": audio_laser, points: -10, isTrash: true},
              {"img": bananaImg, "xsize": 60, "ysize": 20, speed: 7, "sound": audio_bubble, points: 10, isTrash: false},
              {"img": moneyImg, "xsize": 50, "ysize": 30, speed: 7, "sound": audio_bubble, points: 20, isTrash: false},
              {"img": colaImg, "xsize": 30, "ysize": 50, speed: 10, "sound": audio_laser, points: -20, isTrash: true}];
canvas.height = HEIGHT;
canvas.width = WIDTH;
let context = canvas.getContext("2d");
const noOfStars = 50;
const noOfStuff = 25;
let stars = [];
let stuff = [];
let player = new Player(context, playerImg, STARTX, STARTY, PLAYERSIZE, PLAYERSIZE);
let score = new Score(context);
let lives = new Lives(context, 5);



for(let i=0; i < noOfStuff; i++){
    stuff.push(new Stuff(context, images, WIDTH, HEIGHT, SPEED));
}

for(let i=0; i < noOfStars; i++){
    stars.push(new Star(context, WIDTH, HEIGHT, SPEED));
}

window.addEventListener("keydown", event => {
    if (event.key === "Enter" && lives.gameOver) {
        restartGame();
        return;
    }

    if (!lives.gameOver) {
        if (event.key === "ArrowUp") {
            player.y -= STEP;
        } else if (event.key === "ArrowDown") {
            player.y += STEP;
        }
    }
});

function draw (){
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => { 
        star.show();
        star.move();
    });
    stuff.forEach(stuff => {
        stuff.show();
        stuff.move();
    });
    if (player && !lives.gameOver) {
        stuff.forEach(s => {
            if (s.collide(player)) {
    
                if (s.isTrash) {
                    lives.loseLife();
                } else {
                    score.add(s.points);
                }
    
                s.reset();
            }
        });
    
        player.show();
    }
    
    score.draw();
    lives.draw();

    
};

function update(){
    if (!lives.gameOver) {
        draw();
        window.requestAnimationFrame(update);
    } else {
        draw(); // piirretään vielä game over -teksti
    }
};

function restartGame() {
    score.reset();
    lives.reset();

    stuff.forEach(s => s.reset());

    update();
}



addEventListener("load", function(){
    update();
});