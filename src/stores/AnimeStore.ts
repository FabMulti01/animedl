import { action, makeObservable, observable } from "mobx";
//Cose mie
import Episodio from "@/types/Episodio";
import { EpisodioStore } from "./EpisodioStore";
import { AnimeDLEvents } from "@/types/AnimeDLEvents";

class AnimeStoreImpl {
    anime = new Map<string, EpisodioStore>();

    constructor() {
        makeObservable(this, {
            anime: observable,
            addAnime: action,
            removeAnime: action,
            addEpisodio: action,
            removeEpisodio: action,
        });
    }

    addAnime(episodio: Episodio) {
        if (!this.isAnimeInDownload(episodio.nome)) {
            this.anime.set(episodio.nome, new EpisodioStore(episodio.cartella));
        }
        try {
            this.addEpisodio(episodio);
        } catch (e) {
            this.removeEpisodio(episodio.nome, episodio.id);
            AnimeDLEvents.notifica("Errore!", e.message);
        }
    }

    removeAnime(nome: string, id: string) {
        if (this.isAnimeInDownload(nome)) {
            if (this.anime.get(nome).removeEpisodio(id) === 0) {
                this.anime.delete(nome);
            }
        }
    }

    addEpisodio(episodio: Episodio) {
        this.anime.get(episodio.nome).addEpisodio(episodio);
    }

    removeEpisodio(nome: string, id: string) {
        if (this.anime.get(nome).removeEpisodio(id) == 0) {
            this.anime.delete(nome);
        }
    }

    isAnimeInDownload(nome: string): boolean {
        if (this.anime.has(nome)) {
            return true;
        } else {
            return false;
        }
    }
}

export const AnimeStore = new AnimeStoreImpl();
