
document.addEventListener("DOMContentLoaded", () => {
  const categoria = new URLSearchParams(window.location.search).get("categoria");
  const titolo = document.getElementById("titolo-categoria");
  const container = document.getElementById("contenuto-giocatori");

  if (!categoria) {
    titolo.textContent = "Categoria non specificata";
    container.textContent = "Nessuna categoria indicata.";
    return;
  }

  titolo.textContent = "Classifica Miglior Giocatore - " + categoria.toUpperCase();

  fetch("dati.json")
    .then(response => response.json())
    .then(data => {
      const lista = data[categoria]?.classificaGiocatori || [];
      const squadre = data[categoria]?.squadre || [];

      const getLogo = nome =>
        (squadre.find(s => s.nome === nome)?.logo) ?
        `<img src="\${squadre.find(s => s.nome === nome).logo}" class="logo-squadra">` : "";

      if (!lista.length) {
        container.innerHTML = "<div class='empty-msg'>⚠️ Nessun giocatore disponibile.</div>";
        return;
      }

      let html = '<table><thead><tr><th>Nome</th><th>Squadra</th><th>Voti</th></tr></thead><tbody>';
      lista.sort((a, b) => b.voti - a.voti).forEach(({ nome, squadra, voti }) => {
        html += `<tr><td>\${nome}</td><td>\${getLogo(squadra)} \${squadra}</td><td>\${voti}</td></tr>`;
      });
      html += '</tbody></table>';

      container.innerHTML = html;
    });
});
