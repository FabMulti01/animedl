import MarkdownIt from "markdown-it";
import { scraper } from "@/types/Scraper";
import Nyaa from "./Nyaa";

/**
 * Carica la descrizione per la pagina delle info di Nyaa
 * @param link il link della pagina torrent
 */
export async function InfoNyaa(
    nome: string,
    data: string,
    link: string,
    seeds: string,
    peso: string,
    lingua: string,
    magnet: string
) {
    const appoggio = new Nyaa(nome, link, seeds, data, lingua, peso, magnet);
    try {
        const sito = await scraper(link);
        appoggio.descrizione = MarkdownIt().render(
            sito("#torrent-description").html()
        );
    } catch (e) {
        console.warn("Errore nel caricamento della descrizione: ", e.message);
        appoggio.descrizione =
            "Descrizione non disponibile. Controlla i log per maggiori informazioni!";
    }
    return appoggio;
}
