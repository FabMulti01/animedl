export class Nyaa {
    nome: string;
    seeds: string;
    link: string;
    lingua: string;
    peso: string;
    magnet: string;
    descrizione: string;
    constructor(
        nome: string,
        seeds: string,
        link: string,
        lingua: string,
        peso: string,
        magnet: string
    ) {
        this.nome = nome;
        this.seeds = seeds;
        this.link = link;
        this.lingua = lingua;
        this.peso = peso;
        this.magnet = magnet;
        this.descrizione = null;
    }
}
