import type { Cheerio } from "cheerio";

export default interface Torrent {
    /**
     * Il nome del sito
     */
    readonly sito: string;
    /**
     * La lingua di ricerca
     */
    readonly lingua: string;
    /**
     * Il numero di pagine
     */
    readonly pagine: number;
    /**
     * Il tipo di ordinamento
     */
    readonly ordine: string;
    /**
     * La lista degli anime
     */
    readonly lista: TorrentAnime[];
    /**
     * Recupera la lingua del sito
     */
    getLingua(): TorrentLingua;
    /**
     * Recupera l'ordine del sito
     */
    getOrdine(): TorrentOrdine;
    /**
     * Recupera il numero delle pagine del sito
     * @param cheerio opzionale
     */
    getPagine(cheerio?: Cheerio<any>): number;
}

export interface TorrentAnime {
    descrizione: string;
    titolo: string;
    url: string;
    seed: string;
    peso: string;
    data: string;
    sito: string;
    magnet: string;
}

export type TorrentOrdine = {
    readonly SEED_ASC: string;
    readonly SEED_DESC: string;
    readonly PESO_ASC: string;
    readonly PESO_DESC: string;
    readonly DATA_ASC: string;
    readonly DATA_DESC: string;
};

export type TorrentLingua = {
    readonly TUTTO: string;
    readonly MULTILINGUA: string;
    readonly ITALIANO: string;
};
