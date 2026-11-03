document.querySelectorAll(".tabs button").forEach(
  (b) =>
    (b.onclick = () => {
      document
        .querySelectorAll(".tabs button,.pn")
        .forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      document.getElementById("pn" + b.dataset.t).classList.add("on");
    }),
);



/* ===== PREMIUM SERVICE TABS ===== */
const serviceTabs = document.querySelectorAll(
  '.nc-focus-tabs button'
);

const servicePanels = document.querySelectorAll(
  '.nc-focus .pn'
);

serviceTabs.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedId = `pn${button.dataset.t}`;

    serviceTabs.forEach((tab) => {
      const active = tab === button;

      tab.classList.toggle('on', active);
      tab.setAttribute('aria-selected', String(active));
    });

    servicePanels.forEach((panel) => {
      const active = panel.id === selectedId;

      panel.classList.toggle('on', active);
      panel.hidden = !active;
    });
  });
});
