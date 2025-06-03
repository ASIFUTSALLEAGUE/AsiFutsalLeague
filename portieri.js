
document.addEventListener("DOMContentLoaded", () => {
  const categoria = new URLSearchParams(location.search).get("categoria");
  const div = document.getElementById("portieri");

  if (!categoria || !div) return;

  fetch("dati.json")
    .then(res => res.json())
    .then(data => {
      const lista = data[categoria]?.classificaPortieri || [];
      const squadre = data[categoria]?.squadre || [];

      const getLogo = (squadraNome) => {
        const s = squadre.find(el => el.nome === squadraNome);
        return s ? `<img src="\${s.logo}" class="logo-squadra">` : "";
      };

      if (!lista.length) {
        div.innerHTML = "<div class='empty-msg'>⚠️ Nessun portiere disponibile.</div>";
        return;
      }

      const table = document.createElement("table");
      table.innerHTML = "<thead><tr><th>Portiere</th><th>Squadra</th><th>Voti</th></tr></thead><tbody>";

      lista.sort((a, b) => b.voti - a.voti).forEach(info => {
        table.innerHTML += `<tr>
          <td>\${info.nome}</td>
          <td>\${getLogo(info.squadra)} \${info.squadra}</td>
          <td>\${info.voti}</td>
        </tr>`;
      });

      table.innerHTML += "</tbody>";
      div.innerHTML = "";
      div.appendChild(table);
    })
    .catch(err => {
      console.error("Errore caricamento portieri:", err);
      div.textContent = "Errore nel caricamento dei dati.";
    });
});
