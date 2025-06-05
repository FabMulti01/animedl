import Download from "@classes/download/Download";
import type { DDLEpisodio } from "@interfaces/IDDL";
import type IEpisodioStore from "@interfaces/IEpisodioStore";
import { makeAutoObservable, runInAction } from "mobx";
import { Impostazioni } from "./Impostazioni";
import { notifications } from "@mantine/notifications";

class EpisodioStore implements IEpisodioStore {
    readonly sito: string;
    readonly cartella: string;
    readonly lista = new Map<
        string,
        { Download: Download; episodio: DDLEpisodio }
    >();

    constructor(sito: string, cartella: string) {
        makeAutoObservable(this, { cartella: false, sito: false });
        this.sito = sito;
        this.cartella = cartella;
    }

    add(episodio: DDLEpisodio) {
        if (!this.lista.has(episodio.numero)) {
            //Setto subito nella lista per non avere duplicati
            this.lista.set(episodio.numero, {
                Download: null,
                episodio: episodio,
            });
            //Creo la cartella
            runInAction(() => {
                this.lista
                    .get(episodio.numero)
                    .episodio.getEpisodeDownloadLink()
                    .then((link) => {
                        window.folder.create(this.cartella).then(() => {
                            this.lista.get(episodio.numero).Download =
                                new Download(link, this.cartella);
                        });
                    })
                    .catch((e) => {
                        notifications.show({
                            title: "Attenzione!",
                            message:
                                "Si é verificato un errore con l'aggiunta dell'episodio: " +
                                episodio.numero +
                                "\n" +
                                e.message,
                            color: "yellow",
                        });
                        this.delete(episodio.numero);
                    });
            });
        } else {
            throw new Error("Episodio già in lista!");
        }
    }

    has(numero: string) {
        return this.lista.has(numero);
    }

    delete(numero: string) {
        return this.lista.delete(numero);
    }

    size() {
        return this.lista.size;
    }
}

class DownloadStoreImpl {
    readonly anime = new Map<string, EpisodioStore>();

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Aggiunge l'episodio alla lista dei download
     * @param sito il nome del sito
     * @param titolo il titolo dell'anime
     * @param url l'url della pagina del sito
     * @param episodio
     */
    add(sito: string, titolo: string, episodio: DDLEpisodio, url: string) {
        const path =
            Impostazioni.downloadDir +
            "\\" +
            titolo.replaceAll(/[^a-z 0-9]/gi, "-");
        if (!this.anime.has(titolo)) {
            this.anime.set(titolo, new EpisodioStore(sito, path));
            this.add(sito, titolo, episodio, url);
        } else {
            this.anime.get(titolo).add(episodio);
        }
    }

    /**
     * Elimina l'episodio dalla lista
     * @param titolo il titolo dell'anime
     * @param numero il numero dell'episodio
     */
    delete(titolo: string, numero: string) {
        if (this.anime.has(titolo)) {
            if (this.anime.get(titolo).has(numero)) {
                this.anime.get(titolo).delete(numero);
            } else {
                throw new Error("L'episodio non é in lista!");
            }
            //Se non ci sono più episodi nella lista, rimuovo l'anime
            if (this.anime.get(titolo).size() == 0) {
                this.anime.delete(titolo);
            }
        } else {
            throw new Error("L'anime non é in lista!");
        }
    }

    /**
     * Verifica se l'episodio é in lista
     */
    has(titolo: string, numero: string) {
        if (this.anime.has(titolo)) {
            return this.anime.get(titolo).has(numero);
        } else {
            return false;
        }
    }
}

const DownloadStore = new DownloadStoreImpl();
export default DownloadStore;
