
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];

const lk = $("#lk"),
  bg = $("#bg");

// ===== MOBILE MENU =====
const shut = () => {
  if (lk) lk.classList.remove("open");
  if (bg) bg.classList.remove("x");
};

if (bg) {
  bg.onclick = () => {
    lk.classList.toggle("open");
    bg.classList.toggle("x");
  };
}

$$("#lk a").forEach((a) => (a.onclick = shut));

// ===== LOGIN REDIRECT =====
$$("[data-login]").forEach((b) => {
  b.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./login.html";
  });
});

// ===== SCROLL REVEAL =====
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.15 },
);

$$(".rv").forEach((e) => io.observe(e));

// ===== SCROLL PROGRESS =====
onscroll = () => {
  const bar = $("#bar");

  if (bar) {
    const total = document.body.scrollHeight - innerHeight;
    bar.style.width =
      (total > 0 ? (scrollY / total) * 100 : 0) + "%";
  }
};

// ===== MOUSE GLOW =====
onmousemove = (e) => {
  const g = $("#glow");

  if (g) {
    g.style.left = e.clientX + "px";
    g.style.top = e.clientY + "px";
  }
};

// ===== CARD TILT =====
$$(".tilt").forEach((c) => {
  c.onmousemove = (e) => {
    const r = c.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;

    c.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
  };

  c.onmouseleave = () => (c.style.transform = "");
});

// ===== COUNTER ANIMATION =====
$$("[data-n]").forEach((el) =>
  new IntersectionObserver((es, o) => {
    if (es[0].isIntersecting) {
      const n = +el.dataset.n;
      let i = 0;

      const t = setInterval(() => {
        i += n / 60;

        if (i >= n) {
          i = n;
          clearInterval(t);
        }

        el.textContent = Math.round(i) + (el.dataset.s || "");
      }, 25);

      o.disconnect();
    }
  }).observe(el),
);

// ===== NETWORK CANVAS ANIMATION =====
const cv = $("#net");

if (cv) {
  const c = cv.getContext("2d");

  let W,
    H,
    P = [];

  const rs = () => {
    W = cv.width = cv.offsetWidth;
    H = cv.height = cv.offsetHeight;

    P = Array.from({ length: Math.min(70, W / 14) }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: Math.random() - 0.5,
      vy: Math.random() - 0.5,
    }));
  };

  rs();

  addEventListener("resize", rs);

  (function f() {
    c.clearRect(0, 0, W, H);

    P.forEach((p, i) => {
      p.x = (p.x + p.vx + W) % W;
      p.y = (p.y + p.vy + H) % H;

      c.fillStyle = "#00e5ff";
      c.fillRect(p.x, p.y, 2.5, 2.5);

      for (let j = i + 1; j < P.length; j++) {
        const q = P[j],
          ds = Math.hypot(p.x - q.x, p.y - q.y);

        if (ds < 120) {
          c.strokeStyle = `rgba(0,229,255,${1 - ds / 120})`;
          c.beginPath();
          c.moveTo(p.x, p.y);
          c.lineTo(q.x, q.y);
          c.stroke();
        }
      }
    });

    requestAnimationFrame(f);
  })();
}
