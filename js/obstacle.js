const obstaclesArray = [];

//This class can be used to create bar charts for trading softwares, e.t.c.
class Obstacle {
    constructor(){
        this.top = (Math.random() * canvas.height/3) + 20;    // height of top obstacle(pipes), from 20 to 153.3.
        this.bottom = (Math.random() * canvas.height/3) + 20; // height of bottom obstacle, from 20 to 153.3.
        this.x = canvas.width; // horizontal position of obstalce. right edge of canvas.
        this.width = 20;      // canvas width.
        this.color = 'hsla(' + hue + ', 100%, 50%, 1)';  // Obstacle color in hsl color picker.
        this.counted = false;
    }
    draw(){
        ctx.fillStyle = this.color; // Assign particles color
        // ctx.fillStyle = this.color; // Assign obstacle color
        ctx.fillRect(this.x, 0, this.width, this.top);  // draw top obstacle.
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom); // draw bottom obstacle.
    } 
    update(){
        this.x -= gamespeed; //move horizontally to the left per frame. 
       //Score Counter
        if(!this.counted && this.x < bird.x )
        {
            score++;
           this.counted = true;
        }
        this.draw();
    }
}
//this creates new obstacle every 50 frames in the game.
function handleObstacles(){
    if (frame%50 === 0){ //sets distance between obstacles
        obstaclesArray.unshift(new Obstacle); // adds new obstacle to obstacleArray.
    }
    for (let i = 0; i < obstaclesArray.length; i++){
        obstaclesArray[i].update();
    }
    //if more than 20, remove 1
    if (obstaclesArray.length > 20){
        obstaclesArray.pop(obstaclesArray[0]);
    }

}