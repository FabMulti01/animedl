import Sites from "@classes/site/Sites";
import scraper from "@functions/scraper";
import type { DDLBase, DDLEpisodio } from "@interfaces/IDDL";
import type DDL from "@interfaces/IDDL";
import AWEpisodio from "./AWEpisodio";

class AnimeworldBase implements DDLBase {
    readonly titolo: string;
    readonly url: string;
    readonly locandina: string;
    readonly sito: string;
    constructor(titolo: string, url: string, locandina: string) {
        this.titolo = titolo;
        this.url = url;
        this.locandina = locandina;
        this.sito = "Animeworld";
    }
}

export default class Animeworld extends AnimeworldBase implements DDL {
    readonly numeroEpisodi: string;
    readonly stato: string;
    readonly descrizione: string;
    readonly dataUscita: string;
    readonly dataFine: string;
    constructor(
        titolo: string,
        url: string,
        locandina: string,
        numeroEpisodi: string,
        stato: string,
        descrizione: string,
        dataUscita: string,
        dataFine: string
    ) {
        super(titolo, url, locandina);
        this.numeroEpisodi = numeroEpisodi;
        this.stato = stato;
        this.descrizione = descrizione;
        this.dataUscita = dataUscita;
        this.dataFine = dataFine;
    }

    async getEpisodeList(): Promise<DDLEpisodio[]> {
        const episodi: AWEpisodio[] = [];
        const cheerio = (await scraper(this.url))(
            "div[data-name=9] li[class=episode] a"
        );
        for (let i = 0; i < cheerio.length; i++) {
            episodi[i] = new AWEpisodio(
                //Numero
                cheerio.eq(i).attr("data-num"),
                //Url
                Sites.getUrl("Animeworld") + cheerio.eq(i).attr("href")
            );
        }
        return episodi;
    }

    static async caricaLista(titolo: string): Promise<DDLBase[]> {
        const DOMINIO = Sites.getUrl("Animeworld");
        const url = DOMINIO + "/search?keyword=" + titolo + "&d=1";
        const lista: DDLBase[] = [];
        const cheerio = (await scraper(url))(
            "div[class=item] div[class=inner]"
        );
        for (var i = 0; cheerio.length > i; i++) {
            lista[i] = new AnimeworldBase(
                cheerio.eq(i).children(".name").text(),
                DOMINIO + cheerio.eq(i).children(".poster").attr("href"),
                cheerio.eq(i).children(".poster").children("img").attr("src")
            );
        }
        return lista;
    }

    static async caricaInfo(url: string): Promise<DDL> {
        const cheerio = (await scraper(url))("div[class='widget info'] div");
        return new Animeworld(
            //Titolo
            cheerio.children("h2").text(),
            url,
            //Locandina
            cheerio.children("img").attr("src"),
            //Numero episodi
            cheerio
                .children("dl[class='meta col-sm-6']")
                .eq(1)
                .children("dd")
                .eq(2)
                .text(),
            //Stato
            cheerio
                .children("dl[class='meta col-sm-6']")
                .eq(1)
                .children("dd")
                .eq(3)
                .children("a")
                .text(),
            cheerio.children("div[class='desc']").text(),
            //Data uscita
            cheerio
                .children("dl[class='meta col-sm-6']")
                .eq(0)
                .children("dd")
                .eq(2)
                .text(),
            //Data Fine
            "Non disponibile"
        );
    }
}
