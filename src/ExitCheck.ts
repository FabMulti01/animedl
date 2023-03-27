//Controllo che non ci siano download attivi quando provo a chiudere l'app
//Perche quando si esce mentre ci sono download attivi, il file rimane incompleto
//Da cambiare quando aggiungo la verifica dei download non completi
import { ipcRenderer } from "electron";
import { AnimeStore } from "./stores/AnimeStore";
import { getFastExit } from "./types/UserSettings";
import { DH_STATES } from "node-downloader-helper";

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
            alert("Arresta o stoppa tutti i download non completati!");
        }
    } else {
        ipcRenderer.invoke("close");
    }
}
