import React from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { Title, Text } from "@mantine/core";
import { AnimeStore } from "@/stores/AnimeStore";
import { DownloadTab } from "./DownloadTab";

export const DownloadAnimePage: React.FC = observer(() => {
    const { nome } = useParams();
    if (AnimeStore.anime.get(nome) == undefined) {
        return (
            <>
                <Title align="center">{nome}</Title>
                <Text align="center">
                    Non stai scaricando nessun episodio di quest'anime!
                </Text>
            </>
        );
    } else {
        return (
            <>
                <Title align="center">{nome}</Title>
                <DownloadTab Anime={AnimeStore.anime.get(nome)} />
            </>
        );
    }
});
