import { scraper } from "../Scraper";
import { getMAL } from "../../stores/Settings";

const MAL = "https://myanimelist.net/anime.php?q=";
//Cerco il nome dell'anime su MyAnimeList in caso la ricerca è abilitata nelle impostazioni utente

export async function MALSearch(nome: string): Promise<string> {
    //Se MyAnimeList è disabilitato, ritorno il nome cercato
    if (!getMAL()) {
        return nome;
    } else {
        const cheerio = await scraper(MAL + nome);
        try {
            const nomeTrovato: string = cheerio("strong")[0].children[0].data;
            console.log("Anime trovato su MyAnimeList: " + nomeTrovato);
            return nomeTrovato;
        } catch (e) {
            console.log("Non ho trovato nulla su MyAnimeList per " + nome);
        }
    }
}
