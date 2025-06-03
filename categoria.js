
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const categoria = urlParams.get("categoria");
  const categoriaElement = document.getElementById("titolo-categoria");
  if (categoriaElement && categoria) {
    const parts = categoria.split(" ");
    const nome = parts.slice(0, -1).join(" ");
    const anno = parts.slice(-1)[0];
    categoriaElement.innerHTML = nome + "<br><span class='anno'>" + anno + "</span>";
  }

  const buttons = {
    "Calendario": "calendario.html",
    "Classifica": "classifica.html",
    "Gironi": "gironi.html",
    "Marcatori": "marcatori.html",
    "Classifica Miglior Giocatore": "giocatori.html",
    "Classifica Miglior Portiere": "classifica-portieri.html",
    "Statistiche": "statistiche.html"
  };

  const container = document.getElementById("pulsanti-container");
  if (!container) return;

  Object.entries(buttons).forEach(([text, link]) => {
    const btn = document.createElement("a");
    btn.className = "squadra-button";
    btn.textContent = text;
    btn.href = link + "?categoria=" + encodeURIComponent(categoria);
    container.appendChild(btn);
  });
});
