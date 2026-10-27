async function protectionActive() {
    const resultat = await chrome.storage.local.get({
        active: false
    });

    return resultat.active;
}

chrome.tabs.onCreated.addListener(async (onglet) => {
    if (!(await protectionActive())) {
        return;
    }

    if (onglet.openerTabId == null) {
        return;
    }

    const url = onglet.pendingUrl || onglet.url || "";

    if (/^(chrome|chrome-extension|devtools):\/\//i.test(url)) {
        return;
    }

    try {
        await chrome.tabs.remove(onglet.id);
    } catch (erreur) {
    }
});