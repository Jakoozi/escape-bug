const dragonSprite = new Image();
dragonSprite.src = './img/sprites/dragon.png'

const bugSprite = new Image();
bugSprite.src = './img/sprites/bug.png'

class Bird {
    constructor(){
        this.x = 150;   //horizontal cordinate on canvas
        this.y = 200;   //vertical cordinate on canvas
        this.vy = 0;    //vertical veolcity
        this.originalWidth = 268; //Original Sprite Image Width
        this.originalHeight = 209;  //original sprite image height

        this.width = this.originalWidth/10;  //player width
        this.height = this.originalHeight/10;  //player height
        this.weight = 1;   //vertical pull on bird. (gravity)
        this.frameX = 0;
    }
    //this function draws the player
    draw(){
        ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(bugSprite, this.frameX * this.originalWidth, 0, this.originalWidth, this.originalHeight,
             this.x -20, this.y -12, this.width *2, this.height *2 );
    }
    //calculates player speed and position per frame
    update(){
        let curve = Math.sin(angle) * 20;
        //check if player has gotten to the canvas floor and stop gravitaional speed
        if (this.y > canvas.height - (this.height * 3) + curve){
            this.y = canvas.height - (this.height * 3) + curve;
            this.vy = 0;
        } else{
            //gravity-pull effect implementation
            this.vy += this.weight; //increase downward pull(speed) by 1 per each frame.
            this.vy *= 0.8;         //decrease this by exponential-2.
            this.y += this.vy; 
        }
        if (this.y < 0 + this.height){
            //Ceiling exceed restriction.
            this.y = 0 + this.height;
            this.vy = 0;
        }
        if (spacePressed && this.y > this.height * 3) this.flap()
        this.draw(); //create player.
    }

    flap(){
        this.vy -= 2; //move up vertically by 2 units.
        //Flap Animation
        if (this.frameX >= 3) this.frameX = 0;
        else if (frame%10 === 0) this.frameX++;
    }
}
const bird = new Bird();