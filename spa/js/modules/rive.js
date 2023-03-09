
function riveAnimLoad(canvas) {
  const canvasDragonLoadRive = new rive.Rive({
    src: './images/sleepy_dragon.riv',
    canvas: canvas,
    autoplay: true,
    stateMachines: 'dragon-loading',
    artboard: 'dragon-loading',
    fit: rive.Fit.cover,
    onLoad: (_) => {
      canvasDragonLoadRive.resizeDrawingSurfaceToCanvas();

    },
  });
}


function riveAnimTitle(canvas) {
  const canvasDragonTitleRive = new rive.Rive({
    src: './images/sleepy_dragon.riv',
    canvas: canvas,
    autoplay: true,
    stateMachines: 'dragon-sleeping-states',
    artboard: 'dragon-sleeping',
    fit: rive.Fit.cover,
    onLoad: (_) => {
      canvasDragonTitleRive.resizeDrawingSurfaceToCanvas();
    },
  });
}

function riveAnimReading(canvas) {
  const canvasDragonReadingRive = new rive.Rive({
    src: './images/sleepy_dragon.riv',
    canvas: canvas,
    autoplay: true,
    stateMachines: 'dragon-reading',
    artboard: 'dragon-reading',
    fit: rive.Fit.cover,
    onLoad: (_) => {
      canvasDragonReadingRive.resizeDrawingSurfaceToCanvas();

    },
  });
}

export default {
  riveAnimLoad,
  riveAnimTitle,
  riveAnimReading,
};