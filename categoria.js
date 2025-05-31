
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get("categoria");

  if (categoria) {
    document.getElementById("titolo-categoria").textContent = categoria.toUpperCase();
    document.getElementById("link-gironi").href = `gironi.html?categoria=${encodeURIComponent(categoria)}`;
    document.getElementById("link-calendario").href = `calendario.html?categoria=${encodeURIComponent(categoria)}`;
    document.getElementById("link-classifica").href = `classifica.html?categoria=${encodeURIComponent(categoria)}`;
    document.getElementById("link-marcatori").href = `marcatori.html?categoria=${encodeURIComponent(categoria)}`;
    document.getElementById("link-portieri").href = `portieri.html?categoria=${encodeURIComponent(categoria)}`;
    document.getElementById("link-giocatori").href = `giocatori.html?categoria=${encodeURIComponent(categoria)}`;
  }
});
