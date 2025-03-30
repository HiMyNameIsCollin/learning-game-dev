const AnimationStatesNames = Object.freeze({
  IDLE: "idle",
  JUMP: "jump",
  FALL: "fall",
  RUN: "run",
  DIZZY: "dizzy",
  SIT: "sit",
  ROLL: "roll",
  BITE: "bite",
  KO: "ko",
  HURT: "hurt",
});

const dropdown = document.getElementById("animations");
dropdown.innerHTML = Object.values(AnimationStatesNames).map(
  (state) => `<option value="${state}">${state}</option>`
);

let activeAnimation = AnimationStatesNames.IDLE;

dropdown.addEventListener("change", (e) => {
  activeAnimation = e.target.value;
});

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "assets/doggo.png";

const main = () => {
  const spriteSheetWidth = playerImage.width;
  const spriteSheetHeight = playerImage.height;
  const columns = 12;
  const spriteWidth = spriteSheetWidth / columns + 2; // 2px margin on frames
  const rows = 10;
  const spriteHeight = spriteSheetHeight / rows;
  // Initialize frameX and frameY to track the current sprite frame

  let gameFrame = 0;
  const STAGGER_FRAME = 5;

  const spriteAnimations = [];
  const animationStates = [
    {
      name: AnimationStatesNames.IDLE,
      frames: 7,
    },
    {
      name: AnimationStatesNames.JUMP,
      frames: 7,
    },
    {
      name: AnimationStatesNames.FALL,
      frames: 7,
    },
    {
      name: AnimationStatesNames.RUN,
      frames: 9,
    },
    {
      name: AnimationStatesNames.DIZZY,
      frames: 11,
    },
    {
      name: AnimationStatesNames.SIT,
      frames: 5,
    },
    {
      name: AnimationStatesNames.ROLL,
      frames: 7,
    },
    {
      name: AnimationStatesNames.BITE,
      frames: 7,
    },
    {
      name: AnimationStatesNames.KO,
      frames: 12,
    },
    {
      name: AnimationStatesNames.HURT,
      frames: 4,
    },
  ];
  animationStates.forEach((state, index) => {
    let frames = {
      location: [],
    };
    for (let j = 0; j < state.frames; j++) {
      const positionX = j * spriteWidth;
      const positionY = index * spriteHeight;
      frames.location.push({ x: positionX, y: positionY });
    }
    spriteAnimations[state.name] = frames;
  });

  function animate() {
    // Clear the canvas before redrawing to avoid overlapping frames
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Explanation:
    // - `gameFrame / STAGGER_FRAME`: Slows down the animation by updating the frame
    //   only when `gameFrame` reaches a multiple of `STAGGER_FRAME`.
    // - `Math.floor(...)`: Ensures the frame index is a whole number.
    // - `% getMaxFrame()`: Loops the animation by resetting `position` when it
    //   reaches the maximum number of frames (`getMaxFrame()`).
    let position =
      Math.floor(gameFrame / STAGGER_FRAME) %
      spriteAnimations[activeAnimation].location.length;

    let frameX = spriteAnimations[activeAnimation].location[position].x;
    let frameY = spriteAnimations[activeAnimation].location[position].y;

    // Draw the player sprite from the sprite sheet onto the canvas
    ctx.drawImage(
      playerImage, // Image source (sprite sheet)
      frameX, // X position on the sprite sheet
      frameY, // Y position on the sprite sheet
      spriteWidth, // Width of a single frame
      spriteHeight, // Height of a single frame
      0, // X position on the canvas
      0, // Y position on the canvas
      spriteWidth, // Drawn width on the canvas
      spriteHeight // Drawn height on the canvas
    );
    // Iterate the gameFrame
    gameFrame++;
    // if (gameFrame % STAGGER_FRAME === 0) {
    //   if (frameX < getMaxFrame()) frameX++;
    //   else frameX = 0;
    // }
    requestAnimationFrame(animate);
  }

  animate();
};

playerImage.onload = main;
