
document.addEventListener("DOMContentLoaded", () => {
  const categoria = new URLSearchParams(window.location.search).get("categoria");
  const div = document.getElementById("marcatori");
  if (!categoria || !div) return;

  fetch("dati.json")
    .then(res => res.json())
    .then(data => {
      const lista = data[categoria]?.classificaMarcatori || [];
      const squadre = data[categoria]?.squadre || [];

      const getLogo = (squadraNome) => {
        const s = squadre.find(el => el.nome === squadraNome);
        return s ? `<img src="\${s.logo}" class="logo-squadra">` : "";
      };

      if (!lista.length) {
        div.innerHTML = "<div class='empty-msg'>⚠️ Nessun dato disponibile.</div>";
        return;
      }

      const table = document.createElement("table");
      table.innerHTML = `<thead><tr><th>Giocatore</th><th>Squadra</th><th>Gol</th></tr></thead><tbody>`;

      lista.sort((a, b) => b.gol - a.gol).forEach(info => {
        table.innerHTML += `<tr>
          <td>\${info.nome}</td>
          <td>\${getLogo(info.squadra)} \${info.squadra}</td>
          <td>\${info.gol}</td>
        </tr>`;
      });

      table.innerHTML += "</tbody>";
      div.innerHTML = "";
      div.appendChild(table);
    })
    .catch(err => {
      console.error("Errore caricamento marcatori:", err);
      div.textContent = "Errore nel caricamento dei dati.";
    });
});
