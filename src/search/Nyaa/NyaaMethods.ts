import { scraper } from "../Scraper";
import { MALSearch } from "../MAL/MyAnimeList";
import { Nyaa } from "./Nyaa";
import MarkdownIt from "markdown-it";

const NYAALINK = "https://nyaa.si";

export async function loadNyaa(nome: string, lingua: string): Promise<Nyaa[]> {
    nome = await MALSearch(nome);
    if (nome === undefined) {
        console.log("Non ho trovato nulla su MAL");
        return undefined;
    }
    //Non sembra essere necessario
    //Ma creo comunque i cookies
    await scraper(NYAALINK);
    const anime = await languageSelector(nome, lingua);
    return anime;
}

async function languageSelector(nome: string, lingua: string) {
    switch (lingua) {
        case "Italiano": {
            console.log("Sto cercando " + nome + " in Italiano");
            return await getItaliano(nome);
        }
        case "Multilingua": {
            console.log("Sto cercando " + nome + " in Multilingua");
            return await getMultilingua(nome);
        }
        case "Inglese": {
            console.log("Sto cercando " + nome + " in Inglese");
            return await getInglese(nome);
        }
        default: {
            return;
        }
    }
}

//Cerco l'anime su nyaa con la lingua scelta (italiano, multilingua, inglese)
async function getSito(nome: string, lingua: string) {
    const linkNyaa = NYAALINK + "?f=0&c=1_0&q=" + nome + lingua;
    const cheerio = await scraper(linkNyaa);
    return cheerio;
}

function seedChecker(cheerio: Function, conta: number): boolean {
    try {
        if (
            cheerio("tbody")[0].children[conta].children[11].children[0].data >
            0
        ) {
            //Se ci sono seeds
            return true;
        } else {
            //Se non ci sono seeds
            return false;
        }
    } catch (e) {
        console.log(e);
        //Se non sono proprio presenti anime nella ricerca ritorno false
        return false;
    }
}

//Cerca l'anime in italiano
async function getItaliano(nome: string) {
    const cheerio = await getSito(nome, "+ita&s=seeders&o=desc");
    try {
        //1 perché controllo il primo risultato della tabella
        if (seedChecker(cheerio, 1)) {
            console.log("Ho trovato torrent in italiano!");
            const nyaa = getTable(cheerio, "Italiano");
            return nyaa;
        } else {
            console.log("Non ho trovato nulla in italiano, cambia lingua!");
        }
    } catch (e) {
        console.log("Errore: " + e);
    }
}

//Cerca l'anime in multilingua
async function getMultilingua(nome: string) {
    const cheerio = await getSito(nome, "+multi&s=seeders&o=desc");
    try {
        //1 perché controllo il primo risultato della tabella
        if (seedChecker(cheerio, 1)) {
            console.log("Ho trovato torrent in multilingua!");
            const nyaa = getTable(cheerio, "Multilingua");
            return nyaa;
        } else {
            console.log("Non ho trovato nulla in Multilingua, cambia lingua!");
        }
    } catch (e) {
        console.log("Errore: " + e);
    }
}

//Cerca l'anime in inglese
async function getInglese(nome: string) {
    const cheerio = await getSito(nome, "&s=seeders&o=desc");
    try {
        //1 perché controllo il primo risultato della tabella
        if (seedChecker(cheerio, 1)) {
            console.log("Ho trovato torrent in inglese!");
            const nyaa = getTable(cheerio, "Inglese");
            return nyaa;
        } else {
            console.log("Non ho trovato nulla in Inglese, cambia lingua!");
        }
    } catch (e) {
        console.log("Errore: " + e);
    }
}

//Ritorna la tabella mostrata su Nyaa con tutti i risultati che hanno almeno 1 seed
function getTable(cheerio: Function, lingua: string) {
    const anime = [];
    //Mi servono i dispari
    var conta = 1;
    for (var i = 0; i < cheerio("td[colspan=2]").length; i++) {
        //Controllo che il torrent più un alto abbia almeno un seed
        //Sennò non ha senso scaricarlo
        try {
            if (seedChecker(cheerio, conta)) {
                try {
                    var nome: string =
                        cheerio("td[colspan=2]")[i].children[3].attribs.title;
                    var seeds: string =
                        cheerio("tbody")[0].children[conta].children[11]
                            .children[0].data;
                    //Link della pagina dell'anime non il magnet
                    var link: string =
                        NYAALINK +
                        cheerio("td[colspan=2]")[i].children[3].attribs.href;
                    var magnet: string =
                        cheerio("tbody")[0].children[conta].children[5]
                            .children[3].attribs.href;
                    var peso: string =
                        cheerio("tbody")[0].children[conta].children[7]
                            .children[0].data;
                    conta += 2;
                } catch (e) {
                    nome =
                        cheerio("td[colspan=2]")[i].children[1].attribs.title;
                    seeds =
                        cheerio("tbody")[0].children[conta].children[11]
                            .children[0].data;
                    link =
                        NYAALINK +
                        cheerio("td[colspan=2]")[i].children[1].attribs.href;
                    peso =
                        cheerio("tbody")[0].children[conta].children[7]
                            .children[0].data;
                    magnet =
                        cheerio("tbody")[0].children[conta].children[5]
                            .children[3].attribs.href;
                    conta += 2;
                }
                anime[i] = new Nyaa(nome, seeds, link, lingua, peso, magnet);
            }
        } catch (e) {
            console.log("Errore! " + e);
            return null;
        }
    }
    return anime;
}

export async function infoNyaa(link: string): Promise<string> {
    const sito = await scraper(link);
    try {
        const descrizione = MarkdownIt().render(
            sito("#torrent-description").html()
        );
        return descrizione;
    } catch {
        return "Descrizione non disponibile";
    }
}
