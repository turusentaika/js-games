export class Score{
    constructor(ctx){ this.ctx=ctx; this.value=0; }
    add(v){ this.value+=v; }
    draw(canvas){
        this.ctx.fillStyle="#00ffff";
        this.ctx.font="28px monospace";
        this.ctx.textAlign="right";
        this.ctx.fillText("💰 "+this.value,canvas.width-30,40);
        this.ctx.textAlign="left";
    }
}

