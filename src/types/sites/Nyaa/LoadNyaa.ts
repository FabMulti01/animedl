import { scraper } from "@/types/Scraper";
import Nyaa from "./Nyaa";
import { selettore } from "./Nyaa";

export enum ORDINE {
    dataDesc = "&s=id&o=desc",
    dataAsc = "&s=id&o=asc",
    seedDesc = "&s=seeders&o=desc",
    seedAsc = "&s=seeders&o=asc",
    pesoDesc = "&s=size&o=desc",
    pesoAsc = "&s=size&o=asc",
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
    let cheerio = null;
    const NYAALINK = "https://nyaa.si";
    //Ritorna la tabella mostrata su Nyaa con tutti nella prima pagina di Nyaa
    const anime: Nyaa[] = [];
    lingua = selettoreLingua(lingua);
    try {
        cheerio = await scraper(
            NYAALINK +
                "?f=0&c=1_0&q=" +
                encodeURIComponent(nome) +
                lingua +
                ordine
        );
    } catch {
        return undefined;
    }
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
            console.warn(
                "Errore con l'aggiunta dell'anime dell'array di Nyaa: ",
                e.message
            );
        }
    }
    if (anime.length === 0) {
        return null;
    }
    return anime;
}

function selettoreLingua(lingua: string): string {
    if (lingua == selettore.italiano) {
        lingua = "+ita";
    } else if (lingua == selettore.multilingua) {
        lingua = "+multi";
    } else if (lingua == selettore.inglese) {
        lingua = "";
    }

    return lingua;
}
