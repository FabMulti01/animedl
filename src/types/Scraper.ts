import cheerio from "cheerio";

/**
 * Utilizza Fetch per recuperare la pagina in HTML in base al link che viene dato
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
                console.log("Errore nello scraper", e);
                reject(null);
            });
    });
}
