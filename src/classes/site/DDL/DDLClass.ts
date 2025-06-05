import type { DDLBase } from "@interfaces/IDDL";
import type DDL from "@interfaces/IDDL";
import Animeworld from "./Animeworld/Animeworld";

/**
 * Usato come punto d'inglesso per tutti i siti di tipo DDL
 */
export default class DDLClass {
    /**
     * Recupera la tabella o la lista di anime presenti nella pagina di ricerca
     */
    static async getList(sito: string, titolo: string): Promise<DDLBase[]> {
        switch (sito) {
            case "Animeworld": {
                return await Animeworld.caricaLista(titolo);
            }
            default: {
                throw new Error("Il sito non é gestito");
            }
        }
    }

    /**
     * Recupera le informazioni dell'anime
     */
    static async getInfo(sito: string, url: string): Promise<DDL> {
        switch (sito) {
            case "Animeworld": {
                return await Animeworld.caricaInfo(url);
            }
            default: {
                throw new Error("Il sito non é gestito");
            }
        }
    }
}
