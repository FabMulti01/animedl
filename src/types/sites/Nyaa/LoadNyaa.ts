import { scraper } from "@/types/Scraper";
import Nyaa from "./Nyaa";
import { selettore } from "./Nyaa";

export enum ORDINE {
    data = "&s=id&o=desc",
    seed = "&s=seeders&o=desc",
    peso = "&s=size&o=desc",
}
/**
 * Entry point per Nyaa
 * @param nome nome dell'anime
 * @ordine l'ordine della tabella su Nyaa
 * @param lingua la lingua che si vuole cercare
 * @returns l'array con risultati della tabella di Nyaa
 */
export async function loadNyaa(
    nome: string,
    lingua: string,
    ordine: ORDINE
): Promise<Nyaa[]> {
    const NYAALINK = "https://nyaa.si";
    //Ritorna la tabella mostrata su Nyaa con tutti nella prima pagina di Nyaa
    const anime: Nyaa[] = [];
    lingua = selettoreLingua(lingua);
    const cheerio = await scraper(
        NYAALINK + "?f=0&c=1_0&q=" + nome + lingua + ordine
    );
    for (let i = 0; i < cheerio("td[colspan=2]").length; i++) {
        try {
            anime[i] = new Nyaa(
                //Nome
                cheerio("td[colspan=2] a").not(".comments").eq(i).text(),
                //Link per la pagina delle info
                NYAALINK +
                    cheerio("td[colspan=2] a")
                        .not(".comments")
                        .eq(i)
                        .attr("href"),
                //Seeds
                cheerio("tbody tr").eq(i).children("td").eq(5).text(),
                //Data
                cheerio("tbody tr").eq(i).children("td").eq(4).text(),
                //Lingua
                lingua,
                //Peso
                cheerio("tbody tr").eq(i).children("td").eq(3).text(),
                //Magnet
                cheerio("tbody tr")
                    .eq(i)
                    .children("td")
                    .eq(2)
                    .children("a")
                    .eq(1)
                    .attr("href")
            );
        } catch (e) {
            console.info(e);
        }
    }
    if (anime.length === 0) {
        return undefined;
    }
    return anime;
}

function selettoreLingua(lingua: string): string {
    switch (lingua) {
        case selettore.italiano: {
            lingua = "+ita";
            break;
        }
        case selettore.multilingua: {
            lingua = "+multi";
            break;
        }
        case selettore.inglese: {
            lingua = "";
            break;
        }
        default:
            break;
    }
    return lingua;
}
