// // // The below function detects the swipe direction and logs it to the console

// // const touchArea = document.querySelector(".touch-area");

// // touchArea.addEventListener("touchstart", handleTouchStart, false);
// // // touchArea.addEventListener("touchmove", handleTouchMove, false);
// // touchArea.addEventListener("touchend", handleTouchEnd, false);

// let xDown = null;

// function getTouches(evt) {
//   return evt.touches;
// }

// function handleTouchStart(evt) {
//   const firstTouch = getTouches(evt)[0];
//   xDown = firstTouch.clientX;
// }

// function handleTouchMove(evt) {
//     if (!xDown) {
//     return;
//     }
    
//     const element = evt.target;
    
//     const rect = element.getBoundingClientRect();
//     console.log(rect)
//     const xPos = evt.touches[0].clientX - rect.left;

//     console.log(xPos)
    
//     // if (xPos >= 0 && xPos <= rect.width) {
//     //     element.style.setProperty("--xPos", xPos + "px");
//     // }

//     element.style.setProperty("--xPos", xPos + "px");
// }

// function handleTouchEnd(evt) {
//   if (!xDown) {
//     return;
//   }

//   let xUp = evt.changedTouches[0].clientX;
//   let xDiff = xDown - xUp;

//   if (Math.abs(xDiff) > 0) {
//     if (xDiff > 0) {
//       console.log("left");
//     } else {
//       console.log("right");
//     }
//   }

//   xDown = null;
// }


function swipeAndRemove(element) {
    let isDragging = false;
    let startPosition = null;
    let currentTranslate = 0;
    const threshold = 50; // adjust as needed
    let animationFrameId;
  
    element.addEventListener("mousedown", dragStart);
    element.addEventListener("touchstart", dragStart);
    element.addEventListener("mouseup", dragEnd);
    element.addEventListener("touchend", dragEnd);
    element.addEventListener("mousemove", drag);
    element.addEventListener("touchmove", drag);
  
    function dragStart(event) {
      if (event.type === "touchstart") {
        startPosition = event.touches[0].clientX;
      } else {
        startPosition = event.clientX;
      }
      isDragging = true;
    }
  
    function dragEnd(event) {
        const distance = currentTranslate - startPosition;
        if (distance < -threshold) {
          // Add a delay of 500 milliseconds before removing the element
          element.classList.add("slide-out");
          setTimeout(() => {
            // Remove the element from the DOM after the animation is complete
            element.addEventListener("animationend", () => {
              element.remove();
            });
          }, 500);
        }
        isDragging = false;
        startPosition = null;
        cancelAnimationFrame(animationFrameId);
      }


    function drag(event) {
      if (isDragging) {
        let currentPosition = null;
        if (event.type === "touchmove") {
          currentPosition = event.touches[0].clientX;
        } else {
          currentPosition = event.clientX;
        }
        const diff = currentPosition - startPosition;
        currentTranslate += diff;
        startPosition = currentPosition;
        requestAnimationFrame(() => {
          element.style.setProperty("--xPos", `${currentTranslate}px`);
        });
      }
    }
}

export { swipeAndRemove };