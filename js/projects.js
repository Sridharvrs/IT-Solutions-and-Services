document.querySelectorAll(".fl button").forEach(
  (b) =>
    (b.onclick = () => {
      document
        .querySelectorAll(".fl button")
        .forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      document
        .querySelectorAll(".pic")
        .forEach((c) =>
          c.classList.toggle(
            "hide",
            b.dataset.f != "all" && c.dataset.c != b.dataset.f,
          ),
        );
    }),
);
