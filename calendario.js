
document.addEventListener("DOMContentLoaded", () => {
  const categoria = new URLSearchParams(window.location.search).get("categoria");
  const titolo = document.getElementById("titolo-categoria");
  const container = document.getElementById("contenuto-calendario");

  if (!categoria) {
    titolo.textContent = "Categoria non specificata";
    container.textContent = "Nessuna categoria indicata.";
    return;
  }

  titolo.textContent = "Calendario - " + categoria.toUpperCase();

  fetch("dati.json")
    .then(response => response.json())
    .then(data => {
      const partite = data[categoria]?.partite || [];
      const squadre = data[categoria]?.squadre || [];

      const getLogo = nome =>
        (squadre.find(s => s.nome === nome)?.logo) ?
        `<img src="\${squadre.find(s => s.nome === nome).logo}" class="logo-squadra">` : "";

      if (!partite.length) {
        container.innerHTML = "<div class='empty-msg'>⚠️ Calendario non presente.</div>";
        return;
      }

      let html = '<div class="calendario">';
      partite.forEach(p => {
        html += `
          <div class="partita">
            <strong>\${getLogo(p.squadraA)} \${p.squadraA}</strong> - 
            <strong>\${getLogo(p.squadraB)} \${p.squadraB}</strong>
            <br><small>\${p.data} ore \${p.orario} - \${p.campo}</small>
          </div>
        `;
      });
      html += '</div>';

      container.innerHTML = html;
    });
});
