
document.addEventListener(`DOMContentLoaded`, () => {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get(`categoria`);
  const titolo = document.getElementById(`titolo-categoria`);
  const contenuto = document.getElementById(`contenuto-gironi`);

  if (!categoria) {
    titolo.textContent = `Categoria non specificata`;
    contenuto.textContent = `Nessuna categoria indicata.`;
    return;
  }

  titolo.textContent = `Gironi ` + categoria.toUpperCase();

  fetch(`dati.json`)
    .then(response => response.json())
    .then(data => {
      const categoriaData = data[categoria];
      if (!categoriaData || !categoriaData.gironi || Object.keys(categoriaData.gironi).length === 0) {
        contenuto.textContent = `⚠️ Al momento nessun girone presente.`;
        return;
      }

      const squadre = categoriaData.squadre || [];

      const getLogo = (squadraNome) => {
        const s = squadre.find(el => el.nome === squadraNome);
        return s ? <img src='${s.logo}' class='logo-squadra'> : ``;
      };

      contenuto.innerHTML = ``;

      Object.entries(categoriaData.gironi).forEach(([nomeGirone, squadreList]) => {
        const div = document.createElement(`div`);
        div.className = `girone`;

        const h3 = document.createElement(`h3`);
        h3.textContent = nomeGirone;
        div.appendChild(h3);

        const ul = document.createElement(`ul`);
        squadreList.forEach(squadra => {
          const li = document.createElement(`li`);
          li.innerHTML = `${getLogo(squadra)} ${squadra}`;
          ul.appendChild(li);
        });

        div.appendChild(ul);
        contenuto.appendChild(div);
      });
    })
    .catch(error => {
      console.error(`Errore nel caricamento dei gironi:`, error);
      contenuto.textContent = `Errore nel caricamento dei dati.`;
    });
});
