const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y, char) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.dy = 0;
    this.width = ctx.measureText(char).width;
    this.height = 20;
    this.colliding = false;
  }

  update() {
    if (!this.colliding) {
      this.y += this.dy;
      this.dy += 0.1; // Gravity effect

      // Check collision with other particles
      for (const particle of particles) {
        if (particle !== this && this.checkCollision(particle)) {
          this.colliding = true;
          break;
        }
      }

      // Check collision with bottom of canvas
      if (this.y + this.height >= canvas.height) {
        this.colliding = true;
      }
    }
  }

  checkCollision(otherParticle) {
    return (
      this.x < otherParticle.x + otherParticle.width &&
      this.x + this.width > otherParticle.x &&
      this.y < otherParticle.y + otherParticle.height &&
      this.y + this.height > otherParticle.y
    );
  }

  draw() {
    ctx.font = "20px Arial";
    ctx.fillText(this.char, this.x, this.y);
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
}

function addParticles(text) {
  let x = Math.random() * canvas.width;
  let y = -20;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const particle = new Particle(x, y, char);
    particles.push(particle);
    x += ctx.measureText(char).width; // Move x position to the right based on character width
  }
}

document.getElementById("textInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const text = e.target.value;
    addParticles(text);
    e.target.value = ""; // Clear input field
  }
});

animate();
