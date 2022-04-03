import cheerio from "cheerio";
import request from "request";
import { ipcRenderer } from "electron";

export function scraper(link: string) {
    const encodedURI = encodeURI(link);
    return new Promise<Function>((resolve, reject) => {
        request(encodedURI, { jar: true }, (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const pagina = cheerio.load(html);
                resolve(pagina);
            } else {
                console.log("Errore con la connessione " + error);
                // ipcRenderer.invoke();
                reject("Errore di connessione!");
            }
        });
    });
}
