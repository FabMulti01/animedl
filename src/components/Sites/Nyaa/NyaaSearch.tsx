import React, { useState } from "react";
import { useParams } from "react-router-dom";
import usePromise from "react-promise-suspense";
import { Table, Title, Text } from "@mantine/core";
import type Nyaa from "@/types/sites/Nyaa/Nyaa";
import { loadNyaa, ORDINE } from "@/types/sites/Nyaa/LoadNyaa";
import { NyaaEntry } from "./NyaaEntry";
import { BottoniOrdinamento } from "./BottoniOrdinamento";
import { BottoniLingua } from "./BottoniLingua";
import { selettore } from "@/types/sites/Nyaa/Nyaa";

const promise = (nome: string, lingua: string, ordine: ORDINE) =>
    loadNyaa(nome, lingua, ordine);

export const NyaaSearch: React.FC = () => {
    const { nome } = useParams();
    const [ordine, setOrdine] = useState<ORDINE>(ORDINE.dataDesc);
    const [lingua, setLingua] = useState<string>(selettore.multilingua);
    const Nyaa: Nyaa[] = usePromise(promise, [nome, lingua, ordine], 1000);
    //Ordina la tabella in base ai seed o alla data
    function ordineHandler(scelta: ORDINE) {
        if (ordine != scelta) {
            setOrdine(scelta);
        }
    }

    // Se va in errore qualcosa che impedisce il caricamento
    if (Nyaa === undefined) {
        return (
            <>
                <Title align="center">Errore Nyaa</Title>
                <Text align="center">
                    Errore con il caricamento degli anime per Nyaa
                </Text>
                <Text align="center">
                    Controlla i log per maggiori informazioni{" "}
                    <b>CTRL + ALT + I</b>
                </Text>
            </>
        );
    }

    // Se non ci sono anime in lista
    if (Nyaa === null) {
        return (
            <>
                <Title align="center">
                    Nessn risultato per {nome} in {lingua} su Nyaa
                </Title>
                <BottoniLingua setLingua={setLingua} lingua={lingua} />
            </>
        );
    }

    return (
        <>
            <Title align="center">
                Risultati per {nome} in {lingua} su Nyaa
            </Title>
            <BottoniLingua setLingua={setLingua} lingua={lingua} />
            <Table highlightOnHover>
                <thead>
                    <tr>
                        <th
                            style={{
                                width: "50%",
                            }}
                        >
                            Nome
                        </th>
                        <BottoniOrdinamento
                            ordineHandler={ordineHandler}
                            ordine={ordine}
                        />
                        <th style={{ width: "10%" }}>Magnet</th>
                    </tr>
                </thead>
                <tbody>
                    {Nyaa.map((Nyaa, i) => {
                        return <NyaaEntry key={i} Nyaa={Nyaa} info={false} />;
                    })}
                </tbody>
            </Table>
        </>
    );
};
