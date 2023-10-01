import React from "react";
import { useLocation } from "react-router-dom";
import { Table, Title, Text, Paper } from "@mantine/core";
import Nyaa from "@/types/sites/Nyaa/Nyaa";
import { NyaaEntry } from "./NyaaEntry";
import usePromise from "react-promise-suspense";
//import { InfoNyaa } from "@/types/sites/Nyaa/InfoNyaa";

const promise = (Anime: Nyaa) => {
    const { nome, link, seeds, data, lingua, peso, magnet } = Anime;
    return new Nyaa(nome, link, seeds, data, lingua, peso, magnet).loadInfo();
};

export const NyaaInfo: React.FC = () => {
    const Nyaa: Nyaa = usePromise(promise, [useLocation().state], 1000);

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
