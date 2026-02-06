export function Stuff(context, images, width, height){
    this.x = Math.floor(Math.random()*width)+width;
    this.y = Math.floor(Math.random()*height);
    this.type = Math.floor(Math.random()*images.length);
    this.speed = images[this.type].speed;
    this.xsize = images[this.type].xsize;
    this.ysize = images[this.type].ysize;
    this.audio = images[this.type].sound;
    this.points = images[this.type].points;
    this.hit = false;
    this.isTrash = images[this.type].isTrash;


    
    this.move = function(){
        this.x = this.x - this.speed;
        if(this.x < -50){
            this.x = Math.floor(Math.random()*width)+width;
            this.y = Math.floor(Math.random()*height);
        }
    }
    this.show = function(){
        context.drawImage(images[this.type].img, 
            this.x, 
            this.y, 
            this.xsize, 
            this.ysize);
    }
    this.collide = function(player){
        if (this.hit) return false;
    
        let player_x = player.x + player.xsize / 2;
        let player_y = player.y + player.ysize / 2;
        let stuff_x = this.x + this.xsize / 2;
        let stuff_y = this.y + this.ysize / 2;
    
        let a = stuff_x - player_x;
        let b = stuff_y - player_y;
        let distance = Math.sqrt(a*a + b*b);
        let r = (this.xsize + this.ysize)/4 + (player.xsize + player.ysize)/4;
    
        if(distance <= r){
            this.hit = true;
    
            this.audio.play().catch(() => {
                console.log("error in playing");
            });
    
            return true;
        }
        return false;
    }
    
    this.reset = function(){
        this.x = Math.floor(Math.random()*width)+width;
        this.y = Math.floor(Math.random()*height);
        this.type = Math.floor(Math.random()*images.length);
        this.speed = images[this.type].speed;
        this.xsize = images[this.type].xsize;
        this.ysize = images[this.type].ysize;
        this.audio = images[this.type].sound;
        this.points = images[this.type].points;
        this.hit = false;
        this.isTrash = images[this.type].isTrash;

    }
    
}