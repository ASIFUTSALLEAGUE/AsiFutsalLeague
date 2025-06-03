
document.addEventListener("DOMContentLoaded", () => {
  const categoria = decodeURIComponent(new URLSearchParams(location.search).get("categoria"));
  const container = document.getElementById("gironi");
  if (!categoria || !container) return;

  fetch("dati.json")
    .then(response => response.json())
    .then(data => {
      const lista = data[categoria]?.gironi || [];
      if (!lista.length) {
        container.innerHTML = "<div class='empty-msg'>⚠️ Nessun dato disponibile.</div>";
        return;
      }

      let html = "<ul>";
      lista.forEach(item => {
        html += "<li>" + (item.nome || JSON.stringify(item)) + "</li>";
      });
      html += "</ul>";
      container.innerHTML = html;
    })
    .catch(error => {
      container.innerHTML = "<div class='empty-msg'>❌ Errore nel caricamento dati.</div>";
    });
});
