import cheerio from "cheerio";
//import { AnimeDLEvents } from "./AnimeDLEvents";

/**
 *
 * @param link Il link della pagina che si vuole ottenere
 * @returns La funzione "cheerio" per fare il parsing della pagina
 */
export async function scraper(link: string): Promise<cheerio.Root> {
    return new Promise((resolve, reject) => {
        fetch(encodeURI(link), {
            method: "GET",
        })
            .then((response) => {
                if (response.status != 200) {
                    reject();
                } else {
                    response.text().then((value) => {
                        resolve(cheerio.load(value));
                    });
                }
            })
            .catch((e) => {
                console.log(e);
                throw new Error("Connessione");
            });
    });
}
