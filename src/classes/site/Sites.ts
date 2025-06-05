const list = new Map<string, { tipo: "DDL" | "Torrent"; url: string }>([
    ["Animeworld", { tipo: "DDL", url: "https://www.animeworld.ac" }],
    ["Nyaa", { tipo: "Torrent", url: "https://nyaa.si" }],
]);

export default class Sites {
    /**
     * Recupera i nomi dei siti
     */
    static getNomi(): string[] {
        return Array.from(list.keys());
    }

    /**
     * Recupera l'url del sito
     * @param nome il nome del sito
     */
    static getUrl(nome: string) {
        return list.get(nome).url;
    }

    /**
     * Recupera il tipo del sito
     * @param nome il nome del sito
     */
    static getTipo(nome: string) {
        return list.get(nome).tipo;
    }
}
