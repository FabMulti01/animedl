import { notifications } from "@mantine/notifications";
import Store from "electron-store";

const store = new Store({
    name: "preferiti",
    accessPropertiesByDotNotation: false,
    clearInvalidConfig: false,
});

class PreferitiImpl {
    /**
     * Metodo per inserire un singolo anime nella lista dei preferiti
     * @param sito il nome del sito
     * @param titolo il titolo dell'anime
     * @param url l'url della pagina delle informazioni dell'anime
     */
    add(sito: string, titolo: string, url: string) {
        if (store.size <= 10) {
            store.set(titolo, {
                sito: sito,
                url: url,
            });
        } else {
            notifications.show({
                title: "Preferiti",
                message:
                    "Hai raggiunto il limite massimo di anime nella lista dei preferiti, rimuovine qualcuno prima di aggiungerne altri",
                autoClose: 5000,
            });
        }
    }

    /**
     * Rimuove l'anime indicato dalla lista dei preferiti
     * @param titolo il titolo dell'anime
     */
    remove(titolo: string) {
        store.delete(titolo);
    }

    /**
     * Recupera il singolo anime dalla lista dei preferiti
     * @param titolo il titolo dell'anime
     * @returns le informazioni come map <titolo>{sito, url}
     */
    get(titolo: string) {
        return store.get(titolo) as {
            sito: string;
            url: string;
        };
    }

    /**
     * Recupera se l'anime è già nella lista dei preferiti
     * @param titolo il titolo dell'anime
     * @returns boolean
     */
    has(titolo: string): boolean {
        return store.has(titolo);
    }

    list() {
        return Array.from(store) as [string, { sito: string; url: string }][];
    }

    reset() {
        store.clear();
    }
}

export const Preferiti = new PreferitiImpl();
