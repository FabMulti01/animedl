import React from "react";
import { VscCopy, VscMagnet } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { Button, CopyButton, Text } from "@mantine/core";
import type Nyaa from "@/types/sites/Nyaa/Nyaa";

interface props {
    Nyaa: Nyaa;
    info: boolean;
}

export const NyaaEntry: React.FC<props> = ({ Nyaa, info }) => {
    const navigate = useNavigate();

    return (
        <tr>
            <td>
                <Text
                    lineClamp={1}
                    style={{ cursor: info ? "" : "pointer" }}
                    onClick={() => {
                        if (!info) {
                            navigate(
                                "/NyaaInfo/" + Nyaa.nome.replaceAll("/", "%2F"),
                                {
                                    state: Nyaa,
                                }
                            );
                        }
                    }}
                    title={Nyaa.nome}
                >
                    {/* Il truncate non funziona bene */}
                    {Nyaa.nome.replaceAll(".", " ")}
                </Text>
            </td>
            <td>{Nyaa.seeds}</td>
            <td>{Nyaa.data}</td>
            <td>{Nyaa.peso}</td>
            <td>
                <Button.Group>
                    <Button
                        component="a"
                        compact
                        title="Apri il magnet"
                        href={Nyaa.magnet}
                    >
                        <VscMagnet />
                    </Button>
                    <CopyButton value={Nyaa.magnet}>
                        {({ copied, copy }) => (
                            <Button
                                title="Copia il magnet"
                                compact
                                color={copied ? "green" : "cyan"}
                                onClick={copy}
                            >
                                <VscCopy />
                            </Button>
                        )}
                    </CopyButton>
                </Button.Group>
            </td>
        </tr>
    );
};
