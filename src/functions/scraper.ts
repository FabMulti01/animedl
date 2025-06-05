import { type CheerioAPI, load } from "cheerio";

export default async function scraper(link: string): Promise<CheerioAPI> {
    return new Promise((resolve, reject) => {
        fetch(encodeURI(link), { method: "GET" })
            .then((response) => {
                if (response.status == 200) {
                    response.text().then((text) => {
                        resolve(load(text));
                    });
                } else {
                    throw new Error("Il sito non é raggiungibile");
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
}
