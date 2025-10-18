export const initScrollAnimations = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
  });
};

export const initHoverEffects = () => {
  document.querySelectorAll('[data-hover]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      el.classList.add('hover-active');
    });
    el.addEventListener('mouseleave', () => {
      el.classList.remove('hover-active');
    });
  });
};
