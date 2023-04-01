import React from "react";
import { useLocation } from "react-router-dom";
import usePromise from "react-promise-suspense";
import { Table, Title, Text, Paper } from "@mantine/core";
import type Nyaa from "@/types/sites/Nyaa/Nyaa";
import { NyaaEntry } from "./NyaaEntry";
import { InfoNyaa } from "@/types/sites/Nyaa/InfoNyaa";

const promise = (
    nome: string,
    data: string,
    link: string,
    seeds: string,
    peso: string,
    lingua: string,
    magnet: string
) => InfoNyaa(nome, data, link, seeds, peso, lingua, magnet);

export const NyaaInfo: React.FC = () => {
    const { nome, data, link, seeds, peso, lingua, magnet } =
        useLocation().state;
    //Se va in errore il recupero della descrizione non fa nulla
    const Nyaa: Nyaa = usePromise(
        promise,
        [nome, data, link, seeds, peso, lingua, magnet],
        5000
    );

    return (
        <>
            <Title align="center" order={2}>
                {Nyaa.nome}
            </Title>
            <Table>
                <thead>
                    <tr>
                        <th style={{ width: "55%" }}>Nome</th>
                        <th style={{ width: "10%" }}>Seeds</th>
                        <th style={{ width: "16%" }}>Data</th>
                        <th style={{ width: "14%" }}>Peso</th>
                        <th style={{ width: "10%" }}>Magnet</th>
                    </tr>
                </thead>
                <tbody>
                    <NyaaEntry Nyaa={Nyaa} info={true} />
                </tbody>
            </Table>
            <Title align="center" order={3}>
                Descrizione della pagina di Nyaa
            </Title>
            <Text align="center" color="red">
                TUTTI I LINK SONO BLOCCATI!
            </Text>
            <Paper>
                <div
                    className="nyaaInfo"
                    dangerouslySetInnerHTML={{ __html: Nyaa.descrizione }}
                ></div>
            </Paper>
        </>
    );
};
