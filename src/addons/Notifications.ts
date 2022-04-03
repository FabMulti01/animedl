import { ipcRenderer } from "electron";
import { getNotification } from "../stores/Settings";

export function Notifica(
    titolo: string,
    messaggio: string,
    directory?: string
) {
    if (getNotification()) {
        new Notification(titolo, { body: messaggio }).onclick = () => {
            //Quando clicco la notifica mi apre la cartella dove risiede l'anime
            if (directory) {
                ipcRenderer.invoke("openDirectory", directory);
            }
        };
    }
}
