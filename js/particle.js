const particlesArray = [];

class Particle {
    constructor(){
        this.x = bird.x; // horizontal cordinate
        this.y = bird.y; // vertical cordinate
        this.size = (Math.random() * 2) + 3; // from 3 to 10
        this.speedY = (Math.random() * 1) - 0.5; // from -0.5 to 0.5
        this.color = 'hsla(' + hue + ', 70%, 50%, 0.8 )';  //particle color(in hsla).
    }
    update(){
        this.x -= gamespeed; // particle should move equal, but oposite to bird movement. (away from bird horizontally)
        this.y += this.speedY; // Particle should move vertically from -0.5, to 0.5, along birds tail. 
    }
    draw(){
        ctx.fillStyle = this.color; // Assign particles color
        ctx.beginPath();            // Begin to draw particle.
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);  // draw particle circle with given values
        ctx.fill(); // draw particle on canvas.
    }
}

function handleParticles(){
    particlesArray.unshift(new Particle);   // add new particles to array with custom class inputs.
    // update and draw for each particle in array
    for (i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    // if more than 200, remove 20
    if (particlesArray.length > 200){
        for (let i = 0; i < 20; i++){
            particlesArray.pop(particlesArray[i]);
        }
    }
}