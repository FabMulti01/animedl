import filenamify from "filenamify";
import { makeAutoObservable } from "mobx";
import { DownloaderHelper, DH_STATES } from "node-downloader-helper";
import { AnimeStore } from "@/stores/AnimeStore";
import { scraper } from "./Scraper";
import { getDownloadDir } from "./UserSettings";

//Estende event emitter per avere l'evento custom dell'inizio del download
export default class Episodio {
    readonly id: string; //Id dell'episodio, viene generato automaticamente con nome + numero
    readonly nome: string; //Il nome dell'anime
    readonly numero: string; //Il numero dell'episodio
    readonly cartella: string; //La cartella, viene generata automaticamente con il nome
    link: string;
    private _stream: DownloaderHelper;
    //Per i download
    private _stato: DH_STATES;
    private _pesoTotale: string;
    private _velocita: string;
    private _percentuale: string;

    set stato(stato: DH_STATES) {
        this._stato = stato;
    }

    get stato(): DH_STATES {
        return this._stato;
    }

    set pesoTotale(pesoTotale: string) {
        this._pesoTotale = formatBytes(pesoTotale);
    }

    get pesoTotale(): string {
        return this._pesoTotale;
    }

    set velocita(velocita: string) {
        this._velocita = formatBytes(velocita) + "/S";
    }

    get velocita(): string {
        return this._velocita;
    }

    set percentuale(percentuale: string) {
        this._percentuale = percentuale;
    }

    get percentuale(): string {
        return this._percentuale;
    }

    get stream(): DownloaderHelper {
        return this._stream;
    }

    set stream(stream: DownloaderHelper) {
        this._stream = stream;
        //Avvio lo stream
        this.downloadStart();
    }

    /**
     * Costruttore per gli episodi (li fa proprio lui)
     * @param nome il nome dell'anime
     * @param link il link dell file dell'episodio
     * @param numero il numero dell'episodio
     */
    constructor(nome: string, link: string, numero: string) {
        this.id = nome + numero;
        this.nome = nome;
        this.numero = numero;
        this.link = link;
        this.cartella = getDownloadDir() + "\\" + filenamify(nome);
        makeAutoObservable(this, {
            id: false,
            nome: false,
            numero: false,
            link: false,
        });
    }

    /**
     * Aggiunge l'episodio nello store.
     */
    addEpisodio() {
        AnimeStore.addAnime(this);
    }

    /**
     * Rimuove l'episodio in base all'id
     */
    removeEpisodio() {
        AnimeStore.removeAnime(this.nome, this.id);
    }

    /**
     * Prende il link del file nella pagina dell'anime, dell'episodio selezionato
     * @returns link del file
     */
    async getEpisodeDownloadLink(): Promise<string> {
        const cheerio = await scraper("https://www.animeworld.tv" + this.link);
        try {
            return cheerio("a[id=alternativeDownloadLink]").attr("href");
        } catch (e) {
            console.warn("Errore: ", e);
        }
    }

    //Emesso quando il download viene avviato. Inizio a salvarmi tutte le informazioni e emetto l'evento per il componente
    downloadStart(): void {
        //Aggiorno i dati relativi al download
        this.stream.start();
        this.stream.on("download", (stats) => {
            this.pesoTotale = stats.totalSize.toString();
            //Imposto lo stato IN_DOWNLOAD
            this.stato = DH_STATES.DOWNLOADING;
            AnimeStore.anime.get(this.nome).updateDowloadItemStatus();
        });
        this.stream.on("progress", (stats) => {
            this.percentuale = stats.progress.toFixed(1);
            this.velocita = stats.speed.toString();
            AnimeStore.anime.get(this.nome).updatePercentualeMedia();
        });
        this.stream.on("pause", () => {
            this.stato = DH_STATES.PAUSED;
        });
        this.stream.on("resume", () => {
            this.stato = DH_STATES.DOWNLOADING;
        });
        this.stream.on("end", () => {
            this.stato = DH_STATES.FINISHED;
            this.velocita = "0";
            AnimeStore.anime.get(this.nome).updateDowloadItemStatus();
        });
        this.stream.on("stop", () => {
            this.stato = DH_STATES.STOPPED;
            this.velocita = "0";
            AnimeStore.anime.get(this.nome).updateDowloadItemStatus();
        });
        this.stream.on("error", (stats) => {
            this.stato = DH_STATES.FAILED;
            console.log(
                "Erroe nel download di: " +
                    this.id +
                    ", errore: " +
                    stats.message
            );
        });
    }
}

/**
 * Modifica i byte formattandoli in dimensioni piu grandi
 * es. byte in KB,MB,GB
 * @param bytes
 * @param decimal
 * @returns
 */
function formatBytes(bytes: unknown, decimal = 1): string {
    if (bytes === 0) return "0 Bytes";

    const sizes = ["Bytes", "KB", "MB", "GB"];

    const i = Math.floor(Math.log(bytes as number) / Math.log(1024));
    return (
        parseFloat(((bytes as number) / Math.pow(1024, i)).toFixed(decimal)) +
        sizes[i]
    );
}
