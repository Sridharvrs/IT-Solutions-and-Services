
document.querySelectorAll(".nc-value-flip").forEach((card) => {
  card.addEventListener("click", () => {
    const isFlipped = card.getAttribute("aria-pressed") === "true";

    card.setAttribute("aria-pressed", String(!isFlipped));
  });
});
