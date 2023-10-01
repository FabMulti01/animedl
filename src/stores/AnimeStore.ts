import { action, makeObservable, observable } from "mobx";
//Cose mie
import Episodio from "@/types/Episodio";
import { AnimeDL } from "@/types/AnimeDL";
import { EpisodioStore } from "./EpisodioStore";

class AnimeStoreImpl {
    anime = new Map<string, EpisodioStore>();

    constructor() {
        makeObservable(this, {
            anime: observable,
            addEpisodio: action,
            removeEpisodio: action,
        });
    }

    addEpisodio(nome: string, cartella: string, episodio: Episodio) {
        if (this.anime.has(nome)) {
            try {
                this.anime.get(nome).addEpisodio(episodio);
            } catch (e) {
                if (e.cause == "gia presente") {
                    AnimeDL.notifica(
                        "Attenzione!",
                        "L'episodio " +
                            episodio.numero +
                            " é gia nella lista dei download!",
                        5000,
                        "yellow"
                    );
                } else {
                    this.removeEpisodio(nome, episodio.numero);
                    console.log(e);
                    AnimeDL.notifica(
                        "Errore!",
                        "Errore con l'aggiunta dell'episodio nella lista",
                        5000,
                        "red"
                    );
                }
            }
        } else {
            this.anime.set(nome, new EpisodioStore(cartella, nome));
            this.addEpisodio(nome, cartella, episodio);
        }
    }

    /**
     * Rimuovo l'episodio dalla lista
     * @param nome il nome dell'anime
     * @param numero il numero dell'episodio
     */
    removeEpisodio(nome: string, numero: string) {
        if (this.anime.get(nome).removeEpisodio(numero) == 0) {
            this.anime.delete(nome);
        }
    }
}

export const AnimeStore = new AnimeStoreImpl();
