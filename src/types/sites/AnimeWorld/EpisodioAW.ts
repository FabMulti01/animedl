import Episodio from "@/types/Episodio";
import { scraper } from "@/types/Scraper";

export default class AWEpisodio extends Episodio {
    constructor(nome: string, link: string, numero: string) {
        super(nome, link, numero);
    }
    async getEpisodeDownloadLink(): Promise<string> {
        const cheerio = await scraper("https://www.animeworld.tv" + this.link);
        try {
            return cheerio("a[id=alternativeDownloadLink]").attr("href");
        } catch (e) {
            throw new Error(
                "Errore con il recupero del link del file per l'episodio " +
                    this.numero +
                    " di " +
                    this.nome +
                    e.message
            );
        }
    }
}
