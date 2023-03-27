import Anime from "@/types/Anime";

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
        this.data = data.substring(0, 10);
        this.lingua = lingua;
        this.peso = peso;
        this.magnet = magnet;
    }
}
