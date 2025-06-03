
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get("categoria");
  const titolo = document.getElementById("titolo-categoria");
  const contenuto = document.getElementById("contenuto-giocatori");

  if (!categoria) {
    titolo.textContent = "Categoria non specificata";
    contenuto.textContent = "Nessuna categoria indicata.";
    return;
  }

  titolo.textContent = "Classifica Miglior Giocatore " + categoria.toUpperCase();

  fetch("dati.json")
    .then(response => response.json())
    .then(data => {
      const lista = data[categoria]?.classificaGiocatori || [];

      if (lista.length === 0) {
        contenuto.textContent = "⚠️ Nessun giocatore disponibile.";
        return;
      }

      const ordinati = [...lista].sort((a, b) => b.voti - a.voti);

      let html = '<table><thead><tr><th>Nome</th><th>Squadra</th><th>Voti</th></tr></thead><tbody>';
      ordinati.forEach(m => {
        html += `<tr><td>${m.nome}</td><td>${m.squadra}</td><td>${m.voti}</td></tr>`;
      });
      html += '</tbody></table>';

      contenuto.innerHTML = html;
    })
    .catch(error => {
      console.error("Errore caricamento giocatori:", error);
      contenuto.textContent = "Errore nel caricamento dei dati.";
    });
});
