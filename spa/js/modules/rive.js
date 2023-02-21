
function riveDragonLoad(canvas) {

  console.log(canvas)

  const canvasDragonLoadRive = new rive.Rive({
    src: "./images/sleepy_dragon.riv",
    canvas: canvas,
    autoplay: true,
    stateMachines: "dragon-loading",
    artboard: "dragon-loading",
    fit: rive.Fit.cover,
    onLoad: (_) => {
      canvasDragonLoadRive.resizeDrawingSurfaceToCanvas();
  
    },
  });
}

export { riveDragonLoad };