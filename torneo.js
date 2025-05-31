
document.addEventListener("DOMContentLoaded", () => {
  const categorie = [
    { nome: "PICCOLI AMICI", anni: "2019-20" },
    { nome: "MINIPULCINI", anni: "2017-18" },
    { nome: "PULCINI", anni: "2015-16" },
    { nome: "ESORDIENTI", anni: "2013-14" },
    { nome: "UNDER 15", anni: "2011-12" },
    { nome: "UNDER 13 FEMMINILE", anni: "" }
  ];

  const container = document.getElementById("categorie-container");

  categorie.forEach(cat => {
    const div = document.createElement("div");
    div.className = "categoria";

    const titolo = document.createElement("h2");
    titolo.textContent = cat.nome;
    div.appendChild(titolo);

    if (cat.anni) {
      const sottotitolo = document.createElement("h3");
      sottotitolo.textContent = cat.anni;
      div.appendChild(sottotitolo);
    }

    const btnContainer = document.createElement("div");
    btnContainer.className = "buttons";

    const pages = [
      { file: "calendario.html", label: "📅 Calendario" },
      { file: "classifica.html", label: "📊 Classifica" },
      { file: "marcatori.html", label: "🎯 Marcatori" },
      { file: "portieri.html", label: "🧤 Miglior Portiere" },
      { file: "giocatori.html", label: "🏅 Miglior Giocatore" },
      { file: "statistiche.html", label: "📈 Statistiche" }
    ];

    pages.forEach(page => {
      const btn = document.createElement("a");
      btn.href = `${page.file}?categoria=${encodeURIComponent(cat.nome)}`;
      btn.className = "squadra-button";
      btn.textContent = page.label;
      btnContainer.appendChild(btn);
    });

    div.appendChild(btnContainer);
    container.appendChild(div);
  });
});
