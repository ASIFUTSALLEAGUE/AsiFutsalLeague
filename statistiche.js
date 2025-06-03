
document.addEventListener("DOMContentLoaded", () => {
  const categoria = new URLSearchParams(window.location.search).get("categoria");
  const titolo = document.getElementById("titolo-categoria");
  const contenuto = document.getElementById("contenuto-statistiche");

  if (!categoria) {
    titolo.textContent = "Categoria non specificata";
    contenuto.textContent = "Nessuna categoria indicata.";
    return;
  }

  titolo.textContent = "Statistiche " + categoria.toUpperCase();

  fetch("dati.json")
    .then(res => res.json())
    .then(data => {
      const partite = data[categoria]?.partite || [];
      if (partite.length === 0) {
        contenuto.textContent = "⚠️ NESSUNA STATISTICA ANCORA PRESENTE";
        return;
      }

      let giocate = 0, golTotali = 0;
      const squadreStats = {};

      partite.forEach(p => {
        if (p.golA != null && p.golB != null) {
          giocate++;
          golTotali += p.golA + p.golB;

          [ [p.squadraA, p.golA, p.golB], [p.squadraB, p.golB, p.golA] ].forEach(([squadra, gf, gs]) => {
            if (!squadreStats[squadra]) squadreStats[squadra] = { gf: 0, gs: 0, vinte: 0 };
            squadreStats[squadra].gf += gf;
            squadreStats[squadra].gs += gs;
            if (gf > gs) squadreStats[squadra].vinte++;
          });
        }
      });

      const mediaGol = giocate > 0 ? (golTotali / giocate).toFixed(2) : "0";

      const squadre = Object.entries(squadreStats);
      const migliorAttacco = squadre.sort((a, b) => b[1].gf - a[1].gf)[0]?.[0] || "N/D";
      const migliorDifesa = squadre.sort((a, b) => a[1].gs - b[1].gs)[0]?.[0] || "N/D";
      const piùVittorie = squadre.sort((a, b) => b[1].vinte - a[1].vinte)[0]?.[0] || "N/D";

      contenuto.innerHTML = `
        <div class="stat-box">📊 Partite giocate: <strong>${giocate}</strong></div>
        <div class="stat-box">🥅 Gol totali: <strong>${golTotali}</strong></div>
        <div class="stat-box">📈 Media gol/partita: <strong>${mediaGol}</strong></div>
        <div class="stat-box">💣 Miglior attacco: <strong>${migliorAttacco}</strong></div>
        <div class="stat-box">🧱 Miglior difesa: <strong>${migliorDifesa}</strong></div>
        <div class="stat-box">🏆 Più vittorie: <strong>${piùVittorie}</strong></div>
      `;
    })
    .catch(err => {
      console.error("Errore:", err);
      contenuto.textContent = "Errore nel caricamento dei dati.";
    });
});
