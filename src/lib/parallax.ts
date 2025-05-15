
/**
 * A utility function to apply parallax effect to an element
 * @param element The element to apply the parallax effect to
 * @param speed The speed of the parallax effect (positive values move the element down, negative values move it up)
 */
export const applyParallax = (element: HTMLElement | null, speed: number = 0.5) => {
  if (!element) return;
  
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    element.style.transform = `translateY(${scrollPosition * speed}px)`;
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // Initial position
  handleScroll();
  
  // Return cleanup function
  return () => window.removeEventListener('scroll', handleScroll);
};

/**
 * Utility function to handle scroll reveal animations for multiple sections
 * @param sectionRefs Array of refs to the sections that should be animated on scroll
 */
export const handleScrollReveal = (sectionRefs: (HTMLElement | null)[]) => {
  const handleScroll = () => {
    sectionRefs.forEach(section => {
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;
      
      if (isVisible) {
        section.classList.add('is-visible');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  
  // Initial check for elements already in viewport
  handleScroll();
  
  // Return cleanup function
  return () => window.removeEventListener('scroll', handleScroll);
};
