import React from "react";
import usePromise from "react-promise-suspense";
import { DownloadButtons } from "./DownloadButtons";
import AW from "@/types/sites/AnimeWorld/AnimeWorld";
import { useLocation } from "react-router-dom";
import { Title, Table, Text, Image, Group, Space } from "@mantine/core";

const promise = (Anime: AW) => {
    return new AW(Anime.nome, Anime.link, Anime.immagine).loadInfo();
};

export const AWInfoMain: React.FC = () => {
    const Anime = usePromise(promise, [useLocation().state], 1000);

    if (Anime == undefined) {
        <>
            <Title align="center">Errore AnimeWorld</Title>
            <Text align="center">
                Errore con il caricamento delle informazioni dell'anime
            </Text>
            <Text align="center">
                Controlla i log per maggiori informazioni <b>CTRL + ALT + I</b>
            </Text>
        </>;
    }

    return (
        <>
            <Title align="center">{Anime.nome}</Title>
            <Table>
                <thead>
                    <tr>
                        <th style={{ width: 224 }}></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {/* Parte sinistra */}
                        <td style={{ verticalAlign: "top" }}>
                            <Image radius={"xs"} src={Anime.immagine} />
                            <Space h={25} />
                            <Group>
                                <Text>Stato: {Anime.stato}</Text>
                                <Text>Data di uscita: {Anime.dataInizio}</Text>
                                <Text>
                                    Episodi totali:{" "}
                                    {Anime.episodio.size != 0
                                        ? Anime.episodio.size
                                        : "Non disponibile"}
                                </Text>
                                {Anime.dataRilascio ? (
                                    <Text>
                                        Prossimo episodio: {Anime.dataRilascio}
                                    </Text>
                                ) : (
                                    <></>
                                )}
                            </Group>
                        </td>
                        {/* Parte destra */}
                        <td>
                            <Title order={2}>Descrizione</Title>
                            <Text>{Anime.descrizione}</Text>
                            <Title order={2}>Download</Title>
                            <DownloadButtons Anime={Anime} />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};
