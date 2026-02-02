
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
