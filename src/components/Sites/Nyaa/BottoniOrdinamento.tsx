import React from "react";
import { ORDINE } from "@/types/sites/Nyaa/LoadNyaa";
import { Button } from "@mantine/core";
import { VscArrowDown, VscArrowUp, VscDash } from "react-icons/vsc";

interface props {
    ordineHandler(ordine: ORDINE): void;
    ordine: ORDINE;
}

export const BottoniOrdinamento: React.FC<props> = ({
    ordineHandler,
    ordine,
}) => {
    return (
        <>
            <th style={{ width: "10%" }}>
                <Button
                    onClick={() => {
                        if (ordine == ORDINE.seedDesc) {
                            ordineHandler(ORDINE.seedAsc);
                        } else {
                            ordineHandler(ORDINE.seedDesc);
                        }
                    }}
                    leftIcon={
                        ordine == ORDINE.seedDesc ? (
                            <VscArrowDown />
                        ) : ordine == ORDINE.seedAsc ? (
                            <VscArrowUp />
                        ) : (
                            <VscDash />
                        )
                    }
                    compact
                    fullWidth
                >
                    Seed
                </Button>
            </th>
            <th style={{ width: "16%" }}>
                <Button
                    onClick={() => {
                        if (ordine == ORDINE.dataDesc) {
                            ordineHandler(ORDINE.dataAsc);
                        } else {
                            ordineHandler(ORDINE.dataDesc);
                        }
                    }}
                    leftIcon={
                        ordine == ORDINE.dataDesc ? (
                            <VscArrowDown />
                        ) : ordine == ORDINE.dataAsc ? (
                            <VscArrowUp />
                        ) : (
                            <VscDash />
                        )
                    }
                    compact
                    fullWidth
                >
                    Data
                </Button>
            </th>
            <th style={{ width: "14%" }}>
                <Button
                    variant="filled"
                    onClick={() => {
                        if (ordine == ORDINE.pesoDesc) {
                            ordineHandler(ORDINE.pesoAsc);
                        } else {
                            ordineHandler(ORDINE.pesoDesc);
                        }
                    }}
                    leftIcon={
                        ordine == ORDINE.pesoDesc ? (
                            <VscArrowDown />
                        ) : ordine == ORDINE.pesoAsc ? (
                            <VscArrowUp />
                        ) : (
                            <VscDash />
                        )
                    }
                    compact
                    fullWidth
                >
                    Peso
                </Button>
            </th>
        </>
    );
};
