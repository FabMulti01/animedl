import React from "react";
import { useParams } from "react-router-dom";
import { Title, Group, Text } from "@mantine/core";
import { loadAW } from "@/types/sites/AnimeWorld/LoadAW";
import { AWSearchEntry } from "./AWSearchEntry";
import usePromise from "react-promise-suspense";

const promise = (nome: string) => loadAW(nome);

export const AWSearch: React.FC = () => {
    //Fix e il nome corretto senza "/"
    const { nome } = useParams();
    const Anime = usePromise(promise, [nome], 5000);

    if (Anime == undefined) {
        return (
            <>
                <Title align="center">Errore AnimeWorld</Title>
                <Text align="center">
                    Errore con il caricamento degli anime per AnimeWorld
                </Text>
                <Text align="center">
                    Controlla i log per maggiori informazioni{" "}
                    <b>CTRL + ALT + I</b>
                </Text>
            </>
        );
    }

    return (
        <>
            <Title align="center">Risultati per {nome} su AnimeWorld</Title>
            <Group position="center">
                {Anime.map((Anime, i) => {
                    return <AWSearchEntry Anime={Anime} key={i} />;
                })}
            </Group>
        </>
    );
};
