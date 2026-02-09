export class Player {
    constructor(ctx,x,y){
        this.ctx=ctx;
        this.x=x;
        this.y=y;
        this.width=60;
        this.height=100;

        this.velY=0;
        this.gravity=0.65;
        this.jumpPower=-18;

        this.onGround=false;
        this.hasShield=false;
        this.boostTimer=0;
        this.isDead=false;

        this.maxJumps=2;
        this.jumpsLeft=2;
    }

    activateBoost(){ this.boostTimer=180; }

    update(platforms){
        this.velY+=this.gravity;
        this.y+=this.velY;
        this.onGround=false;

        platforms.forEach(p=>{
            if(this.x+this.width>p.x && this.x<p.x+p.width &&
               this.y+this.height>=p.y && this.y+this.height<=p.y+20 &&
               this.velY>=0){
                this.y=p.y-this.height;
                this.velY=0;
                this.onGround=true;
                this.jumpsLeft=this.maxJumps;
            }
        });

        if(this.boostTimer>0) this.boostTimer--;
        this.die(this.ctx.canvas.height);
    }

    jump(){
        if(this.jumpsLeft>0){
            this.velY=this.jumpPower;
            this.jumpsLeft--;
        }
    }

    die(canvasHeight){
        if(this.y>canvasHeight+200){
            if(this.hasShield){ this.hasShield=false; this.y=300; this.velY=0; }
            else this.isDead=true;
        }
    }

    draw(){
        this.ctx.fillStyle="#ff00ff";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
        if(this.hasShield){
            this.ctx.strokeStyle="#00ffff";
            this.ctx.lineWidth=3;
            this.ctx.strokeRect(this.x-5,this.y-5,this.width+10,this.height+10);
        }
    }
}
