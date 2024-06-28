 const canvas = document.getElementById("canvas1");
 const ctx = canvas.getContext('2d');
 canvas.width = 600;
 canvas.height = 400;

 let spacePressed = false; //player controller
 let angle = 0;
 let hue = 0;              //rambow effector.
 let frame = 0;            //each snapshot of the game.
 let score = 0;            //player score
 let gamespeed = 2;        //current game speed.
 let gamestart = false;

 const gradient = ctx.createLinearGradient(0, 0, 0, 70);
 gradient.addColorStop('0.4', '#fff');
 gradient.addColorStop('0.5', '#000');
 gradient.addColorStop('0.55', '#4040ff');
 gradient.addColorStop('0.6', '#fff');
 gradient.addColorStop('0.6', '#000');

 //endless scrolling Background Image Functionality.
 const background = new Image();
background.src = './img/BG2.png';
const BG = {
   x1: 0,
   x2: canvas.width,
   y: 0,
   width: canvas.width,
   height: canvas.height
}
function handleBackground(){
   if(BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
   else BG.x1 -= gamespeed;
   if(BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
   else BG.x2 -= gamespeed;
   ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
   ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}




//this is the OnTick/Frame function. Creates animation effect. It's a recursive method, meaning it calls itself repeatedly, until being stopped by a condition. 
function animate(){
   ctx.clearRect(0, 0, canvas.width, canvas.height);   //this clears the entire canvas btw every frame of animation
   handleBackground(); //creates background image 
   handleObstacles();  //create obstacle array
   handleParticles(); //create particle array
   bird.update();    //update player values
   //Score Text
   ctx.fillStyle = gradient;
   ctx.font = '70px Georgia';
   ctx.strokeText(score, 250, 70);
   ctx.fillText(score, 250, 70); 

   handleCollisions();  //handles bird and obstacle collision.
   if (handleCollisions()) return; //break recursion loop.
   requestAnimationFrame(animate);  //recursion. It runs this function every frame
   angle += 0.12;
   hue++;   // color changer
   frame++; // frame counter
}
animate();


//Keyboard Event Listener
window.addEventListener('keydown', function(e){
   if(e.code === 'Space') spacePressed = true;
}) 
window.addEventListener('keyup', function(e){
   if(e.code === 'Space') spacePressed = false;
   bird.frameX = 0;
})

//Touch screen event listener
window.addEventListener('touchstart', function(e){
   spacePressed = true;
   console.log("Mouse Pressed")
}) 
window.addEventListener('touchend', function(e){
   spacePressed = false;
   bird.frameX = 0;
   console.log("Mouse Released")
})

const bang = new Image();
bang.src = './img/bang.png'

function handleCollisions(){
   for (let i = 0; i < obstaclesArray.length; i++){
      if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
          bird.x + bird.width > obstaclesArray[i].x &&
         ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
         (bird.y > canvas.height - obstaclesArray[i].bottom &&
          bird.y + bird.height < canvas.height))){
            //Collision Detected
            ctx.drawImage(bang, bird.x, bird.y, 50, 50);
            console.log("Bang!!!")
            //Game Over Text.
            ctx.font = "25px Georgia";
            ctx.fillStyle = '#0f0a1a';
            ctx.fillText('Game Over, Your Score is: ' + score, 160, canvas.height/2 -10)
            return true;

          }
   }
}


