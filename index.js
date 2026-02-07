
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


// Create cursor elements
const dot = document.createElement("div");
const circle = document.createElement("div");

dot.className = "custom-cursor-dot";
circle.className = "custom-cursor-circle";

document.body.appendChild(circle);
document.body.appendChild(dot);

// Mouse positions
let mouseX = 0;
let mouseY = 0;

// Circle positions (alag rakhe for delay)
let circleX = 0;
let circleY = 0;

// DOT = instant move
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  dot.style.left = mouseX + "px";
  dot.style.top = mouseY + "px";
});

// CIRCLE = delayed smooth follow
function animate() {
  circleX += (mouseX - circleX) * 0.08; // 👈 delay control (LOW = more delay)
  circleY += (mouseY - circleY) * 0.08;

  circle.style.left = circleX + "px";
  circle.style.top = circleY + "px";

  requestAnimationFrame(animate);
}

animate();

