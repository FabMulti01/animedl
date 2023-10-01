import ElectronStore from "electron-store";
import { constants } from "../utils";
import { AnimeDL } from "./AnimeDL";

const store = new ElectronStore();

/**
 * Resetta le impostazioni utente
 */
export function resetSettings() {
    store.clear();
    AnimeDL.notifica("Info", "Impostazioni utente resettate!", 5000, "yellow");
}
/**
 * @returns la versione dell'applicazione
 */
export function getAppVersion(): string {
    return constants.AppVersion;
}

/**
 * Imposta la versione corrente dell'app
 */
export function setAppVersion() {
    try {
        store.set("AppVersion", getAppVersion());
    } catch {
        resetSettings();
        console.log("Errore con il salvataggio della versione");
    }
}

export function setDownloadDir(dir: string) {
    if (dir != null) {
        store.set("Directory", dir);
    }
}

/**
 * @returns La cartella dove vengono salvati gli anime
 */
export function getDownloadDir(): string {
    // Se non esiste il file, ritorna il valore base
    return store.get("Directory", constants.defaultDownloadDir) as string;
}

/**
 * Imposta l'uscita rapida che stoppa i download in corso
 * @param fastExit "true" o "false" in base a quello che si vuole
 */
export function setFastExit(fastExit: boolean) {
    if (fastExit != undefined) {
        store.set("FastExit", fastExit);
    }
}

/**
 * @returns "true" o "false" in base a quello che ha salvato l'utente
 * @default false
 */
export function getFastExit(): boolean {
    return store.get("FastExit", false) as boolean;
}

export function setLastUsedSite(lastUsedSite: string) {
    if (lastUsedSite != undefined) {
        store.set("lastUsedSite", lastUsedSite);
    }
}
/**
 * @returns La stringa dell'ultimo sito utilizzato
 */
export function getLastUsedSite(): string {
    //0 é AnimeWorld
    return store.get("lastUsedSite", "AnimeWorld") as string;
}

export function setTotaleScaricato(pesoTotale: number) {
    store.set("totaleScaricato", getTotaleScaricato() + pesoTotale);
}

export function getTotaleScaricato(): number {
    return store.get("totaleScaricato", 0) as number;
}
