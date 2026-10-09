// Sayfalar arası yumuşak geçiş
document.addEventListener("click", function (e) {
  var a = e.target.closest('a[href$=".html"]');
  if (!a) return;
  var href = a.getAttribute("href");
  if (!href || href.startsWith("#")) return;
  e.preventDefault();
  document.body.classList.add("leaving");
  setTimeout(function () { window.location.href = href; }, 180);
});
