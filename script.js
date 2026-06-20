const hiddenImage = document.getElementById("hiddenImage");
const navbar = document.getElementById("navbar")

window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;

    // control how fast circle grows
    let maxScroll = window.innerHeight; 
    let progress = scrollY / maxScroll;

    // limit progress between 0 and 1
    progress = Math.min(Math.max(progress, 0), 1);

    // circle size (adjust multiplier for effect intensity)
    let circleSize = progress * 150; 

    hiddenImage.style.clipPath = `circle(${circleSize}% at 50% 50%)`;
});

document.addEventListener("scroll" , () => {
    if(window.scrollY >= 50){
        navbar.style.backgroundColor = "black"
        // navbar.style.boxShadow = "0px 1px 0px #7548FA"
    }else{
        navbar.style.backgroundColor = "transparent"
        // navbar.style.boxShadow = "none"
    }
})

const container = document.getElementById("glowContainer");
const dots = container.querySelectorAll(".glow-dot");
const items = document.querySelectorAll(".about-item");

let path = [];

items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const parentRect = item.parentElement.getBoundingClientRect();

    let x = rect.left - parentRect.left;
    let y = rect.top - parentRect.top;

    let w = rect.width;
    let h = rect.height;

    // TOP border
    if (item.dataset.top === "purple") {
        path.push({ x: x, y: y });
        path.push({ x: x + w, y: y });
    }

    // RIGHT border
    if (item.dataset.right === "purple") {
        path.push({ x: x + w, y: y });
        path.push({ x: x + w, y: y + h });
    }

    // BOTTOM border
    if (item.dataset.bottom === "purple") {
        path.push({ x: x + w, y: y + h });
        path.push({ x: x, y: y + h });
    }

    // LEFT border
    if (item.dataset.left === "purple") {
        path.push({ x: x, y: y + h });
        path.push({ x: x, y: y });
    }
});

let i = 0;
let trailPositions = new Array(dots.length).fill({ x: 0, y: 0 });

function animate() {
    if (i >= path.length - 1) i = 0;

    let start = path[i];
    let end = path[i + 1];

    let progress = 0;

    function move() {
        progress += 0.01;

        let x = start.x + (end.x - start.x) * progress;
        let y = start.y + (end.y - start.y) * progress;

        // Trail logic
        trailPositions.unshift({ x, y });
        trailPositions.pop();

        dots.forEach((dot, index) => {
            let pos = trailPositions[index];
            dot.style.left = `${pos.x}px`;
            dot.style.top = `${pos.y}px`;
        });

        if (progress < 1) {
            requestAnimationFrame(move);
        } else {
            i++;
            animate();
        }
    }

    move();
}

window.onload = () => {
    animate();
};

const section = document.querySelector(".steps-involved-bottom-section");
const purpleImage = document.querySelector(".purple-steps-image");
const cursor = document.getElementById("customCursor");

let isInside = false;

// Show custom cursor
section.addEventListener("mouseenter", () => {
    cursor.style.display = "block";
    isInside = true;
});

// Hide cursor + reset effect
section.addEventListener("mouseleave", () => {
    cursor.style.display = "none";
    isInside = false;

    // Reset reveal
    purpleImage.style.clipPath = "circle(0px at 50% 50%)";
});

// Mouse move inside section
section.addEventListener("mousemove", (e) => {
    if (!isInside) return;

    const rect = section.getBoundingClientRect();

    // Cursor position inside section
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Move custom cursor (global position)
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    // Reveal purple image at cursor
    purpleImage.style.clipPath = `circle(120px at ${x}px ${y}px)`;
});

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const speed = 0.08; // smoothness (lower = smoother)

    function animate() {
        currentX += (targetX - currentX) * speed;
        currentY += (targetY - currentY) * speed;

        card.style.transform = `rotate(var(--rotate)) translate(${currentX}px, ${currentY}px)`;

        requestAnimationFrame(animate);
    }

    // Store original transform (rotation + position)
    card.dataset.baseTransform = getComputedStyle(card).transform === "none"
        ? ""
        : getComputedStyle(card).transform;

    animate();

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        targetX = (x - rect.width / 2) / 5;
        targetY = (y - rect.height / 2) / 5;
    });

    card.addEventListener("mouseleave", () => {
        targetX = 0;
        targetY = 0;
    });
});




const faqCards = document.querySelectorAll(".faq-card");

faqCards.forEach(card => {
    card.addEventListener("click", () => {

        const isActive = card.classList.contains("active");

        // Close all first
        faqCards.forEach(c => c.classList.remove("active"));

        // If it was NOT active → open it
        if (!isActive) {
            card.classList.add("active");
        }
        // If it WAS active → do nothing (it stays closed)

    });
});


let menuIcon = document.getElementById("menuIcon");
let sideMenu = document.getElementById("sideMenu");
let closeIcon = document.getElementById("closeIcon");

menuIcon.addEventListener("click" , () => {
    sideMenu.style.right = "0%"
})
closeIcon.addEventListener("click" , () => {
    sideMenu.style.right = "-100%"
})


let workflowImage = document.getElementById("workflowImage");
function updateImage() {
    if (window.innerWidth <= 600) {
        workflowImage.src = "./images/workflow-sm.png";
    } else {
        workflowImage.src = "./images/workflow.png";
    }
}

// Run on page load
updateImage();

// Run on screen resize
window.addEventListener("resize", updateImage);



