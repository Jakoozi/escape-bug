class Bird {
    constructor(){
        this.x = 150;   //horizontal cordinate on canvas
        this.y = 200;   //vertical cordinate on canvas
        this.vy = 0;    //vertical veolcity
        this.width = 20;  //bird width
        this.height = 20;  //bird height
        this.weight = 1;   //vertical pull on bird. (gravity)
    }
    //this function draws the player
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
    }
}
const bird = new Bird();