const categoryButtons = document.querySelectorAll("[data-filter]");
const postCards = document.querySelectorAll("[data-post-category]");
const emptyState = document.querySelector("[data-empty-state]");

if (categoryButtons.length && postCards.length) {
  const updateVisibility = (selectedCategory) => {
    let visibleCount = 0;

    postCards.forEach((card) => {
      const category = card.getAttribute("data-post-category");
      const shouldShow =
        selectedCategory === "All" || category === selectedCategory;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  };

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.getAttribute("data-filter") || "All";

      categoryButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      updateVisibility(selectedCategory);
    });
  });

  updateVisibility("All");
}
