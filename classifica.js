
document.addEventListener(`DOMContentLoaded`, () => {
  const categoria = new URLSearchParams(window.location.search).get(`categoria`);
  const titolo = document.getElementById(`titolo-categoria`);
  const container = document.getElementById(`contenuto-classifica`);

  if (!categoria) {
    titolo.textContent = `Categoria non specificata`;
    container.textContent = `Nessuna categoria indicata.`;
    return;
  }

  titolo.textContent = `Classifica - ` + categoria.toUpperCase();

  fetch(`dati.json`)
    .then(response => response.json())
    .then(data => {
      const classifica = data[categoria]?.classifica || [];
      const squadre = data[categoria]?.squadre || [];

      const getLogo = nome =>
        (squadre.find(s => s.nome === nome)?.logo) ?
        <img src=`\${squadre.find(s => s.nome === nome).logo}` class=`logo-squadra`> : ``;

      if (!classifica.length) {
        container.innerHTML = <div class='empty-msg'>⚠️ Nessuna classifica disponibile.</div>;
        return;
      }

      let html = '<table><thead><tr><th>Squadra</th><th>Punti</th></tr></thead><tbody>';
      classifica.sort((a, b) => b.punti - a.punti).forEach(({ squadra, punti }) => {
        html += <tr><td>\${getLogo(squadra)} \${squadra}</td><td>\${punti}</td></tr>;
      });
      html += '</tbody></table>';

      container.innerHTML = html;
    });
});
