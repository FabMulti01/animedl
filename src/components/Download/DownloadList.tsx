import React from "react";
import { observer } from "mobx-react";
import { Title, Table, Text } from "@mantine/core";
import { AnimeStore } from "@/stores/AnimeStore";
import { DownloadAnimeItem } from "./DownloadAnimeItem";

export const DownloadList: React.FC = observer(() => {
    const AnimeStoreKeys = Array.from(AnimeStore.anime.keys());
    return (
        <>
            <Title align="center">Lista Download</Title>
            {AnimeStoreKeys.length > 0 ? (
                <Table>
                    <thead>
                        <tr>
                            <th style={{ width: 200 }}>Nome</th>
                            <th>Progresso</th>
                            <th style={{ width: 125 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {AnimeStoreKeys.map((anime, index) => {
                            return (
                                <DownloadAnimeItem
                                    key={AnimeStoreKeys[index]}
                                    anime={AnimeStore.anime.get(anime)}
                                    nome={anime}
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
