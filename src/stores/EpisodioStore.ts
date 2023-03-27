//import { mkdirSync } from "node:fs";
import { makeAutoObservable, runInAction } from "mobx";
import { mkdirSync } from "node:fs";
import { DownloaderHelper, DH_STATES } from "node-downloader-helper";
import Episodio from "@/types/Episodio";

export class EpisodioStore {
    episodio = new Map<string, Episodio>();
    private _percentualeMedia = "0";
    inDownload = 0;
    stoppati = 0;
    completati = 0;

    get percentualeMedia(): string {
        return this._percentualeMedia;
    }

    set percentualeMedia(percentuale: string) {
        this._percentualeMedia = percentuale;
    }

    constructor() {
        makeAutoObservable(this);
    }

    addEpisodio(episodio: Episodio) {
        if (!this.isEpisodioInDownload(episodio.id)) {
            //Provo a creare la cartella dell'anime
            mkdirSync(episodio.cartella, { recursive: true });
            runInAction(() => {
                episodio.getEpisodeDownloadLink().then((link) => {
                    this.episodio.set(episodio.id, episodio);
                    this.episodio.get(episodio.id).stream =
                        new DownloaderHelper(link, episodio.cartella);
                });
            });
        }
    }

    removeEpisodio(id: string): number {
        if (this.isEpisodioInDownload(id)) {
            this.episodio.delete(id);
        } else {
            // AnimeDLEvents.notifica(
            //     "warning",
            //     "Stai cercando di rimuovere un episdio che non é presente nella lista..."
            // );
        }
        return this.episodio.size;
    }

    private isEpisodioInDownload(id: string) {
        try {
            if (this.episodio.has(id)) {
                return true;
            } else {
                return false;
            }
        } catch {
            return false;
        }
    }

    /**
     * Aggiorna la percentuale media dell'anime
     */
    updatePercentualeMedia() {
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
     * Aggiorna le variabili "inDownload","inPausa","stoppato" dell'oggetto
     */
    updateDowloadItemStatus() {
        let inDownload = 0;
        let stoppati = 0;
        let completato = 0;
        this.episodio.forEach((episodio) => {
            if (
                episodio.stato === DH_STATES.DOWNLOADING ||
                episodio.stato === DH_STATES.PAUSED
            ) {
                inDownload++;
            } else if (episodio.stato === DH_STATES.FINISHED) {
                completato++;
            } else if (episodio.stato === DH_STATES.STOPPED) {
                stoppati++;
            }
        });
        this.inDownload = inDownload;
        this.stoppati = stoppati;
        this.completati = completato;
    }
}
