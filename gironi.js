
// Funzione helper per creare elemento squadra con logo se disponibile
function creaElementoSquadraConLogo(nomeSquadra) {
  const li = document.createElement("li");

  const img = document.createElement("img");
  const normalized = nomeSquadra.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/gi, '');
  img.src = `img/${normalized}.png`;
  img.alt = nomeSquadra;
  img.style.width = "24px";
  img.style.height = "24px";
  img.style.objectFit = "contain";
  img.style.verticalAlign = "middle";
  img.style.marginRight = "8px";

  const span = document.createElement("span");
  span.textContent = nomeSquadra;

  li.appendChild(img);
  li.appendChild(span);
  return li;
}


document.addEventListener("DOMContentLoaded", function() {
  // Recupera la categoria dalla query string dell'URL (se presente)
  const urlParams = new URLSearchParams(window.location.search);
  const categoriaSelezionata = urlParams.get("categoria") || "Under 17"; // Default a Under 17 se non presente
  
  // Funzione per caricare dinamicamente i dati dal file `dati.json`
  async function loadDatiJson() {
    const response = await fetch('dati.json');
    const dati = await response.json();

    // Verifica se ci sono gironi per la categoria selezionata
    if (dati[categoriaSelezionata] && dati[categoriaSelezionata].gironi) {
      return dati[categoriaSelezionata].gironi;
    } else {
      return {};
    }
  }

  const gironiContainer = document.getElementById("gironiContainer");

  // Funzione per visualizzare i gironi e le squadre in base alla categoria selezionata
  async function renderGironi() {
    const gironi = await loadDatiJson();
    
    // Se non ci sono gironi per la categoria selezionata
    if (!gironi || Object.keys(gironi).length === 0) {
      gironiContainer.innerHTML = "<p>Nessun girone disponibile per questa categoria.</p>";
      return;
    }

    gironiContainer.innerHTML = ""; // Pulisce il contenitore dei gironi

    Object.keys(gironi).forEach(girone => {
      const tableDiv = document.createElement("div");
      const table = document.createElement("table");
      const headerRow = document.createElement("tr");
      headerRow.innerHTML = `<th colspan="2">${girone}</th>`;
      table.appendChild(headerRow);

      gironi[ girone ].forEach(squadra => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${squadra}</td>`;  // Mostriamo solo i nomi delle squadre
        table.appendChild(row);
      });

      gironiContainer.appendChild(tableDiv);
      tableDiv.appendChild(table);
    });
  }

  // Avvio del rendering dei gironi
  renderGironi();
});
