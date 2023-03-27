import React from "react";
import { ORDINE } from "@/types/sites/Nyaa/LoadNyaa";
import { VscChevronDown } from "react-icons/vsc";
import { Button, Chip, Group } from "@mantine/core";

interface props {
    ordineHandler(ordine: ORDINE);
    ordine: ORDINE;
}

export const BottoniOrdinamento: React.FC<props> = ({
    ordineHandler,
    ordine,
}) => {
    return (
        <>
            <th style={{ width: "10%" }}>
                <Chip
                    variant="filled"
                    checked={ordine == ORDINE.seed ? true : false}
                    onChange={() => ordineHandler(ORDINE.seed)}
                >
                    Seed
                </Chip>
            </th>
            <th style={{ width: "16%" }}>
                <Chip
                    variant="filled"
                    checked={ordine == ORDINE.data ? true : false}
                    onChange={() => ordineHandler(ORDINE.data)}
                >
                    Data
                </Chip>
            </th>
            <th style={{ width: "14%" }}>
                <Chip
                    variant="filled"
                    checked={ordine == ORDINE.peso ? true : false}
                    onChange={() => ordineHandler(ORDINE.peso)}
                >
                    Peso
                </Chip>
            </th>
        </>
    );
};
