
document.addEventListener("DOMContentLoaded", () => {
  const categoria = decodeURIComponent(new URLSearchParams(location.search).get("categoria"));
  const div = document.getElementById("portieri");
  if (!categoria || !div) return;

  fetch("dati.json")
    .then(res => res.json())
    .then(dati => {
      const lista = dati[categoria]?.classificaPortieri || [];
      const squadre = dati[categoria]?.squadre || [];
      const getLogo = nome => {
        const s = squadre.find(el => el.nome === nome);
        return s && s.logo ? "<img src='" + s.logo + "' class='logo-squadra'>" : "";
      };

      if (!lista.length) {
        div.innerHTML = "<div class='empty-msg'>⚠️ Nessun dato disponibile.</div>";
        return;
      }

      let html = "<table><thead><tr><th>Portiere</th><th>Squadra</th><th>Voti</th></tr></thead><tbody>";
      lista.sort((a, b) => b.voti - a.voti).forEach(info => {
        html += "<tr><td>" + info.nome + "</td><td>" + getLogo(info.squadra) + " " + info.squadra + "</td><td>" + info.voti + "</td></tr>";
      });
      html += "</tbody></table>";
      div.innerHTML = html;
    });
});
