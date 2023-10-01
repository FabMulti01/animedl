//import { mkdirSync } from "node:fs";
import { makeAutoObservable, runInAction } from "mobx";
import { mkdirSync } from "node:fs";
import { DownloaderHelper, DH_STATES } from "node-downloader-helper";
import Episodio from "@/types/Episodio";

export class EpisodioStore {
    episodio = new Map<string, Episodio>();
    readonly nome: string;
    readonly cartella: string;
    //Per i download
    percentualeMedia = "0";
    pesoTotale = 0;
    inDownload = 0;
    completati = 0;
    stoppati = 0;

    constructor(cartella: string, nome: string) {
        this.cartella = cartella;
        this.nome = nome;
        makeAutoObservable(this, {
            cartella: false,
        });
    }

    /**
     * Aggiunge l'episodio nello store degli episodi
     * Fa un check che l'episodio non sia gia in download per evitare duplicati
     * @param episodio l'oggetto con tutte le informazioni
     * @returns false se l'episodio non é stato aggiunto alla lista, true se l'inserimento é avvenuto a buon fine
     */
    addEpisodio(episodio: Episodio) {
        if (!this.episodio.has(episodio.numero)) {
            //Provo a creare la cartella dell'anime
            try {
                mkdirSync(this.cartella, { recursive: true });
            } catch (e) {
                console.warn(e.message);
                throw new Error(
                    "Si é verificato un errore nella creazione della cartella per l'anime!"
                );
            }
            //Setto l'episodio adesso cosi non ho problemi di episodi duplicati per colpa del caricamento del link
            this.episodio.set(episodio.numero, episodio);
            runInAction(() => {
                episodio
                    .getEpisodeDownloadLink()
                    .then((link) => {
                        this.episodio.get(episodio.numero).setStream(
                            new DownloaderHelper(link, this.cartella, {
                                override: true,
                                retry: false,
                            })
                        );
                    })
                    .catch((e) => {
                        throw new Error(
                            "Si é verificato un errore nella creazione dello stream! " +
                                e.message
                        );
                    });
            });
        } else {
            throw new Error("Episodio gia presente!", {
                cause: "gia presente",
            });
        }
    }

    /**
     * NON USARE
     * @param numero il numero dell'episodio da eliminare
     * @returns la grandezza della lista degli episodi
     */
    removeEpisodio(numero: string): number {
        if (this.episodio.has(numero)) {
            //Dato che ci sono rimuovo l'anime appena eliminato dal peso totale
            this.pesoTotale =
                this.pesoTotale - this.episodio.get(numero).pesoTotale;
            this.episodio.delete(numero);
            this.updateStatus();
        }
        return this.episodio.size;
    }

    /**
     * Aggiorna la percentuale media dell'anime
     */
    updatePercentuale() {
        let somma = 0;
        this.episodio.forEach((episodio) => {
            if (
                episodio.stato == DH_STATES.DOWNLOADING ||
                episodio.stato == DH_STATES.PAUSED
            ) {
                somma += parseFloat(episodio.percentuale);
            }
        });
        this.percentualeMedia = (somma / this.inDownload).toFixed(1);
    }

    /**
     * Aggiorna le variabili "inDownload","inPausa","stoppato"
     */
    updateStatus() {
        let inDownload = 0;
        let stoppati = 0;
        let completati = 0;
        this.episodio.forEach((episodio) => {
            if (
                episodio.stato == DH_STATES.DOWNLOADING ||
                episodio.stato == DH_STATES.PAUSED
            ) {
                inDownload++;
            } else if (episodio.stato == DH_STATES.FINISHED) {
                completati++;
            } else {
                stoppati++;
            }
        });
        this.inDownload = inDownload;
        this.completati = completati;
        this.stoppati = stoppati;
    }

    updatePesoTotale(peso: number) {
        this.pesoTotale = this.pesoTotale + peso;
    }
}
