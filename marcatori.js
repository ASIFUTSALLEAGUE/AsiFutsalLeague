
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get("categoria");
  const titolo = document.getElementById("titolo-categoria");
  const contenuto = document.getElementById("contenuto-marcatori");

  if (!categoria) {
    titolo.textContent = "Categoria non specificata";
    contenuto.textContent = "Nessuna categoria indicata.";
    return;
  }

  titolo.textContent = "Classifica Marcatori " + categoria.toUpperCase();

  fetch("dati.json")
    .then(response => response.json())
    .then(data => {
      const lista = data[categoria]?.classificaMarcatori || [];

      if (lista.length === 0) {
        contenuto.textContent = "⚠️ Nessun marcatore disponibile.";
        return;
      }

      const ordinati = [...lista].sort((a, b) => b.gol - a.gol);

      let html = '<table><thead><tr><th>Nome</th><th>Squadra</th><th>Gol</th></tr></thead><tbody>';
      ordinati.forEach(m => {
        html += `<tr><td>${m.nome}</td><td>${m.squadra}</td><td>${m.gol}</td></tr>`;
      });
      html += '</tbody></table>';

      contenuto.innerHTML = html;
    })
    .catch(error => {
      console.error("Errore caricamento marcatori:", error);
      contenuto.textContent = "Errore nel caricamento dei dati.";
    });
});
