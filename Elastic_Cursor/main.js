const circleElement = document.querySelector(".circle");

const prevMouse = {x: 0, y: 0};
const presMouse = {x: 0, y: 0};
const circle = {x: 0, y: 0};

window.addEventListener("mousemove", (pos) => {
    presMouse.x = pos.x;
    presMouse.y = pos.y;
});

const speed = 0.2;
let currentScale = 0;

function tick() {
    circle.x += (presMouse.x - circle.x) * speed;
    circle.y += (presMouse.y - circle.y) * speed;

    const circleTranslate = `translate(${circle.x}px, ${circle.y}px)`;

    // Sqeeze (1.5, 0.5)
    const distanceX = presMouse.x - prevMouse.x;
    const distanceY = presMouse.y - prevMouse.y;
    
    const deltaMouse = Math.min(Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)), 50);
    const scaleValue = (deltaMouse * 4 / 200) * 0.5;
    currentScale += (scaleValue - currentScale) * speed;

    const circleScale = `scale(${1 + currentScale}, ${1 - currentScale})`;

    // Rotation
    const angle = Math.atan2(distanceY, distanceX) * 180 / Math.PI;
    const circleRotate = `rotate(${angle}deg)`;

    // updating previous mouse coords
    prevMouse.x = presMouse.x;
    prevMouse.y = presMouse.y;

    // apply all styles to circleElement
    circleElement.style.transform = `${circleTranslate} ${circleRotate} ${circleScale}`; 

    window.requestAnimationFrame(tick);
}

tick();
