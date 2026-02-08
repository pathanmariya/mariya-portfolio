
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  function smoothScrollToTop() {
    const start = window.pageYOffset;
    const duration = 750; // 👈 faster response (best balance)
    const startTime = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeOutQuart(progress);

      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      } else {
        // 🔥 tiny bounce effect
        bounceTop();
      }
    }

    requestAnimationFrame(scrollStep);
  }

  function bounceTop() {
    let bounce = 12; // bounce height
    let direction = -1;

    const bounceAnim = setInterval(() => {
      window.scrollBy(0, bounce * direction);
      bounce -= 3;

      if (bounce <= 0) {
        clearInterval(bounceAnim);
        window.scrollTo(0, 0);
      }
    }, 16);
  }

  backToTop.addEventListener("click", smoothScrollToTop);


const dot = document.createElement("div");
const circle = document.createElement("div");

dot.className = "custom-cursor-dot";
circle.className = "custom-cursor-circle";

document.body.append(circle, dot);

let mouseX = 0, mouseY = 0;
let circleX = 0, circleY = 0;
let lastX = 0, lastY = 0;

// Mouse tracking
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

// Animation loop
function animate() {
  // Velocity
  const dx = mouseX - lastX;
  const dy = mouseY - lastY;
  const speed = Math.min(Math.sqrt(dx*dx + dy*dy) / 10, 1.5);

  circleX += (mouseX - circleX) * 0.08;
  circleY += (mouseY - circleY) * 0.08;

  circle.style.transform =
    `translate(${circleX}px, ${circleY}px) scale(${1 + speed * 0.15})`;

  lastX = mouseX;
  lastY = mouseY;

  requestAnimationFrame(animate);
}
animate();

/* CONTEXT AWARE INTERACTIONS */
const CTA = document.querySelectorAll(".btn, .cta-btn");
const cards = document.querySelectorAll(".service-card, .process-card, .why-card");
const text = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span");

CTA.forEach(el => {
  el.addEventListener("mouseenter", () =>
    document.body.classList.add("cursor-cta")
  );
  el.addEventListener("mouseleave", () =>
    document.body.classList.remove("cursor-cta")
  );
});

cards.forEach(el => {
  el.addEventListener("mouseenter", () =>
    document.body.classList.add("cursor-card")
  );
  el.addEventListener("mouseleave", () =>
    document.body.classList.remove("cursor-card")
  );
});

text.forEach(el => {
  el.addEventListener("mouseenter", () =>
    document.body.classList.add("cursor-text")
  );
  el.addEventListener("mouseleave", () =>
    document.body.classList.remove("cursor-text")
  );
});

/* SECTION AWARE CURSOR */

const sectionMap = [
  { id: "about", className: "cursor-about" },
  { id: "services", className: "cursor-services" },
  { id: "process", className: "cursor-process" },
  { id: "contact", className: "cursor-contact" }
];

sectionMap.forEach(sec => {
  const el = document.getElementById(sec.id);
  if (!el) return;

  el.addEventListener("mouseenter", () => {
    document.body.classList.add(sec.className);
  });

  el.addEventListener("mouseleave", () => {
    document.body.classList.remove(sec.className);
  });
});

const footer = document.querySelector(".dg-footer");

if (footer) {
  footer.addEventListener("mouseenter", () => {
    document.body.classList.add("cursor-contact");
  });
  footer.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-contact");
  });
}
