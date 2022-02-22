import Store from "electron-store";
const store = new Store();

export default class User {
    MAL: boolean;
    DIR: string;
    notification: boolean;
    constructor(MAL: boolean, DIR: string, notification: boolean) {
        this.MAL = MAL;
        this.DIR = DIR;
        this.notification = notification;
    }
}

/**
 * Salva le impostazioni utente
 * @param User
 * @default MAL = true, DIR = "C/Users/<nome utente>/Downloads/AnimeDL", notification = true
 */
export function saveSettings(User: User) {
    try {
        store.set({
            User: {
                MAL: User.MAL,
                DIR: User.DIR,
                Notification: User.notification,
            },
        });
    } catch {
        store.set({
            User: {
                MAL: true,
                DIR: process.env.USERPROFILE + "/Downloads/AnimeDL",
                Notification: true,
            },
        });
    }
}

/**
 *
 * @returns La cartella dove vengono salvati gli anime
 * @default "C/Users/<nome utente>/Downloads/AnimeDL"
 */
export function getDIR(): string {
    //Se non esiste il file, ritorna il valore base
    return store.get(
        "User.DIR",
        process.env.USERPROFILE + "/Downloads/AnimeDL"
    ) as string;
}

/**
 *
 * @returns "true" o "false" in base a quello che c'è salvato
 * @default true
 */
export function getMAL(): boolean {
    return store.get("User.MAL", true) as boolean;
}

/**
 *
 * @returns "ture" o "false" in base a quello che ha salvato l'utente
 * @default true
 */
export function getNotification(): boolean {
    return store.get("User.Notification", true) as boolean;
}
