// Modal pencere + yumuşak sayfa geçişi
function openModal(href, title) {
  var modal = document.getElementById("modal");
  var frame = document.getElementById("modal-frame");
  var titleEl = document.getElementById("modal-title");
  if (!modal || !frame) { window.location.href = href; return; }
  frame.src = href;
  if (titleEl) titleEl.textContent = title || "İşlem";
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  var modal = document.getElementById("modal");
  var frame = document.getElementById("modal-frame");
  if (!modal) return;
  modal.classList.remove("open");
  document.body.style.overflow = "";
  if (frame) frame.src = "about:blank";
  // bakiye değişmiş olabilir, ana sayfayı tazele
  if (typeof init === "function") { try { init(); } catch (e) {} }
}

document.addEventListener("click", function (e) {
  // Modal kapatma
  if (e.target.closest("[data-close-modal]")) { closeModal(); return; }
  if (e.target.classList && e.target.classList.contains("modal")) { closeModal(); return; }

  var a = e.target.closest('a[href$=".html"]');
  if (!a) return;
  var href = a.getAttribute("href");
  if (!href || href.startsWith("#")) return;

  // Ana sayfadaki data-modal linkler pencere olarak açılır
  if (a.hasAttribute("data-modal")) {
    e.preventDefault();
    var card = a.querySelector("strong");
    openModal(href, card ? card.textContent : "İşlem");
    return;
  }

  e.preventDefault();
  document.body.classList.add("leaving");
  setTimeout(function () { window.location.href = href; }, 180);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});
