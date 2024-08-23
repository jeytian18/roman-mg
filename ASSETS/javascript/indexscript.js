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

// scroll cards
document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const wrapper = document.querySelector(".wrapper");

    const firstCard = carousel.querySelector(".s-card");
    const firstCardWidth = firstCard.offsetWidth;

    let isDragging = false,
        startX,
        startScrollLeft,
        timeoutId;

    const dragStart = (e) => { 
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragging) return;
    
        // Calculate the new scroll position
        const newScrollLeft = startScrollLeft - (e.pageX - startX);
    
        // Check if the new scroll position exceeds 
        // the carousel boundaries
        if (newScrollLeft <= 0 || newScrollLeft >= 
            carousel.scrollWidth - carousel.offsetWidth) {
            
            // If so, prevent further dragging
            isDragging = false;
            return;
        }
    
        // Otherwise, update the scroll position of the carousel
        carousel.scrollLeft = newScrollLeft;
    };

    const dragStop = () => {
        isDragging = false; 
        carousel.classList.remove("dragging");
    };

    const autoPlay = () => {
    
        // Return if window is smaller than 800
        if (window.innerWidth < 800) return; 
        
        // Calculate the total width of all cards
        const totalCardWidth = carousel.scrollWidth;
        
        // Calculate the maximum scroll position
        const maxScrollLeft = totalCardWidth - carousel.offsetWidth;
        
        // If the carousel is at the end, stop autoplay
        if (carousel.scrollLeft >= maxScrollLeft) return;
        
        // Autoplay the carousel after every 2500ms
        timeoutId = setTimeout(() => 
            carousel.scrollLeft += firstCardWidth, 2500);
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    wrapper.addEventListener("mouseenter", () => 
        clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);

    // Add event listeners for the arrow buttons to 
    // scroll the carousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ? 
                -firstCardWidth : firstCardWidth;
        });
    });
});
