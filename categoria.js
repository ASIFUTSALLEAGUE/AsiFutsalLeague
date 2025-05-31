
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get("categoria");
  const nome = document.getElementById("nome-categoria");
  const anno = document.getElementById("anno-categoria");
  const pulsanti = document.getElementById("pulsanti-categoria");

  if (!categoria || !pulsanti) return;

  const [titolo, ...anni] = categoria.split(/ (?=\d{4})/);
  nome.textContent = titolo;
  anno.textContent = anni.join(" ") || "";

  const pagine = [
    { file: "gironi.html", label: "📂 Gironi" },
    { file: "calendario.html", label: "📅 Calendario" },
    { file: "classifica.html", label: "📊 Classifica" },
    { file: "marcatori.html", label: "🎯 Marcatori" },
    { file: "giocatori.html", label: "🏅 Miglior Giocatore" },
    { file: "portieri.html", label: "🧤 Miglior Portiere" },
    { file: "statistiche.html", label: "📈 Statistiche" }
  ];

  pagine.forEach(p => {
    const btn = document.createElement("a");
    btn.href = `${p.file}?categoria=${encodeURIComponent(categoria)}`;
    btn.className = "squadra-button";
    btn.textContent = p.label;
    pulsanti.appendChild(btn);
  });
});
