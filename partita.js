
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get("categoria");
  const idPartita = params.get("id");
  const contenuto = document.getElementById("contenuto-partita");
  const titolo = document.getElementById("titolo-partita");

  if (!categoria || !idPartita) {
    titolo.textContent = "Dati non validi";
    contenuto.textContent = "Partita non trovata.";
    return;
  }

  fetch("dati.json")
    .then(res => res.json())
    .then(data => {
      const partite = data[categoria]?.partite || [];
      const partita = partite.find(p => String(p.id) === idPartita);

      if (!partita) {
        contenuto.textContent = "Partita non trovata.";
        return;
      }

      titolo.textContent = `${partita.squadraA} ${partita.golA} - ${partita.golB} ${partita.squadraB}`;

      let html = `<div class="squadre">
        <span><strong>${partita.squadraA}</strong></span>
        <span><strong>${partita.squadraB}</strong></span>
      </div>`;

      html += '<div class="marcatori"><strong>Marcatori:</strong><br>';
      html += '<ul>';
      (partita.marcatori || []).forEach(m => {
        html += `<li>${m.nome} (${m.squadra}) - ${m.gol} gol</li>`;
      });
      html += '</ul></div>';

      html += '<div class="migliori">';
      if (partita.migliorGiocatore)
        html += `<p>🏅 Miglior Giocatore: ${partita.migliorGiocatore.nome} (${partita.migliorGiocatore.squadra})</p>`;
      if (partita.migliorPortiere)
        html += `<p>🧤 Miglior Portiere: ${partita.migliorPortiere.nome} (${partita.migliorPortiere.squadra})</p>`;
      html += '</div>';

      contenuto.innerHTML = html;
    })
    .catch(err => {
      console.error(err);
      contenuto.textContent = "Errore nel caricamento dei dati.";
    });
});
