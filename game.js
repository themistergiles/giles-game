// Import necessary Three.js elements
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// User Cube
const userGeometry = new THREE.BoxGeometry(1, 1, 1);
const userMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const userCube = new THREE.Mesh(userGeometry, userMaterial);
scene.add(userCube);

// Platform Generation
let platforms = [];
let platformDistance = 10;
let platformWidth = 2;
let currentY = 0;

// Function to generate random platforms
function generatePlatform() {
    const platformGeometry = new THREE.BoxGeometry(platformWidth, 0.1, platformWidth);
    const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.set(
        Math.random() > 0.5 ? Math.random() * 10 : -Math.random() * 10, // Randomly left or right
        currentY + platformDistance,
        0
    );
    platforms.push(platform);
    scene.add(platform);
}

// Movement logic for the cube
let moveSpeed = 0.1;
let moveDirection = 0; // -1 = Left, 1 = Right
document.addEventListener('keydown', (e) => {
    if (e.key === 'a') {
        moveDirection = -1;
    } else if (e.key === 'ArrowRight') {
        moveDirection = 1;
    }
});

// Camera position
camera.position.z = 20;
camera.position.y = 5;
camera.position.x = 0;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update Cube Position
    if (moveDirection !== 0) {
        userCube.position.x += moveDirection * moveSpeed;
    }

    // Generate platforms at intervals
    if (platforms.length === 0 || platforms[platforms.length - 1].position.y - userCube.position.y < platformDistance) {
        generatePlatform();
    }

    // Update camera to follow the user
    camera.position.y = userCube.position.y + 5;
    camera.position.x = userCube.position.x;
    
    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation
animate();
