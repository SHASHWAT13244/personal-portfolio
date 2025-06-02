// ========== Three.js 3D Cube Setup ==========
const container = document.getElementById('cube-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Cube geometry and material with pastel colors on each face
const geometry = new THREE.BoxGeometry();

const materials = [
  new THREE.MeshBasicMaterial({ color: '#6c63ff' }), // violet
  new THREE.MeshBasicMaterial({ color: '#a79cff' }), // light purple
  new THREE.MeshBasicMaterial({ color: '#d6ccff' }), // lavender
  new THREE.MeshBasicMaterial({ color: '#b8b3ff' }), // soft blue-purple
  new THREE.MeshBasicMaterial({ color: '#c7c1ff' }), // pale purple
  new THREE.MeshBasicMaterial({ color: '#4834d4' })  // deep violet
];

const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// Responsive resize for the renderer
window.addEventListener('resize', () => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Animate cube rotation with GSAP
gsap.to(cube.rotation, {
  y: "+=6.283", // 1 full rotation (2π)
  duration: 20,
  repeat: -1,
  ease: "linear"
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// ========== GSAP Scroll Animations ==========
gsap.registerPlugin(ScrollTrigger);

gsap.from('header .intro-text', {
  opacity: 0,
  y: 50,
  duration: 1.2,
  ease: 'power2.out',
  delay: 0.3
});

gsap.utils.toArray('.section').forEach(section => {
  gsap.from(section.querySelector('h2'), {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });

  gsap.from(section.querySelectorAll('ul, .project, form, .icons'), {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    stagger: 0.15,
  });
});

// ========== Light/Dark Mode Toggle ==========
const toggleBtn = document.getElementById('toggle-theme');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    toggleBtn.textContent = '☀️';
  } else {
    toggleBtn.textContent = '🌙';
  }
});

// ========== Contact Form Submit Handler ==========
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thanks for reaching out! I will get back to you soon.');
  form.reset();
});

// ====== Certificate Modal Preview ======
const modal = document.getElementById("certModal");
const iframe = document.getElementById("certFrame");
const closeBtn = document.querySelector(".modal .close");

document.querySelectorAll('.cert-card a, .cert-subcard a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    iframe.src = href;
    modal.style.display = "block";
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
  iframe.src = "";
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    iframe.src = "";
  }
};

// ====== GSAP Scroll Animation for Certifications ======
gsap.from(".cert-card, .cert-subcard", {
  scrollTrigger: {
    trigger: "#certifications",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  y: 40,
  duration: 1,
  ease: "power2.out",
  stagger: 0.2,
});

// ====== Toggle Infosys collapsible section ======
document.querySelectorAll('.collapse-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    const isOpen = content.classList.contains('show');

    if (isOpen) {
      content.classList.remove('show');
      button.textContent = 'Infosys Springboard Certificates ⌄';
    } else {
      content.classList.add('show');
      button.textContent = 'Infosys Springboard Certificates ⌃';
    }
  });
});
