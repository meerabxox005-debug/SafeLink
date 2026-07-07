let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();

    deferredPrompt = e;

    const installBtn = document.getElementById("installBtn");

    if (installBtn) {
        installBtn.style.display = "inline-block";
    }
});

async function installApp() {

    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt = null;

    document.getElementById("installBtn").style.display = "none";
}