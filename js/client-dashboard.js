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

let n = 1047;
$("#tf").onsubmit = (e) => {
  e.preventDefault();
  $("#tkt tbody").insertAdjacentHTML(
    "afterbegin",
    `<tr><td>#${++n}</td><td>${$("#ts").value}</td><td>${$("#tp").value}</td><td><span class="pl in">Open</span></td><td>Just now</td></tr>`,
  );
  e.target.reset();
  toast("Ticket #" + n + " created");
};
document.addEventListener("click", (e) => {
  const t = e.target;
  if (t.matches(".pay")) {
    t.closest("tr").children[3].innerHTML = '<span class="pl ok">Paid</span>';
    t.replaceWith("—");
    toast("Payment successful");
  }
  if (t.matches(".req")) {
    $("#rq").insertAdjacentHTML(
      "beforeend",
      `<li><span class="dt"></span><div><b>${t.dataset.s}</b><br><small>Awaiting quote</small></div></li>`,
    );
    toast("Request sent: " + t.dataset.s);
  }
});
const rp = [
  "Thanks, checking that now.",
  "I can see the issue on our monitor.",
  "A fix is being applied. Please retry in 2 minutes.",
];
let ri = 0;
$("#cf").onsubmit = (e) => {
  e.preventDefault();
  const b = $("#cb");
  b.insertAdjacentHTML("beforeend", `<p class="m me">${$("#ci").value}</p>`);
  e.target.reset();
  setTimeout(() => {
    b.insertAdjacentHTML("beforeend", `<p class="m">${rp[ri++ % 3]}</p>`);
    b.scrollTop = 1e5;
  }, 900);
};
setInterval(() => {
  $("#lat").textContent = 38 + Math.round(Math.random() * 12);
}, 2500);
