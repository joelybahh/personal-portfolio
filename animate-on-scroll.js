window.addEventListener("load", () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  setTimeout(() => {
    if (window.location.hash) {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        // Use scrollIntoView with behavior 'smooth' to emulate the native smooth scrolling
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, 0); // You can adjust or remove the timeout as necessary
});
document.addEventListener("DOMContentLoaded", () => {
  const listItems = document.querySelectorAll(".course-list-item");

  //delay the animation by 200 ms

  setTimeout(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("course-list-item-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.08,
      }
    );

    listItems.forEach((item) => {
      observer.observe(item);
    });
  }, 200);
});
