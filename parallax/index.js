const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);

let gameSpeed = 10;
const gameFrame = 0;

const backGroundLayer1 = new Image();
backGroundLayer1.src = "./assets/layer-1.png";
const backGroundLayer2 = new Image();
backGroundLayer2.src = "./assets/layer-2.png";
const backGroundLayer3 = new Image();
backGroundLayer3.src = "./assets/layer-3.png";
const backGroundLayer4 = new Image();
backGroundLayer4.src = "./assets/layer-4.png";
const backGroundLayer5 = new Image();
backGroundLayer5.src = "./assets/layer-5.png";

window.addEventListener("load", () => {
  class Layer {
    /**
     * Represents a scrolling background layer.
     * Can be used for parallax effects or general background scrolling.
     * @param {HTMLImageElement} image - The image used for this layer.
     * @param {number} speedModifier - A multiplier that adjusts this layer's speed relative to the game's speed.
     */
    constructor(image, speedModifier) {
      this.x = 0; // Initial x position of the first image instance.
      this.y = 0; // The y position remains constant since this layer only scrolls horizontally.
      this.width = 2400; // Fixed width of the image layer.
      this.height = 700; // Fixed height of the image layer.

      this.image = image; // The image associated with this layer.
      this.speedModifier = speedModifier; // Controls how fast this layer moves relative to gameSpeed.
      this.speed = gameSpeed * this.speedModifier; // Layer's effective speed.
    }

    /**
     * Updates the layer's position to create a continuous scrolling effect.
     */
    update() {
      this.speed = gameSpeed * this.speedModifier; // Recalculate speed in case gameSpeed changes.

      // Reset the position of the  image when it moves completely out of view.
      if (this.x <= -this.width) {
        this.x = 0;
      }

      this.x = Math.floor(this.x - this.speed);
    }

    /**
     * Draws the layer images on the canvas to create the scrolling effect.
     */
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height); // Draw first image instance.
      ctx.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      ); // Draw second image instance.
    }
  }

  const layer1 = new Layer(backGroundLayer1, 0.2);
  const layer2 = new Layer(backGroundLayer2, 0.4);
  const layer3 = new Layer(backGroundLayer3, 0.6);
  const layer4 = new Layer(backGroundLayer4, 0.8);
  const layer5 = new Layer(backGroundLayer5, 1);
  const gameObjects = [layer1, layer2, layer3, layer4, layer5];

  const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach((object) => {
      object.update();
      object.draw();
    });

    requestAnimationFrame(animate);
  };
  animate();

  const slider = document.getElementById("gameSpeedInput");
  slider.value = gameSpeed;

  const showGameSpeed = document.getElementById("showGameSpeed");
  showGameSpeed.textContent = gameSpeed;

  slider.addEventListener("change", (e) => {
    gameSpeed = e.target.value;
    showGameSpeed.textContent = gameSpeed;
  });
});
