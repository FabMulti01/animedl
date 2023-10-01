import React from "react";
import { observer } from "mobx-react";
import { Button, Table, Text } from "@mantine/core";
import { DownloadEpisodeItem } from "./DownloadEpisodeItem";
import type { EpisodioStore } from "@/stores/EpisodioStore";
import { DH_STATES } from "node-downloader-helper";
import { VscTrash } from "react-icons/vsc";
import { AnimeStore } from "@/stores/AnimeStore";

export const DownloadCompletati: React.FC<{
    Anime: EpisodioStore;
}> = observer(({ Anime }) => {
    return (
        <>
            <Text size={"xl"}>Download Completati</Text>
            <Table>
                <thead>
                    <tr>
                        <th style={{ width: 200 }}>Nome</th>
                        <th>Progresso</th>
                        <th style={{ width: 125 }}>
                            <Button
                                title="Rimuovi tutti gli episodi terminati"
                                onClick={() => {
                                    Anime.episodio.forEach((episodio) => {
                                        if (
                                            episodio.stato == DH_STATES.FINISHED
                                        )
                                            AnimeStore.removeEpisodio(
                                                Anime.nome,
                                                episodio.numero
                                            );
                                    });
                                }}
                            >
                                <VscTrash />
                            </Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from(Anime.episodio.values()).map((episodio) => {
                        if (episodio.stato == DH_STATES.FINISHED) {
                            return (
                                <DownloadEpisodeItem
                                    nome={Anime.nome}
                                    cartella={Anime.cartella}
                                    episodio={episodio}
                                    key={episodio.numero}
                                />
                            );
                        }
                    })}
                </tbody>
            </Table>
        </>
    );
});
