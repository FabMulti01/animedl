import { scraper } from "@/types/Scraper";
import Anime from "@/types/Anime";
import Episodio from "@/types/Episodio";

export default class AW extends Anime {
    /**
     * Il link dell'immagine
     */
    readonly immagine: string;
    /**
     * Lo stato dell'anime (terminato, in corso, ecc.)
     */
    private _stato: string;
    /**
     * La data del prossimo episodio se questo é in corso
     */
    dataRilascio: string;
    descrizione: string;
    /**
     * La data di quando é uscito l'anime
     */
    dataInizio: string;

    set stato(stato: string) {
        this._stato = stato;
        if (stato == "In corso") {
            this.setDataRilascio();
        }
    }

    get stato(): string {
        return this._stato;
    }

    constructor(nome: string, link: string, immagine: string) {
        super(nome, link);
        this.immagine = immagine;
    }

    /**
     * Recupera la funzione cheerio del sito in base al link dell'anime
     * @returns la funzione cheerio del sito
     */
    async setSito() {
        try {
            this.sito = await scraper(this.link);
        } catch (e) {
            console.warn("Errore nel caricamento dell'HTML: ", e.message);
        }
    }

    /**
     * Recupera lo stato dell'anime (finito, in corso, ecc.)
     * @returns lo stato dell'anime
     */
    setStato() {
        try {
            this.stato = this.sito("dl")
                .children("dd")
                .eq(9)
                .children("a")
                .text();
        } catch (e) {
            console.warn(
                "Errore nel caricamento dello stato dell'anime: ",
                e.message
            );
            this.stato = "Non disponibile";
        }
    }

    /**
     * Recupera la descrizione dalla pagina dell'anime
     * @returns la descrizione dell'anime
     */
    setDescrizione() {
        try {
            this.descrizione = this.sito("div[class=desc]").text();
        } catch (e) {
            console.warn(
                "Errore nel caricamento della descrizione dell'anime: ",
                e.message
            );
            this.descrizione = "Descrizione non disponibile";
        }
    }

    /**
     * Recupera la data d'inizio dell'anime dalla tabellina di AnimeWorld
     * @returns la data di inizio dell'anime
     */
    setDataUscita() {
        try {
            console.log;
            this.dataInizio = this.sito("dl").children("dd").eq(2).text();
        } catch (e) {
            console.warn(
                "Errore nel caricamento della data dell'anime: ",
                e.message
            );
            this.dataInizio = "Non disponibile";
        }
    }

    /**
     * Recupera la data di rilascio dalla pagina dell'anime
     * @returns la data di rilascio
     */
    setDataRilascio() {
        try {
            this.dataRilascio = this.sito('div[id="next-episode"]').attr(
                "data-calendar-date"
            );
        } catch (e) {
            console.warn(
                "Errore nel recupero della data di rilascio: ",
                e.message
            );
            this.dataRilascio = "Non disponibile";
        }
    }

    /**
     * Recupera gli episodi dai bottoni per scaricarli e salva le proprieta
     * @param cheerio la funzione cheerio della pagina dell'anime
     * @returns l'array con tutte le informazioni di ogni episodio dell'anime
     */
    setEpisodi() {
        //Usata per salvare solo la sezione dell'anime dove sono presenti gli episodi
        const appoggio = this.sito("div[data-name=9] li[class=episode] a");
        try {
            for (let i = 0; i < appoggio.length; i++) {
                //Scorre la lista degli episodi e recupera il link piu il numerino
                // "/play/xxxxx"
                this.episodio[i] = new Episodio(
                    this.nome,
                    //Link
                    appoggio.eq(i).attr("href"),
                    //Numero
                    appoggio.eq(i).attr("data-num")
                );
            }
        } catch (e) {
            console.warn("Errore: ", e.message);
        }
    }
}
