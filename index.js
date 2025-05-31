
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
      deferredPrompt = null;
      installBtn.style.display = "none";
    });
  }
});

console.log("✅ INDEX ASI FUTSAL LEAGUE pronto per installazione PWA");
