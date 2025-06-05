import type { CheerioAPI } from "cheerio";
import MarkdownIt from "markdown-it";
import Sites from "@classes/site/Sites";
import scraper from "@functions/scraper";
import {
    type TorrentAnime,
    type TorrentLingua,
    type TorrentOrdine,
} from "@interfaces/ITorrent";
import type Torrent from "@interfaces/ITorrent";

class NyaaAnime implements TorrentAnime {
    readonly titolo: string;
    readonly url: string;
    readonly seed: string;
    readonly peso: string;
    readonly data: string;
    readonly sito: string;
    readonly magnet: string;
    readonly descrizione: string;

    constructor(
        titolo: string,
        url: string,
        seed: string,
        peso: string,
        data: string,
        magnet: string,
        descrizione: string = undefined
    ) {
        this.titolo = titolo;
        this.url = url;
        this.seed = seed;
        this.peso = peso;
        this.data = data;
        this.magnet = magnet;
        this.descrizione = descrizione;
        this.sito = "Nyaa";
    }
}

export default class Nyaa implements Torrent {
    readonly sito: string;
    readonly lingua: string;
    readonly pagine: number;
    readonly ordine: string;
    readonly lista: TorrentAnime[];
    private cheerio: CheerioAPI;

    constructor(cheerio: CheerioAPI) {
        this.cheerio = cheerio;
        this.sito = "Nyaa";
        this.lingua = "+eng";
        this.lista = [];
    }

    getOrdine(): TorrentOrdine {
        return {
            SEED_ASC: "&s=seeders&o=asc",
            SEED_DESC: "&s=seeders&o=desc",
            DATA_ASC: "&s=id&o=asc",
            DATA_DESC: "&s=id&o=desc",
            PESO_ASC: "&s=size&o=asc",
            PESO_DESC: "&s=size&o=desc",
        };
    }

    getPagine(): number {
        try {
            const pagine = parseInt(
                this.cheerio("li.next").siblings().last().children("a").text()
            );
            if (pagine > 0) {
                return pagine;
            } else {
                return 1;
            }
        } catch (e) {
            //Su Nyaa c'é sampre una pagina
            return 1;
        }
    }

    getLingua(): TorrentLingua {
        return {
            tutto: "",
            multilingua: "+multi",
            italiano: "+ita",
        };
    }

    static async caricaLista(
        titolo: string,
        ordine: string,
        lingua: string,
        pagina: string
    ): Promise<Torrent> {
        const DOMINIO = Sites.getUrl("Nyaa");
        const url =
            DOMINIO +
            "/?f=0&c=1_0&q=" +
            titolo +
            lingua +
            ordine +
            "&p=" +
            pagina;
        try {
            const Nyaa: Nyaa = new this(await scraper(url));
            const tabella = Nyaa.cheerio("tbody tr");
            for (var i = 0; i < tabella.length; i++) {
                Nyaa.lista[i] = new NyaaAnime(
                    //Titolo
                    tabella
                        .eq(i)
                        .find("td[colspan='2'] a")
                        .not(".comments")
                        .text(),
                    //Link
                    DOMINIO +
                        tabella.eq(i).find("td[colspan='2'] a").attr("href"),
                    //Seed
                    tabella.eq(i).find(".text-center").eq(3).text(),
                    //Peso
                    tabella.eq(i).find(".text-center").eq(1).text(),
                    //Data
                    new Date(
                        tabella.eq(i).find(".text-center").eq(2).text()
                    ).toLocaleDateString(),
                    //Magnet
                    tabella.eq(i).find(".text-center a").eq(1).attr("href")
                );
            }
            return Nyaa;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async caricaInfo(url: string): Promise<TorrentAnime> {
        try {
            const cheerio = (await scraper(url))(".container").eq(1);
            return new NyaaAnime(
                //Titolo
                cheerio.find(".panel-title").eq(0).text().trim(),
                url,
                //Seed
                cheerio.find(".col-md-5 span").eq(1).text(),
                //Peso
                cheerio.find(".row").eq(3).find(".col-md-5").eq(0).text(),
                //Data
                cheerio.find(".col-md-5").eq(1).text(),
                //Magnet
                cheerio
                    .find("div[class='panel-footer clearfix'] a")
                    .eq(1)
                    .attr("href"),
                //Descrizione
                new MarkdownIt().render(
                    cheerio.find("#torrent-description").html()
                )
            );
        } catch (e) {
            throw new Error(e.message);
        }
    }
}
