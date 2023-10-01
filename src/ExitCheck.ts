//Controllo che non ci siano download attivi quando provo a chiudere l'app
//Perche quando si esce mentre ci sono download attivi, il file rimane incompleto
//Da cambiare quando aggiungo la verifica dei download non completi
import { ipcRenderer } from "electron";
import { AnimeStore } from "./stores/AnimeStore";
import { getFastExit } from "./types/UserSettings";
import { DH_STATES } from "node-downloader-helper";
import { AnimeDL } from "./types/AnimeDL";

/**
 * Controlla che nella lista non siano presenti download attivi
 * Se l'impostazione "Uscita rapida" é abilitata, allora verranno stoppati tutti i download attivi automaticamente
 * Se l'impostazione "Uscita rapida" é disabilitata, viene mostrato un modal con un messaggio
 */
export default function ExitCheck() {
    let non_terminati = false;

    AnimeStore.anime.forEach((anime) => {
        anime.episodio.forEach((episodio) => {
            if (
                episodio.stato == DH_STATES.DOWNLOADING ||
                episodio.stato == DH_STATES.PAUSED
            ) {
                non_terminati = true;
            }
        });
    });

    if (non_terminati) {
        if (getFastExit()) {
            AnimeStore.anime.forEach((anime) => {
                anime.episodio.forEach((episodio) => {
                    episodio.stream.stop();
                });
            });
            ipcRenderer.invoke("close");
        } else {
            AnimeDL.info(
                "Attenzione!",
                "Ferma tutti i download non completati!"
            );
        }
    } else {
        ipcRenderer.invoke("close");
    }
}
