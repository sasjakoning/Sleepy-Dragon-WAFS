const canvasCharacter = document.getElementById("canvas-character");

const canvasCharacterRive = new rive.Rive({
  src: "./images/persona.riv",
  canvas: canvasCharacter,
  autoplay: true,
  stateMachines: "persona-states",
  artboard: "character-card",
  fit: rive.Fit.cover,
  onLoad: (_) => {
    canvasCharacterRive.resizeDrawingSurfaceToCanvas();
  },
});


const clickArea = document.querySelector(".clickArea");
const card = document.querySelector(".sasjaCard > section")

clickArea.addEventListener("click", () => {
    console.log("clicked")
    card.classList.toggle("clicked");
});


// rotate the card in 3d based on cursor position

const root = document.documentElement;

document.addEventListener("mousemove", (e) => {
    const x = e.clientX - window.innerWidth / 2;
    const y = e.clientY - window.innerHeight / 2;


    root.style.setProperty('--rotateX', `${y * 0.05}deg`);
    root.style.setProperty('--rotateY', `${x * 0.05}deg`);
});








