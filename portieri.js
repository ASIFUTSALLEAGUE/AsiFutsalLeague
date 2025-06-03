
document.addEventListener("DOMContentLoaded", () => {
  const categoria = new URLSearchParams(window.location.search).get("categoria");
  const titolo = document.getElementById("titolo-categoria");
  const container = document.getElementById("classifica-container");

  if (!categoria) {
    titolo.textContent = "Categoria non specificata";
    container.textContent = "Nessuna categoria indicata.";
    return;
  }

  titolo.textContent = `Miglior Portiere - ${categoria.toUpperCase()}`;

  fetch("dati.json")
    .then(res => res.json())
    .then(data => {
      const classifica = data[categoria]?.classificaPortieri || [];
      const squadre = data[categoria]?.squadre || [];

      if (!classifica.length) {
        container.innerHTML = "<div class='empty-msg'>⚠️ Nessun portiere disponibile.</div>";
        return;
      }

      const getLogo = (squadraNome) => {
        const squadra = squadre.find(s => s.nome === squadraNome);
        return squadra ? `<img src='${squadra.logo}' class='logo-squadra'>` : "";
      };

      const table = document.createElement("table");
      table.innerHTML = "<thead><tr><th>Nome</th><th>Squadra</th><th>Voti</th></tr></thead>";

      const tbody = document.createElement("tbody");

      classifica
        .sort((a, b) => b.voti - a.voti)
        .forEach(({ nome, squadra, voti }) => {
          const logo = getLogo(squadra);
          const row = document.createElement("tr");
          row.innerHTML = `<td>${nome}</td><td>${logo} ${squadra}</td><td>${voti}</td>`;
          tbody.appendChild(row);
        });

      table.appendChild(tbody);
      container.appendChild(table);
    })
    .catch(err => {
      container.textContent = "Errore nel caricamento dei dati.";
      console.error(err);
    });
});
