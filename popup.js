const statut = document.getElementById("statut");
const boutonActiver = document.getElementById("activer");
const boutonDesactiver = document.getElementById("desactiver");

async function actualiserStatut() {
    const resultat = await chrome.storage.local.get({
        active: false
    });

    if (resultat.active) {
        statut.textContent = "Protection enabled";
        statut.className = "actif";
    } else {
        statut.textContent = "Protection disable";
        statut.className = "inactif";
    }
}

boutonActiver.addEventListener("click", async () => {
    await chrome.storage.local.set({
        active: true
    });

    await actualiserStatut();
});

boutonDesactiver.addEventListener("click", async () => {
    await chrome.storage.local.set({
        active: false
    });

    await actualiserStatut();
});

actualiserStatut();