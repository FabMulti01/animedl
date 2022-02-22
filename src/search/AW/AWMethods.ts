import { MALSearch } from "../MAL/MyAnimeList";
import { scraper } from "../Scraper";
import { AW, Episodio } from "./AW";

const ANIMELINK = "https://www.animeworld.tv";
const ANIMESEARCH = "https://www.animeworld.tv/filter?sort=4&keyword=";

export async function loadAW(nome: string): Promise<AW[]> {
    nome = await MALSearch(nome);
    if (nome === undefined) {
        console.log("Non ho trovato nulla su MAL");
        return undefined;
    }
    //Creo i cookies per AnimeWorld
    await scraper(ANIMELINK);
    console.log("Cerco " + nome + " su AnimeWorld...");
    const cheerio = await scraper(ANIMESEARCH + nome);
    const anime = [];
    for (var i = 0; i < cheerio("div[class=inner] a[class=name]").length; i++) {
        anime[i] = new AW(cheerio, i);
    }
    console.log("Trovati " + anime.length + " risultati!");
    return anime;
}

export async function infoAnime(anime: AW): Promise<AW> {
    console.log("Recupero le informazioni per " + anime.nome + "...");
    anime.sito = await getSito(anime.link);
    anime.stato = getStato(anime.sito);
    anime.descrizione = getDescrizione(anime.sito);
    anime.dataInizio = getDataInizio(anime.sito);
    //Puó rallentare l'app se ci sono troppi episodi
    anime.episodio = getEpisodi(anime.sito);
    return anime;
}

export function getNome(cheerio: Function, index: number): string {
    try {
        return cheerio("a[class=name]")[index].children[0].data;
    } catch (e) {
        console.log("Errore nel caricamento del nome", e);
        return "Non sono riuscito a caricare il nome";
    }
}

export function getImmagine(cheerio: Function, index: number): string {
    try {
        return cheerio("a[class=poster]")[index].children[1].attribs.src;
    } catch (e) {
        console.log("Errore nel caricamento del link dell'immagine", e);
        return "../../../addons/placeholder.jpg";
    }
}

export function getLink(cheerio: Function, index: number): string {
    try {
        return ANIMELINK + cheerio("a[class=poster]")[index].attribs.href;
    } catch (e) {
        console.log("Errore nel caricamento del link dell'anime", e);
    }
}

export async function getSito(link: string) {
    try {
        return await scraper(link);
    } catch (e) {
        console.log("Errore nel caricamento della pagina dell'anime", e);
    }
}

function getStato(cheerio: Function): string {
    try {
        return cheerio("dl")[2].children[15].children[1].children[0].data;
    } catch (e) {
        console.log("Errore nel caricamento dello stato dell'anime", e);
        return "Non disponibile";
    }
}

function getDescrizione(cheerio: Function): string {
    try {
        return cheerio("div[class=desc]")[0].children[0].data;
    } catch (e) {
        console.log("Errore nel caricamento della descrizione dell'anime", e);
        return "Descrizione non disponibile";
    }
}

function getDataInizio(cheerio: Function): string {
    try {
        return cheerio("dl")[1].children[11].children[0].data;
    } catch (e) {
        console.log("Errore nel caricamento della data dell'anime", e);
        return "Non disponibile";
    }
}

/**
 *
 * @param cheerio la pagina dell'anime
 * @returns l'array con tutte le informazioni di ogni singolo episodio dell'anime
 */
function getEpisodi(cheerio: Function): Episodio[] {
    const episodio: Episodio[] = [];
    try {
        episodio.length = cheerio("[data-name=9] li[class=episode]").length;
        for (var i = 0; i < episodio.length; i++) {
            //Scorre la lista dei numerini e prende il link
            // "/play/xxxxx"
            episodio[i] = {
                link: cheerio("div[data-name=9] li[class=episode]")[i]
                    .children[0].attribs.href,
                numerino: cheerio("div[data-name=9] li[class=episode]")[i]
                    .children[0].attribs["data-num"],
            };
        }
        return episodio;
    } catch (e) {
        console.log("Errore nel recupero dei link degli episodi", e);
    }
}

/**
 * Prende il link del file nella pagina dell'anime, dell'episodio selezionato
 * @param link link dell'episodio che si vuole scaricare "/play/xxxx"
 * @returns link del file
 */
export async function getEpisodeDownloadLink(link: string): Promise<string> {
    const cheerio = await scraper(ANIMELINK + link);
    try {
        return cheerio("a[id=alternativeDownloadLink]")[0].attribs.href;
    } catch (e) {
        console.log("Errore nel recupero del link", e);
    }
}
