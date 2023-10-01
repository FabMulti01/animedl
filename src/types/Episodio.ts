import { DownloaderHelper, DH_STATES } from "node-downloader-helper";
import { action, makeObservable, observable } from "mobx";
import { AnimeStore } from "@/stores/AnimeStore";
import { setTotaleScaricato } from "./UserSettings";

//Estende event emitter per avere l'evento custom dell'inizio del download
export default abstract class Episodio {
    readonly nome: string;
    readonly numero: string; //Il numero dell'episodio
    link: string;
    stream: DownloaderHelper;
    //Per i download
    stato: DH_STATES;
    pesoTotale: number;
    scaricato: number;
    velocita: number;
    percentuale: string;

    setStato(stato: DH_STATES) {
        this.stato = stato;
        AnimeStore.anime.get(this.nome).updateStatus();
    }

    setPesoTotale(pesoTotale: number) {
        this.pesoTotale = pesoTotale;
        AnimeStore.anime.get(this.nome).updatePesoTotale(pesoTotale);
    }

    setScaricato(scaricato: number) {
        this.scaricato = scaricato;
    }

    setPercentuale(percentuale: string) {
        this.percentuale = percentuale;
        AnimeStore.anime.get(this.nome).updatePercentuale();
    }

    setVelocita(velocita: number) {
        this.velocita = velocita;
    }

    setStream(stream: DownloaderHelper) {
        this.stream = stream;
        //Faccio partire il download
        this.downloadStart();
    }

    /**
     * @param nome appoggio per lo store
     * @param link il link del file dell'episodio
     * @param numero il numero dell'episodio
     */
    constructor(nome: string, link: string, numero: string) {
        this.nome = nome;
        this.numero = numero;
        this.link = link;
        makeObservable(this, {
            //Una vera schifezza questo MOBX
            stream: observable,
            setStream: action,
            stato: observable,
            setStato: action,
            pesoTotale: observable,
            setPesoTotale: action,
            scaricato: observable,
            setScaricato: action,
            velocita: observable,
            setVelocita: action,
            percentuale: observable,
            setPercentuale: action,
        });
    }

    //Emesso quando il download viene avviato. Inizio a salvarmi tutte le informazioni e emetto l'evento per il componente
    private downloadStart(): void {
        //Aggiorno i dati relativi al download
        this.stream.start();
        //Emesso quando il download viene avviato
        this.stream.once("download", (stats) => {
            this.setPesoTotale(stats.totalSize);
            //Imposto lo stato IN_DOWNLOAD
            this.setStato(DH_STATES.DOWNLOADING);
        });
        //Emesso quando vengono ricevuti dati dal server
        this.stream.on("progress", (stats) => {
            this.setPercentuale(stats.progress.toFixed(1));
            this.setScaricato(stats.downloaded);
            this.setVelocita(stats.speed);
        });
        //Emesso quando il download viene messo in pausa
        this.stream.on("pause", () => {
            this.setStato(DH_STATES.PAUSED);
        });
        //Emesso quando il download viene ripreso
        this.stream.on("resume", () => {
            this.setStato(DH_STATES.DOWNLOADING);
        });
        //Emesso quando il download é terminato
        this.stream.once("end", () => {
            this.setStato(DH_STATES.FINISHED);
            this.setVelocita(0);
            setTotaleScaricato(this.pesoTotale);
        });
        //Emesso quando il download viene stoppato
        this.stream.once("stop", () => {
            this.setStato(DH_STATES.STOPPED);
            this.setVelocita(0);
        });
        //Emesso quando il download va in errore
        this.stream.once("error", () => {
            this.setStato(DH_STATES.STOPPED);
        });
    }

    /**
     * Prende il link del file nella pagina dell'anime
     * @returns link del file
     */
    abstract getEpisodeDownloadLink(): Promise<string>;
}
