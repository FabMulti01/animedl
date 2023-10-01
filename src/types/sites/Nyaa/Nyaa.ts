import Anime from "@/types/Anime";
import { scraper } from "@/types/Scraper";
import MarkdownIt from "markdown-it";

export enum selettore {
    italiano = "italiano",
    multilingua = "multilingua",
    inglese = "inglese",
}

export default class Nyaa extends Anime {
    seeds: string;
    data: string;
    lingua: string;
    peso: string;
    descrizione: string;
    magnet: string;

    constructor(
        nome: string,
        link: string,
        seeds: string,
        data: string,
        lingua: string,
        peso: string,
        magnet: string
    ) {
        super(nome, link);
        this.seeds = seeds;
        //Rimuovo l'orario
        this.data = data.substring(0, 10);
        this.lingua = lingua;
        this.peso = peso;
        this.magnet = magnet;
    }

    async loadInfo(): Promise<this> {
        try {
            this.sito = await scraper(this.link);
            this.descrizione = MarkdownIt().render(
                this.sito("#torrent-description").html()
            );
        } catch (e) {
            console.warn(
                "Errore nel caricamento della descrizione: ",
                e.message
            );
            this.descrizione =
                "Descrizione non disponibile. Controlla i log per maggiori informazioni!";
        }
        return this;
    }
}
