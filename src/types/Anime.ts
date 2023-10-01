import filenamify from "filenamify";
import Episodio from "./Episodio";
import { getDownloadDir } from "./UserSettings";

export default abstract class Anime {
    nome: string;
    link: string;
    readonly cartella: string;
    sito: cheerio.Root;
    episodio = new Map<string, Episodio>();

    constructor(nome: string, link: string) {
        this.nome = nome;
        this.link = link;
        this.cartella = getDownloadDir() + "\\" + filenamify(nome);
    }

    abstract loadInfo(): Promise<this>;
}
