import React from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { Table, Title, Text } from "@mantine/core";
import { AnimeStore } from "@/stores/AnimeStore";
import type Episodio from "@/types/Episodio";
import { DownloadEpisodeItem } from "./DownloadEpisodeItem";

export const DownloadAnimePage: React.FC = observer(() => {
    const { nome } = useParams();
    let episodioValues: Episodio[] = [];
    if (AnimeStore.anime.get(nome) != undefined) {
        episodioValues = Array.from(
            AnimeStore.anime.get(nome).episodio.values()
        );
    } else {
        return (
            <>
                <Title align="center">{nome}</Title>
                <Text align="center">
                    Non stai scaricando nessun episodio di quest'anime!
                </Text>
            </>
        );
    }
    return (
        <>
            <Title align="center">{nome}</Title>
            <Table>
                <thead>
                    <tr>
                        <th style={{ width: 200 }}>Nome</th>
                        <th>Progresso</th>
                        <th style={{ width: 125 }}></th>
                    </tr>
                </thead>
                <tbody>
                    {episodioValues.map((episodio) => {
                        return (
                            <DownloadEpisodeItem
                                episodio={episodio}
                                key={episodio.id}
                            />
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
});
