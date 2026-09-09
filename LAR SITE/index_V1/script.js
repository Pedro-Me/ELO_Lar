document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  menuToggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal, .reveal-left").forEach(el => observer.observe(el));

  // Animated counters
  const counters = document.querySelectorAll(".counter[data-target]");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      const suffix = el.dataset.suffix || "";
      let start = 0;
      const duration = 1100;
      const startTime = performance.now();

      const step = now => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        start = Math.floor(target * eased);
        el.textContent = `${start}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach(el => counterObserver.observe(el));

  // Testimonials carousel
  const carousel = document.querySelector("[data-carousel]");
  if (carousel) {
    const slides = [...carousel.querySelectorAll(".testimonial-slide")];
    const dots = [...carousel.querySelectorAll(".carousel-dots .dot")];
    const prev = carousel.querySelector(".prev");
    const next = carousel.querySelector(".next");
    let current = 0;
    let timer;

    const show = index => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === current));
    };

    const restart = () => {
      clearInterval(timer);
      timer = setInterval(() => show(current + 1), 6000);
    };

    prev?.addEventListener("click", () => { show(current - 1); restart(); });
    next?.addEventListener("click", () => { show(current + 1); restart(); });
    dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i); restart(); }));

    show(0);
    restart();
  }

  // Copy Pix
  const copyButton = document.getElementById("copyPix");
  const pix = document.getElementById("pixKey");
  copyButton?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pix.textContent.trim());
      copyButton.textContent = "Copiado!";
      setTimeout(() => (copyButton.textContent = "Copiar chave"), 1600);
    } catch {
      copyButton.textContent = "Copie manualmente";
    }
  });
});
