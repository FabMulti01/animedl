import { makeAutoObservable } from "mobx";
import { DH_STATES, DownloaderHelper } from "node-downloader-helper";
import { Impostazioni } from "@stores/Impostazioni";

export default class Download {
    readonly url: string;
    readonly folder: String;
    stream: DownloaderHelper;
    private _peso: number;
    private _velocita: number;
    private _scaricato: number;
    private _percentuale: number;
    private _stato: DH_STATES;

    set peso(peso: number) {
        this._peso = peso;
    }

    get peso(): number {
        return this._peso;
    }

    set velocita(velocita: number) {
        this._velocita = velocita;
    }

    get velocita(): number {
        return this._velocita;
    }

    set scaricato(scaricato: number) {
        this._scaricato = scaricato;
    }

    get scaricato(): number {
        return this._scaricato;
    }

    set percentuale(percentuale: number) {
        this._percentuale = percentuale;
    }

    get percentuale(): number {
        return this._percentuale;
    }

    set stato(stato: DH_STATES) {
        this._stato = stato;
    }

    get stato(): DH_STATES {
        return this._stato;
    }

    constructor(url: string, folder: string) {
        this.url = url;
        this.folder = folder;
        (this.stream = new DownloaderHelper(url, folder, {
            override: true,
        })).start();
        this.peso = 0;
        this.percentuale = 0;
        this.velocita = 0;
        this.stato = DH_STATES.IDLE;
        makeAutoObservable(this, {
            url: false,
            folder: false,
            stream: false,
        });
        this.startDownload();
    }

    startDownload() {
        this.stream.on("download", (stats) => {
            this.peso = stats.totalSize;
            this.stato = DH_STATES.DOWNLOADING;
        });
        this.stream.on("progress", (stats) => {
            this.scaricato = stats.downloaded;
            this.velocita = stats.speed;
            this.percentuale = stats.progress;
        });
        this.stream.on("pause", () => {
            this.velocita = 0;
            this.stato = DH_STATES.PAUSED;
        });
        this.stream.on("stop", () => {
            this.velocita = 0;
            this.stato = DH_STATES.STOPPED;
        });
        this.stream.on("end", (stats) => {
            this.scaricato = stats.downloadedSize;
            if (stats.incomplete) {
                this.stato = DH_STATES.FAILED;
            } else {
                this.stato = DH_STATES.FINISHED;
                Impostazioni.downloadedBytes =
                    Impostazioni.downloadedBytes + stats.totalSize;
            }
        });
    }
}
