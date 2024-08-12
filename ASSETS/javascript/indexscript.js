const header = document.querySelector("header");
window.addEventListener ("scroll", function() {
	header.classList.toggle ("sticky", window.scrollY > 100);
});

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navlist.classList.toggle('open');
};

window.onscroll = () => {
	menu.classList.remove('bx-x');
	navlist.classList.remove('open');
};



// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions to cover the whole page
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Add an event listener to resize the canvas when the window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Define the circle properties
const circleCount = 20;
const circleRadius = 5;
const circleSpeed = 2;
const circleColor = '#F57E20';

// Create an array to store the circle objects
const circles = [];

// Function to create a new circle object
function createCircle() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const vx = Math.random() * circleSpeed - circleSpeed / 2;
    const vy = Math.random() * circleSpeed - circleSpeed / 2;
    return { x, y, vx, vy };
}

// Function to update the circle positions
function updateCircles() {
    for (let i = 0; i < circleCount; i++) {
        const circle = circles[i];
        circle.x += circle.vx;
        circle.y += circle.vy;

        // Boundary checking
        if (circle.x + circleRadius > canvas.width || circle.x - circleRadius < 0) {
            circle.vx = -circle.vx;
        }
        if (circle.y + circleRadius > canvas.height || circle.y - circleRadius < 0) {
            circle.vy = -circle.vy;
        }
    }
}

// Function to draw the circles
function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < circleCount; i++) {
        const circle = circles[i];
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = circleColor;
        ctx.fill();
    }
}

// Initialize the circles array
for (let i = 0; i < circleCount; i++) {
    circles.push(createCircle());
}

// Animation loop
function animate() {
    updateCircles();
    drawCircles();
    requestAnimationFrame(animate);
}

animate();