
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get("categoria");

  if (categoria) {
    const match = categoria.match(/^(.*?)(\d{4}-\d{2})$/);
    if (match) {
      document.getElementById("categoria-nome").textContent = match[1].trim().toUpperCase();
      document.getElementById("categoria-anno").textContent = match[2];
    } else {
      document.getElementById("categoria-nome").textContent = categoria.toUpperCase();
      document.getElementById("categoria-anno").textContent = "";
    }

    document.getElementById("link-gironi").href = `gironi.html?categoria=${encodeURIComponent(categoria)}`;
    document.getElementById("link-calendario").href = `calendario.html?categoria=${encodeURIComponent(categoria)}`;
    document.getElementById("link-classifica").href = `classifica.html?categoria=${encodeURIComponent(categoria)}`;
    document.getElementById("link-marcatori").href = `marcatori.html?categoria=${encodeURIComponent(categoria)}`;
    document.getElementById("link-portieri").href = `portieri.html?categoria=${encodeURIComponent(categoria)}`;
    document.getElementById("link-giocatori").href = `giocatori.html?categoria=${encodeURIComponent(categoria)}`;
  }
});
