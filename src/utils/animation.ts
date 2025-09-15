import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = () => {
  // Check if animations should be reduced
  const shouldReduce = document.documentElement.classList.contains('reduce-animations');
  if (shouldReduce) {
    console.log('Animations are disabled, skipping scroll animations');
    return;
  }
  
  // Animate sections when they come into view
  const sections = document.querySelectorAll('section');
  
  sections.forEach((section) => {
    const heading = section.querySelector('h2');
    const content = section.querySelectorAll('p, .grid');
    
    if (heading) {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
    
    if (content.length > 0) {
      gsap.fromTo(
        content,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });
  
  // Animate CTA buttons with a pulse effect
  const ctaButtons = document.querySelectorAll('.cta-pulse');
  ctaButtons.forEach((button) => {
    gsap.to(button, {
      scale: 1.05,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  });
};

export const animateCounter = (element: HTMLElement, target: number, duration: number = 2) => {
  let start = 0;
  const increment = target / 100;
  const updateCounter = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.ceil(start).toString();
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toString();
    }
  };
  
  updateCounter();
};

export const initHoverEffects = () => {
  const cards = document.querySelectorAll('.hover-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)',
        borderColor: 'rgba(59, 130, 246, 0.4)',
        duration: 0.3
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        duration: 0.3
      });
    });
  });
};