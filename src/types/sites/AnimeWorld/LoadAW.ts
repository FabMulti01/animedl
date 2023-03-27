import { scraper } from "@/types/Scraper";
import AW from "./AnimeWorld";

/**
 * Entry point per caricare gli anime da AnimeWorld
 * @param nome il nome che si vuole cercare da cercare
 * @returns l'array con tutti gli anime trovati
 */
export async function loadAW(nome: string): Promise<AW[]> {
    const ANIMESEARCH = "https://www.animeworld.tv/search?keyword=";
    const cheerio = await scraper(ANIMESEARCH + nome);
    const anime: AW[] = [];
    for (let i = 0; i < cheerio("div[class=inner] a[class=name]").length; i++) {
        anime[i] = new AW(
            getNome(i, cheerio),
            getLink(i, cheerio),
            getImmagine(i, cheerio)
        );
    }
    return anime;
}

/**
 * Recupera il nome dell'anime dalla lista dei risultati di AW
 * @param index la posizione dell'anime nel sito di AW dalla quale si vuole recuperare il nome
 * @param cheerio la funzione cheerio che contiene la pagina dei risultati
 * @returns il nome dell'anime
 */
function getNome(index: number, cheerio: cheerio.Root): string {
    try {
        return cheerio("a[class=name]").contents()[index].data;
    } catch (e) {
        console.warn("Errore nel caricamento del nome: ", e);
        return "Non disponibile!";
    }
}

/**
 * Recupera il link della pagina dell'anime
 * @param cheerio la funzione cheerio che contiene la pagina dei risultati
 * @param index la posizione dell'anime della quale si vuole recuperare il nome
 * @returns il link della pagina dell'anime
 */
function getLink(index: number, cheerio: cheerio.Root): string {
    try {
        return (
            "https://www.animeworld.tv" +
            cheerio("a[class=poster]").eq(index).attr("href")
        );
    } catch (e) {
        console.warn("Errore nel caricamento del link dell'anime: ", e);
        return "";
    }
}

/**
 * Recupera il link dell'immagine
 * @param cheerio la funzione che contiene la pagina dei risultati
 * @param index la posizione dell'anime della quale si vuole recuperare il nome
 * @returns il link dell'immagine
 */
function getImmagine(index: number, cheerio: cheerio.Root): string {
    try {
        return cheerio("a[class=poster]").eq(index).children().attr("src");
    } catch (e) {
        console.warn("Errore nel caricamento del link dell'immagine: ", e);
        return "";
    }
}
