export class Platform{
    constructor(ctx,x,y,width,speed){
        this.ctx=ctx;
        this.x=x;
        this.y=y;
        this.width=width;
        this.speed=speed;

        this.windowCols = Math.floor(this.width/50);
        this.windowRows = Math.floor((this.ctx.canvas.height-this.y-40)/60);
        this.litWindows=[];

        for(let r=0;r<this.windowRows;r++){
            this.litWindows[r]=[];
            for(let c=0;c<this.windowCols;c++){
                this.litWindows[r][c]=Math.random()>0.5;
            }
        }
    }

    update(){ this.x-=this.speed; }

    draw(){
        this.ctx.fillStyle="#0a0a0a";
        this.ctx.fillRect(this.x,this.y,this.width,this.ctx.canvas.height-this.y);

        this.ctx.strokeStyle="#00ffff";
        this.ctx.lineWidth=3;
        this.ctx.strokeRect(this.x,this.y,this.width,5);

        for(let r=0;r<this.windowRows;r++){
            for(let c=0;c<this.windowCols;c++){
                if(this.litWindows[r][c]){
                    const winX=this.x+20+c*50;
                    const winY=this.y+40+r*60;
                    this.ctx.fillStyle="#ff00ff";
                    this.ctx.fillRect(winX,winY,20,30);
                }
            }
        }
    }
}
