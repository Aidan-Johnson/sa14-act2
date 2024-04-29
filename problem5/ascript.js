const box = document.getElementById('box');
const animateButton = document.getElementById('animateButton');
let animating = false;
let originalPosition = { x: 0, y: 0 };

document.addEventListener('DOMContentLoaded', function() {
    const boxRect = box.getBoundingClientRect();
    originalPosition = { x: boxRect.left, y: boxRect.top };
});

animateButton.addEventListener('click', function() {
    if (!animating) {
        animateBox();
        animating = true;
        animateButton.textContent = 'Reset';
    } else {
        reset();
        animating = false;
        animateButton.textContent = 'Animate';
    }
});

function animateBox() {
    const screenWidth = window.innerWidth;
    const boxWidth = box.offsetWidth;
    const maxTargetX = screenWidth - boxWidth;
    const targetX = Math.min(maxTargetX, 200); 
    box.animate(
        [
            { transform: 'translateX(0)' },
            { transform: `translateX(${targetX}px)` }
        ],
        {
            duration: 1000,
            iterations: 1,
            fill: 'forwards',
            easing: 'ease'
        }
    );
}

function reset() {
    box.animate(
        [
            { transform: 'translateX(0)' },
            { transform: 'translateX(0)' }
        ],
        {
            duration: 1000,
            iterations: 1,
            fill: 'forwards',
            easing: 'ease'
        }
    );
}