// I bottoni che vengono visualizzati in ogni anime
import React from "react";
import { Button } from "@mantine/core";
import { EpisodioStore } from "@/stores/EpisodioStore";
import { DH_STATES } from "node-downloader-helper";
import {
    VscDebugPause,
    VscDebugStart,
    VscFolderOpened,
    VscTrash,
} from "react-icons/vsc";
import { ipcRenderer } from "electron";

type props = {
    anime: EpisodioStore;
};

export const BottoniAnime: React.FC<props> = ({ anime }) => {
    if (anime.inDownload > 0) {
        return (
            <>
                <Button
                    title="Pausa tutti i download in corso"
                    onClick={() =>
                        anime.episodio.forEach((episodio) => {
                            if (episodio.stato == DH_STATES.DOWNLOADING) {
                                episodio.stream.pause();
                            }
                        })
                    }
                >
                    <VscDebugPause />
                </Button>
                <Button
                    title="Riprende tutti i download in pausa"
                    onClick={() => {
                        anime.episodio.forEach((episodio) => {
                            if (episodio.stato == DH_STATES.PAUSED) {
                                episodio.stream.resume();
                            }
                        });
                    }}
                >
                    <VscDebugStart />
                </Button>
            </>
        );
    } else {
        return (
            <>
                <Button
                    title="Apri la cartella dell'anime"
                    onClick={() =>
                        ipcRenderer.invoke("openDir", anime.cartella)
                    }
                >
                    <VscFolderOpened />
                </Button>
                <Button
                    title="Rimuovi tutti gli episodi"
                    onClick={() => {
                        anime.episodio.forEach((episodio) => {
                            episodio.removeEpisodio();
                        });
                    }}
                >
                    <VscTrash />
                </Button>
            </>
        );
    }
};
