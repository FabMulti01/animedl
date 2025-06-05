export interface DDLBase {
    sito: string;
    titolo: string;
    url: string;
    locandina?: string;
}

export interface DDLEpisodio {
    readonly numero: string;
    readonly url: string;
    /**
     * Recupera il link dell'episodio
     */
    getEpisodeDownloadLink(): Promise<string>;
}

export default interface DDL extends DDLBase {
    numeroEpisodi: string;
    stato: string;
    dataUscita: string;
    dataFine: string;
    descrizione: string;

    getEpisodeList(): Promise<DDLEpisodio[]>;
}
