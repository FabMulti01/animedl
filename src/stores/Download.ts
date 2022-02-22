import { action, makeObservable, observable } from "mobx";
import filenamify from "filenamify";
import fs from "fs-extra";
import { getDIR } from "./Settings";

export interface Episodio {
    numero: string;
    //L'id e l'ultima parte del link della pagina dell'episodio dell'anime
    //    /play/xxxx
    id: string;
    finito: boolean;
}

export interface DownloadInfo {
    nome: string;
    dir: string;
    episodio: Episodio[];
}

//Aggiunge il download alla lista di tutti i download
export class DownloadStoreImpl {
    download: DownloadInfo[] = [];

    constructor() {
        makeObservable(this, {
            download: observable,
            addDownload: action,
            removeDownload: action,
        });
    }

    async addDownload(nome: string, numero: string, link: string) {
        var animeIndex = 0;
        //True = anime gia in lista, false = nessun anime nella lista
        if (
            this.download.some((download, i) => {
                if (download !== null) {
                    if (download.nome === nome) {
                        animeIndex = i;
                        return true;
                    }
                }
            })
        ) {
            if (
                this.download[animeIndex].episodio.some(
                    (episodio) => episodio.numero === numero
                )
            ) {
                console.log(
                    "Episodio gia in lista! Stoppalo/rimuovilo per riscaricarlo"
                );
            } else {
                fs.mkdir(
                    getDIR() +
                        "/" +
                        filenamify(nome, { replacement: " " }) +
                        "/",
                    { recursive: true }
                );
                this.download[animeIndex].episodio.push({
                    numero: numero,
                    id: link,
                    finito: false,
                });
            }
        } else {
            fs.mkdir(
                getDIR() + "/" + filenamify(nome, { replacement: " " }) + "/",
                { recursive: true }
            );
            this.download.push({
                nome: nome,
                dir:
                    getDIR() +
                    "/" +
                    filenamify(nome, { replacement: " " }) +
                    "/",
                episodio: [
                    {
                        numero: numero,
                        id: link,
                        finito: false,
                    },
                ],
            });
        }
    }

    //Rimuovo in base all'id dell'episodio
    removeDownload(id: string) {
        var indexEpisodio = 0,
            indexAnime = 0;
        this.download.some((download, i) => {
            //Ci sono i vecchi anime nulli
            if (download !== null) {
                indexAnime = i;
                download.episodio.some((episodio, i) => {
                    //Ci sono gli episodi gia rimossi nulli
                    if (episodio !== null) {
                        if (episodio.id === id) {
                            indexEpisodio = i;
                            this.download[indexAnime].episodio[indexEpisodio] =
                                null;
                        }
                    }
                });
            }
        });
        this.download.map((download, i) => {
            //Ci sono vecchi anime nulli
            if (download !== null) {
                if (
                    download.episodio.every((episodio) => {
                        //Non dovrebbe essere necessario
                        //Ma non funziona senza
                        if (episodio === null) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                ) {
                    this.download[i] = null;
                }
            }
        });
        //Dopo che ho eliminato l'episodio e l'anime controllo che gli anime rimanenti non siano nulli
        //Se e tutto nullo, resetto lo store
        if (this.download.every((download) => download === null)) {
            this.download = [];
        }
    }
}

export const DownloadStore = new DownloadStoreImpl();
