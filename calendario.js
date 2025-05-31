
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get("categoria");
  const titolo = document.getElementById("titolo-categoria");
  const contenuto = document.getElementById("contenuto-calendario");

  if (!categoria) {
    titolo.textContent = "Categoria non specificata";
    contenuto.textContent = "Nessuna categoria indicata.";
    return;
  }

  titolo.textContent = "Calendario " + categoria.toUpperCase();

  fetch("dati.json")
    .then(response => response.json())
    .then(data => {
      const partite = (data[categoria] && data[categoria].partite) || [];

      if (partite.length === 0) {
        contenuto.textContent = "⚠️ Calendario non presente.";
        return;
      }

      const giornate = {};

      partite.forEach(p => {
        const giorno = p.giornata || "Giornata non specificata";
        if (!giornate[giorno]) giornate[giorno] = [];
        giornate[giorno].push(p);
      });

      contenuto.innerHTML = "";

      Object.entries(giornate).forEach(([giornata, partite]) => {
        const div = document.createElement("div");
        div.className = "giornata";

        const h2 = document.createElement("h2");
        h2.textContent = giornata;
        div.appendChild(h2);

        partite.forEach(p => {
          const partitaDiv = document.createElement("div");
          partitaDiv.className = "partita";

          if (p.golA !== undefined && p.golB !== undefined) {
            const link = document.createElement("a");
            link.href = `partita.html?categoria=${encodeURIComponent(categoria)}&id=${p.id}`;
            link.textContent = `${p.squadraA} ${p.golA} - ${p.golB} ${p.squadraB}`;
            partitaDiv.appendChild(link);
          } else {
            partitaDiv.textContent = `${p.squadraA} - ${p.squadraB}`;
          }

          div.appendChild(partitaDiv);
        });

        contenuto.appendChild(div);
      });
    })
    .catch(error => {
      console.error("Errore nel caricamento del calendario:", error);
      contenuto.textContent = "Errore nel caricamento dei dati.";
    });
});
