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
