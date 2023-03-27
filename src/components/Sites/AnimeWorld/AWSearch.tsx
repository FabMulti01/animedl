import React from "react";
import { useParams } from "react-router-dom";
import { Title, Group } from "@mantine/core";
import usePromise from "react-promise-suspense";
import type AW from "@/types/sites/AnimeWorld/AnimeWorld";
import { loadAW } from "@/types/sites/AnimeWorld/LoadAW";
import { AWSearchEntry } from "./AWSearchEntry";

const promise = (nome: string) => loadAW(nome);

export const AWSearch: React.FC = () => {
    //Fix e il nome corretto senza "/"
    const { nome } = useParams();
    const Anime: AW[] = usePromise(promise, [nome], 5000);
    return (
        <>
            <Title align="center">Risultati per {nome} su AnimeWorld</Title>
            <Group position="center">
                {Anime.map((anime, i) => {
                    return <AWSearchEntry AW={anime} key={i} />;
                })}
            </Group>
        </>
    );
};
