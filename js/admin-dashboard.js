// Get the logged-in user
const currentUser = JSON.parse(
  localStorage.getItem("stacklyCurrentUser") ||
  sessionStorage.getItem("stacklyCurrentUser") ||
  "null"
);

if (currentUser?.name) {
  // Display dynamic name
  document.querySelectorAll(".profileName").forEach((element) => {
    element.textContent = currentUser.name;
  });

  // Display first letter in avatar
  const firstLetter = currentUser.name.trim().charAt(0).toUpperCase();

  document.querySelectorAll(".avatar").forEach((element) => {
    element.textContent = firstLetter;
  });
}

// ===========================================================================================================

$("#uf").onsubmit = (e) => {
  e.preventDefault();
  const n = $("#un").value,
    i = n
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  $("#ut tbody").insertAdjacentHTML(
    "afterbegin",
    `<tr><td><span class="ini">${i}</span> <b>${n}</b></td><td>New</td><td>${$("#ur").value}</td><td><span class="pl ok">Active</span></td><td><button class="bt s tgl">Toggle</button> <button class="bt s g del">Delete</button></td></tr>`,
  );
  e.target.reset();
  toast("User created: " + n);
};
document.addEventListener("click", (e) => {
  const t = e.target,
    r = t.closest("tr");
  if (t.matches(".tgl")) {
    const p = r.children[3].firstChild,
      on = p.textContent == "Active";
    p.textContent = on ? "Suspended" : "Active";
    p.className = "pl " + (on ? "er" : "ok");
    toast("User " + (on ? "suspended" : "activated"));
  }
  if (t.matches(".del")) {
    r.remove();
    toast("User deleted");
  }
  if (t.matches(".res")) {
    r.children[5].innerHTML = '<span class="pl ok">Resolved</span>';
    t.remove();
    toast("Ticket resolved");
  }
});
document.addEventListener("change", (e) => {
  if (e.target.matches(".as")) toast("Assigned to " + e.target.value);
});
setInterval(
  () =>
    $$(".srv").forEach((s) => {
      const c = Math.min(
          95,
          Math.max(
            10,
            +s.querySelector(".c").textContent +
              Math.round(Math.random() * 10 - 5),
          ),
        ),
        m = Math.min(
          95,
          Math.max(
            10,
            +s.querySelector(".r").textContent +
              Math.round(Math.random() * 6 - 3),
          ),
        );
      s.querySelector(".c").textContent = c;
      s.querySelector(".r").textContent = m;
      s.querySelector(".cp").style.width = c + "%";
      s.querySelector(".rp").style.width = m + "%";
    }),
  2500,
);
$("#tf2").onsubmit = (e) => {
  e.preventDefault();
  const c = $("#tc").value.trim(),
    t = $("#tm2"),
    o = {
      status: "All 11 servers online. Uptime 99.97%.",
      backup: "Backup job queued... done.",
      help: "Commands: status · restart web-01 · backup · clear",
    };
  let r =
    o[c] ||
    (c.startsWith("restart")
      ? "Restarting " + c.split(" ")[1] + "... OK"
      : "Unknown command");
  if (c == "clear") t.innerHTML = "";
  else t.insertAdjacentHTML("beforeend", `<p>$ ${c}</p><p>${r}</p>`);
  t.scrollTop = 1e5;
  e.target.reset();
};
const ev = [
  "Vikram restarted cache-01",
  "New ticket #2052 from MetroBank",
  "Backup policy verified",
  "Priya updated role permissions",
  "Login blocked: unusual region",
];
let k = 0;
setInterval(
  () =>
    $("#audit").insertAdjacentHTML(
      "afterbegin",
      `<li><span class="dt"></span><div><b>${ev[k++ % 5]}</b><br><small>just now</small></div></li>`,
    ),
  7000,
);
