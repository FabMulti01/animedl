import { type TorrentAnime } from "src/interfaces/ITorrent.js";
import type Torrent from "src/interfaces/ITorrent.js";
import Nyaa from "./Nyaa/Nyaa.js";

/**
 * Usato come punto d'inglesso per tutti i siti di tipo DDL
 */
export default class TorrentClass {
    /**
     * Punto d'ingresso per gli anime di tipo torrent
     * @param sito il nome del sito
     * @param titolo il titolo dell'anime
     * @param ordine il tipo di ordine
     * @param lingua la lingua che si sta cercando
     * @param pagina il numero della pagina del sito
     * @returns la lista degli anime
     */
    static async getList(
        sito: string,
        titolo: string,
        ordine: string,
        lingua: string,
        pagina: string
    ): Promise<Torrent> {
        switch (sito) {
            case "Nyaa": {
                return await Nyaa.caricaLista(titolo, ordine, lingua, pagina);
            }
            default: {
                return undefined;
            }
        }
    }

    static async getInfo(sito: string, url: string): Promise<TorrentAnime> {
        switch (sito) {
            case "Nyaa": {
                return await Nyaa.caricaInfo(url);
            }
            default: {
                return undefined;
            }
        }
    }
}
