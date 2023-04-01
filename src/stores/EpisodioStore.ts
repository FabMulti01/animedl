//import { mkdirSync } from "node:fs";
import { makeAutoObservable, runInAction } from "mobx";
import { mkdirSync } from "node:fs";
import { DownloaderHelper, DH_STATES } from "node-downloader-helper";
import Episodio from "@/types/Episodio";

export class EpisodioStore {
    episodio = new Map<string, Episodio>();
    private _percentualeMedia = "0";
    cartella: string;
    inDownload = 0;
    terminati = 0;

    get percentualeMedia(): string {
        return this._percentualeMedia;
    }

    set percentualeMedia(percentuale: string) {
        this._percentualeMedia = percentuale;
    }

    constructor(dir: string) {
        this.cartella = dir;
        makeAutoObservable(this);
    }

    addEpisodio(episodio: Episodio) {
        if (!this.isEpisodioInDownload(episodio.id)) {
            //Provo a creare la cartella dell'anime
            try {
                mkdirSync(episodio.cartella, { recursive: true });
            } catch (e) {
                console.warn(e.message);
                throw new Error(
                    "Si é verificato un problema nella creazione della cartella! Controlla i log per maggiori informazioni"
                );
            }
            runInAction(() => {
                episodio
                    .getEpisodeDownloadLink()
                    .then((link) => {
                        this.episodio.set(episodio.id, episodio);
                        this.episodio.get(episodio.id).stream =
                            new DownloaderHelper(link, episodio.cartella, {
                                override: true,
                                retry: true,
                            });
                    })
                    .catch((e) => {
                        console.warn(e.message);
                        throw new Error(
                            "Si é verificato un problema nella creazione dello stream! Controlla i log per maggiori informazioni"
                        );
                    });
            });
        }
    }

    removeEpisodio(id: string): number {
        if (this.isEpisodioInDownload(id)) {
            this.episodio.delete(id);
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
        let terminati = 0;
        this.episodio.forEach((episodio) => {
            if (
                episodio.stato === DH_STATES.DOWNLOADING ||
                episodio.stato === DH_STATES.PAUSED
            ) {
                inDownload++;
            } else {
                terminati++;
            }
        });
        this.inDownload = inDownload;
        this.terminati = terminati;
    }
}
