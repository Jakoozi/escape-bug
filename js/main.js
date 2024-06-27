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

 const gradient = ctx.createLinearGradient(0, 0, 0, 70);
 gradient.addColorStop('0.4', '#fff');
 gradient.addColorStop('0.5', '#000');
 gradient.addColorStop('0.55', '#4040ff');
 gradient.addColorStop('0.6', '#fff');
 gradient.addColorStop('0.6', '#000');

//this is the OnTick/Frame function. Creates animation effect. It's a recursive method, meaning it calls itself repeatedly, until being stopped by a condition. 
function animate(){
   ctx.clearRect(0, 0, canvas.width, canvas.height);   //this clears the entire canvas btw every frame of animation
   handleParticles(); //create particle array
   handleObstacles();  //create obstacle array
   bird.update();    //update player values
   //Score Text
   ctx.fillStyle = gradient;
   ctx.font = '90px Georgia';
   ctx.strokeText(score, 450, 70);
   ctx.fillText(score, 450, 70); 

   handleCollisions();  //handles bird and obstacle collision.
   if (handleCollisions()) return; //break recursion loop.
   requestAnimationFrame(animate);  //recursion. It runs this function every frame
   angle += 0.12;
   hue++;   // color changer
   frame++; // frame counter
}
animate();

window.addEventListener('keydown', function(e){
   if(e.code === 'Space') spacePressed = true;
}) 
window.addEventListener('keyup', function(e){
   if(e.code === 'Space') spacePressed = false;
})

const bang = new Image();
bang.src = ''

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
            ctx.fillStyle = 'black';
            ctx.fillText('Game Over, Your Score is: ' + score, 160, canvas.height/2 -10)
            return true;

          }
   }
}