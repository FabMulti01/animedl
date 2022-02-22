import { getNome, getImmagine, getLink } from "./AWMethods";

export interface Episodio {
    link: string;
    numerino: string;
}

export class AW {
    nome: string;
    immagine: string;
    link: string;
    episodio: Episodio[];
    stato: string;
    descrizione: string;
    dataInizio: string;
    sito: Function;

    constructor(cheerio: Function, index: number) {
        this.nome = getNome(cheerio, index);
        this.immagine = getImmagine(cheerio, index);
        this.link = getLink(cheerio, index);
        this.episodio = null;
        this.stato = null;
        this.descrizione = null;
        this.dataInizio = null;
        this.sito = null;
    }
}
