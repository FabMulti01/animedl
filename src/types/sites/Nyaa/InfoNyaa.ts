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
    const sito = await scraper(link);
    try {
        appoggio.descrizione = MarkdownIt().render(
            sito("#torrent-description").html()
        );
    } catch (e) {
        console.log(e);
        appoggio.descrizione = "Descrizione non disponibile!";
    }
    return appoggio;
}
