//Controllo che non ci siano download attivi per quando si chiude l'app
//Perche quando si esce mentre ci sono download attivi, il file rimane incompleto
import { ipcRenderer } from "electron";
import { DownloadStore } from "../stores/Download";

export default function ExitCheck() {
    console.log(DownloadStore);
    if (
        DownloadStore.download.some((download) =>
            download.episodio.some((episodio) => episodio.finito === false)
        )
    ) {
        alert("Arresta o stoppa tutti i download non completati!");
    } else {
        ipcRenderer.invoke("close");
    }
}
