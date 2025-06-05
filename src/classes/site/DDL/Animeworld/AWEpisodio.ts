import scraper from "@functions/scraper";
import type { DDLEpisodio } from "@interfaces/IDDL";

export default class AWEpisodio implements DDLEpisodio {
    readonly sito: string = "Animeworld";
    readonly numero: string;
    readonly url: string;

    constructor(numero: string, url: string) {
        this.numero = numero;
        this.url = url;
    }

    async getEpisodeDownloadLink(): Promise<string> {
        try {
            return (await scraper(this.url))(
                "a[id=alternativeDownloadLink]"
            ).attr("href");
        } catch (e) {
            throw new Error(e.message);
        }
    }
}
