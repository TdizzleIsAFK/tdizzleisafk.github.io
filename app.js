// Game variables
var background = document.getElementById("gameBackground");
var context = background.getContext("2d");
var backgroundImage = new Image();
var submarineImage = new Image();
var gravity = 0.6;
var jumpForce = 12;
var submarine = {
  x: 100,
  y: background.height / 2 - 25,
  width: 100,
  height: 50,
  velocity: 0
};

// Load images
backgroundImage.src = "img/ocean.svg";
submarineImage.src = "img/gameSub.png";

// Handle key presses
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    jumpSubmarine();
  }
});

// Jump the submarine
function jumpSubmarine() {
  submarine.velocity = -jumpForce;
}

// Update game frames
function update() {
  // Clear the canvas
  context.clearRect(0, 0, background.width, background.height);

  // Draw background
  context.drawImage(backgroundImage, 0, 0, background.width, background.height);

  // Draw submarine
  context.drawImage(submarineImage, submarine.x, submarine.y, submarine.width, submarine.height);

  // Apply gravity to the submarine
  submarine.velocity += gravity;
  submarine.y += submarine.velocity;

  // Request the next frame
  requestAnimationFrame(update);
}

// Start the game
backgroundImage.onload = function () {
  update();
};
