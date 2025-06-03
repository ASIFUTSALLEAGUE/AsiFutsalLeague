
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get("categoria");
  const titolo = document.getElementById("titolo-categoria");
  const contenuto = document.getElementById("contenuto-classifica");

  if (!categoria) {
    titolo.textContent = "Categoria non specificata";
    contenuto.textContent = "Nessuna categoria indicata.";
    return;
  }

  titolo.textContent = "Classifica " + categoria.toUpperCase();

  fetch("dati.json")
    .then(response => response.json())
    .then(data => {
      const partite = data[categoria]?.partite || [];

      if (partite.length === 0) {
        contenuto.textContent = "⚠️ Classifica non disponibile. Nessuna partita presente.";
        return;
      }

      const classifica = {};

      partite.forEach(p => {
        if (p.golA == null || p.golB == null) return;

        const squadre = [p.squadraA, p.squadraB];
        squadre.forEach(s => {
          if (!classifica[s]) classifica[s] = { punti: 0, giocate: 0, vinte: 0, pari: 0, perse: 0, golFatti: 0, golSubiti: 0 };
        });

        classifica[p.squadraA].giocate++;
        classifica[p.squadraB].giocate++;
        classifica[p.squadraA].golFatti += p.golA;
        classifica[p.squadraA].golSubiti += p.golB;
        classifica[p.squadraB].golFatti += p.golB;
        classifica[p.squadraB].golSubiti += p.golA;

        if (p.golA > p.golB) {
          classifica[p.squadraA].vinte++;
          classifica[p.squadraA].punti += 3;
          classifica[p.squadraB].perse++;
        } else if (p.golA < p.golB) {
          classifica[p.squadraB].vinte++;
          classifica[p.squadraB].punti += 3;
          classifica[p.squadraA].perse++;
        } else {
          classifica[p.squadraA].pari++;
          classifica[p.squadraB].pari++;
          classifica[p.squadraA].punti += 1;
          classifica[p.squadraB].punti += 1;
        }
      });

      const ordinata = Object.entries(classifica).map(([squadra, dati]) => ({
        squadra,
        ...dati,
        diff: dati.golFatti - dati.golSubiti
      })).sort((a, b) => b.punti - a.punti || b.diff - a.diff);

      let html = '<table><thead><tr><th>Squadra</th><th>Pt</th><th>G</th><th>V</th><th>N</th><th>P</th><th>GF</th><th>GS</th><th>DR</th></tr></thead><tbody>';
      ordinata.forEach(team => {
        html += `<tr><td>${team.squadra}</td><td>${team.punti}</td><td>${team.giocate}</td><td>${team.vinte}</td><td>${team.pari}</td><td>${team.perse}</td><td>${team.golFatti}</td><td>${team.golSubiti}</td><td>${team.diff}</td></tr>`;
      });
      html += '</tbody></table>';
      contenuto.innerHTML = html;
    })
    .catch(error => {
      console.error("Errore nel caricamento:", error);
      contenuto.textContent = "Errore nel caricamento dei dati.";
    });
});
