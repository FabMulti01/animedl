import React from "react";
import { observer } from "mobx-react";
import { Table, Text } from "@mantine/core";
import { DownloadEpisodeItem } from "./DownloadEpisodeItem";
import type { EpisodioStore } from "@/stores/EpisodioStore";
import { DH_STATES } from "node-downloader-helper";

export const DownloadInCorso: React.FC<{
    Anime: EpisodioStore;
}> = observer(({ Anime }) => {
    return (
        <>
            <Text size={"xl"}>Download In Corso</Text>
            <Table>
                <thead>
                    <tr>
                        <th style={{ width: 200 }}>Nome</th>
                        <th>Progresso</th>
                        <th style={{ width: 125 }}></th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from(Anime.episodio.values()).map((episodio) => {
                        if (
                            episodio.stato == DH_STATES.DOWNLOADING ||
                            episodio.stato == DH_STATES.PAUSED
                        ) {
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
