// Smooth scroll with navbar offset for all links
const navbar = document.querySelector(".lava-navbar");
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener("click", function(e) {
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    e.preventDefault();

    // Get navbar height dynamically
    const navbarHeight = navbar.offsetHeight;

    // Calculate target position
    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    // Scroll smoothly
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

    // Close mobile nav if open
    const navbarCollapse = document.querySelector(".lava-navbar .collapse");
    if (window.innerWidth < 992 && navbarCollapse.classList.contains("show")) {
      document.querySelector(".lava-navbar .navbar-toggler")?.click();
    }
  });
});

// Smooth close sections start from the top, not halfway.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});
// Optional: Shrink navbar on scroll
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Mobile Services dropdown toggle
document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
  toggle.addEventListener("click", e => {
    if (window.innerWidth < 992) {
      // On mobile: just scroll to section, no dropdown
      const target = document.querySelector(toggle.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = document.querySelector(".lava-navbar").offsetHeight;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset + 5;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  });
});

// Intro Section
const canvas = document.getElementById("hero-bg-canvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const nodes = [];
const NODE_COUNT = 50;

// Create nodes
for (let i = 0; i < NODE_COUNT; i++) {
  nodes.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 2 + 1
  });
}

// Draw loop
function animate() {
  ctx.clearRect(0, 0, width, height);

  // Draw nodes
  nodes.forEach(node => {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;

    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff6600";
    ctx.fill();
  });

  // Draw lines between close nodes
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = "rgba(255,102,0," + (1 - dist / 150) + ")";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();

// Update canvas on resize
window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});


//Contact Section
function handleContactSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const company = document.getElementById('contact-company').value;
  const subject = document.getElementById('contact-subject').value;
  const message = document.getElementById('contact-message').value;
  
  const successMsg = document.getElementById('contactSuccessMsg');
  successMsg.classList.add('show');
  
  setTimeout(() => {
    successMsg.classList.remove('show');
  }, 4000);
  
  console.log({
    name,
    email,
    company,
    subject,
    message
  });
  
  event.target.reset();
}

function openContactLink(url) {
  if (url.startsWith('mailto:')) {
    window.location.href = url;
  } else {
    window.open(url, '_blank');
  }
}

