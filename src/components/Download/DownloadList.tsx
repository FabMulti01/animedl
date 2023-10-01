import React from "react";
import { observer } from "mobx-react";
import { Title, Table, Text } from "@mantine/core";
import { AnimeStore } from "@/stores/AnimeStore";
import { DownloadAnimeItem } from "./DownloadAnimeItem";

/**
 * Entry per i download
 */
export const DownloadList: React.FC = observer(() => {
    return (
        <>
            <Title align="center">Lista Download</Title>
            {AnimeStore.anime.size > 0 ? (
                <Table>
                    <thead>
                        <tr>
                            <th style={{ width: 200 }}>Nome</th>
                            <th>Progresso</th>
                            <th style={{ width: 125 }}>Peso Totale</th>
                            <th style={{ width: 125 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from(AnimeStore.anime.keys()).map((nome) => {
                            return (
                                <DownloadAnimeItem
                                    key={nome}
                                    Anime={AnimeStore.anime.get(nome)}
                                    nome={nome}
                                />
                            );
                        })}
                    </tbody>
                </Table>
            ) : (
                <Text align="center">Non stai scaricando nulla!</Text>
            )}
        </>
    );
});
