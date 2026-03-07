const elements = [...document.querySelectorAll('.reveal')];
const rootElements = elements.filter((element) => !element.parentElement?.closest('.reveal'));
const prefersReducedMotion =
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  elements.forEach((element) => {
    element.classList.add('in-view');
  });
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const nestedElements = entry.target.querySelectorAll('.reveal');

        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          nestedElements.forEach((nestedElement) => nestedElement.classList.add('in-view'));
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px',
      threshold: 0.08,
    }
  );

  rootElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 55, 420)}ms`;
    observer.observe(element);
  });
}
