import type Download from "@classes/download/Download.js";
import type { DDLEpisodio } from "./IDDL";

export default interface IEpisodioStore {
    /**
     * Il nome del sito
     */
    readonly sito: string;
    /**
     * La cartella dove viene salvato l'anime
     */
    readonly cartella: string;
    /**
     * La lista con tutti gli episodi
     */
    readonly lista: Map<string, { Download: Download; episodio: DDLEpisodio }>;

    add(episodio: DDLEpisodio): void;

    has(numero: string): boolean;

    delete(numero: string): void;

    size(): number;
}
