
let deferredPrompt;
const installBtn = document.getElementById("install-button");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "inline-block";
});

installBtn?.addEventListener("click", () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      console.log("✅ L'app è stata installata o ignorata.");
    });
  } else {
    alert("Se il tuo browser supporta l'app, potrai installarla dalla barra o dalle impostazioni.");
  }
});

console.log("✅ INDEX pronto con pulsante installazione SEMPRE visibile");
