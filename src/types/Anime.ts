import Episodio from "./Episodio";

export default abstract class Anime {
    nome: string;
    link: string;
    private _sito: cheerio.Root;
    episodio: Episodio[] = [];

    constructor(nome: string, link: string) {
        this.nome = nome;
        this.link = link;
    }

    set sito(sito: cheerio.Root) {
        this._sito = sito;
    }

    get sito(): cheerio.Root {
        return this._sito;
    }
}
